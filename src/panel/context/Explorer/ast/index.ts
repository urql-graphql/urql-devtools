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
  args: Variables | null;
  value?: DataField;
  id?: string;
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
          args: fieldArgs
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

            let map = copyMap(prevChildren[index]);

            return copyFromData(ctx, map, fieldSelection, childData);
          });
        } else {
          let innerMap =
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
