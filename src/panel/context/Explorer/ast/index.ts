import stringify from "fast-json-stable-stringify";
import nanoid from "nanoid";
import { Operation } from "urql";

import {
  Scalar,
  SelectionSet,
  Variables,
  ResolveInfo,
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
  _id: string;
  key: string;
  name: string;
  args: Variables | null;
  owner: {};
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
  request: Operation,
  data: Data,
  map: NodeMap = Object.create(null)
) => {
  if (request.operationName !== "query") {
    return map;
  }

  const operation = getMainOperation(request.query);

  const ctx = {
    variables: normalizeVariables(operation, request.variables),
    fragments: getFragments(request.query)
  };

  return copyFromData(ctx, copyMap(map), getSelectionSet(operation), data, {});
};

const copyMap = (map: null | NodeMap): NodeMap => {
  const newMap = Object.create(null);
  return map ? Object.assign(newMap, map) : newMap;
};

const makeNode = (owner: {}, node: undefined | FieldNode) => {
  if (node === undefined || node.owner !== owner) {
    const node = {};
  }
};

function copyFromData(
  ctx: ResolveInfo,
  map: NodeMap,
  selection: SelectionSet,
  data: Data,
  owner: {}
) {
  selection.forEach(fieldNode => {
    if (isFieldNode(fieldNode)) {
      const fieldName = getName(fieldNode) || "query";
      const fieldArgs = getFieldArguments(fieldNode, ctx.variables);
      const fieldKey = keyOfField(fieldName, fieldArgs);
      const fieldValue = data[getFieldAlias(fieldNode)];

      let node: FieldNode;
      if (map[fieldKey] === undefined) {
        node = map[fieldKey] = {
          _id: nanoid(),
          key: fieldKey,
          name: fieldName,
          args: fieldArgs,
          owner
        };
      } else if (map[fieldKey].owner !== owner) {
        node = map[fieldKey] = { ...map[fieldKey], owner };
      } else {
        node = map[fieldKey];
      }

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

            return copyFromData(ctx, map, fieldSelection, childData, {});
          });
        } else {
          let innerMap =
            node.children && !Array.isArray(node.children)
              ? node.children
              : (node.children = Object.create(null));

          return copyFromData(ctx, innerMap, fieldSelection, childValue, {});
        }
      } else {
        node.value = fieldValue === undefined ? null : fieldValue;
      }
    } else {
      const fragmentNode = !isInlineFragment(fieldNode)
        ? ctx.fragments[getName(fieldNode)]
        : fieldNode;
      if (fragmentNode !== undefined) {
        copyFromData(ctx, map, getSelectionSet(fragmentNode), data, {});
      }
    }
  });

  return map;
}
