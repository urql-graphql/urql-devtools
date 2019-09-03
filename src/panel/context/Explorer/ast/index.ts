import stringify from "fast-json-stable-stringify";

import {
  Scalar,
  SelectionSet,
  Variables,
  ResolveInfo,
  OperationRequest,
  NullArray
} from "./types";

import {
  getName,
  getSelectionSet,
  isFieldNode,
  isInlineFragment,
  getFieldAlias
} from "./node";

import { getFieldArguments, normalizeVariables } from "./variables";

import { getMainOperation, getFragments } from "./traversal";

type DataField = Scalar | NullArray<Scalar> | null;

export interface FieldNode {
  name: string;
  displayName: string;
  args: Variables | null;
  value?: DataField;
  children?: NodeMap | NullArray<NodeMap>;
}

export interface NodeMap {
  [key: string]: FieldNode;
}

interface Data {
  [fieldName: string]: Data[] | Data | DataField;
}

export const keyOfField = (fieldName: string, args?: null | Variables) =>
  args ? `${fieldName}(${stringify(args)})` : fieldName;

export const startQuery = (
  request: OperationRequest,
  data: Data,
  map: NodeMap = Object.create(null)
) => {
  const operation = getMainOperation(request.query);

  const ctx = {
    variables: normalizeVariables(operation, request.variables),
    fragments: getFragments(request.query)
  };

  return copyFromData(ctx, copyMap(map), getSelectionSet(operation), data);
};

const copyMap = (map: null | NodeMap): NodeMap => {
  const newMap = Object.create(null);
  return map ? Object.assign(newMap, map) : newMap;
};

function copyFromData(
  ctx: ResolveInfo,
  map: NodeMap,
  selection: SelectionSet,
  data: Data
) {
  selection.forEach(fieldNode => {
    if (isFieldNode(fieldNode)) {
      const fieldName = getName(fieldNode);
      const fieldArgs = getFieldArguments(fieldNode, ctx.variables);
      const fieldKey = keyOfField(fieldName, fieldArgs);
      const fieldValue = data[getFieldAlias(fieldNode)];

      const node =
        map[fieldKey] ||
        (map[fieldKey] = {
          name: fieldName,
          args: fieldArgs,
          displayName: fieldKey
        });

      if (
        fieldNode.selectionSet !== undefined &&
        typeof fieldValue === "object" &&
        fieldValue !== null
      ) {
        const childValue = fieldValue as Data | Data[];
        const fieldSelection = getSelectionSet(fieldNode);

        if (Array.isArray(childValue)) {
          const prevChildren = Array.isArray(node.children)
            ? node.children
            : [];

          node.children = childValue.map((childData: Data | null, index) => {
            if (!childData) {
              return null;
            }

            const map = copyMap(prevChildren[index]);
            return copyFromData(ctx, map, fieldSelection, childData);
          });
        } else {
          const innerMap =
            node.children && !Array.isArray(node.children)
              ? node.children
              : (node.children = Object.create(null));
          copyFromData(ctx, innerMap, fieldSelection, childValue);
        }
      } else {
        node.value = fieldValue === undefined ? null : fieldValue;
      }
    } else {
      const fragmentNode = !isInlineFragment(fieldNode)
        ? ctx.fragments[getName(fieldNode)]
        : fieldNode;
      if (fragmentNode !== undefined) {
        copyFromData(ctx, map, getSelectionSet(fragmentNode), data);
      }
    }
  });

  return map;
}

// type Request = {
//   [key: string]:
//     | {
//         name: string;
//         args: { [key: string]: any };
//         children: { [key: string]: Request };
//       }
//     | {
//         name: string;
//         args: { [key: string]: any };
//         children: { [key: string]: Request };
//       };
// };

// interface Result {
//   [key: string]: {
//     name: string;
//     args: { [key: string]: any };
//     children: [{ [key: string]: Result }];
//   };
// }

// function parseNode(request: Data, response: OperationResult["data"]): Result {
//   if (!Array.isArray || typeof response !== "object") {
//     return response;
//   }

//   if (request.hasOwnProperty("children")) {
//     //@ts-ignore
//     let data = [];

//     for (let child of response) {
//       //@ts-ignore
//       data = [...data, { ...parseNode(request["children"], child) }];
//     }
//     //@ts-ignore
//     return { children: data };
//   } else {
//     const data = {};

//     const reservedKeys = ["name", "args", "children"];
//     const requestKeys = Object.keys(request);

//     requestKeys.forEach(key => {
//       if (!reservedKeys.includes(key)) {
//         const currentReqField = request[key]["name"];
//         const innerData = parseNode(
//           //@ts-ignore
//           { ...request[key] },
//           response[currentReqField]
//         );
//         //@ts-ignore
//         data[key] = innerData;
//       }
//     });

//     return data;
//   }
// }
