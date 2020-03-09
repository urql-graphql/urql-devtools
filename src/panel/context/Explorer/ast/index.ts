import stringify from "fast-json-stable-stringify";
import nanoid from "nanoid";
import { Operation } from "urql";
import { SelectionNode, Kind, FieldNode, InlineFragmentNode } from "graphql";

import { Scalar, Variables, Context, NullArray } from "./types";

import { getFieldArguments, getNormalizedVariables } from "./variables";

import { getMainOperation, getFragments } from "./traversal";

type DataField = Scalar | NullArray<Scalar> | null;

export interface ParsedFieldNode {
  _id: string;
  _owner: {};
  cacheOutcome?: Context["cacheOutcome"];
  key: string;
  name: string;
  args?: Variables;
  value?: DataField | null;
  children?: ParsedNodeMap | NullArray<ParsedNodeMap>;
}

export type ParsedNodeMap = Record<string, ParsedFieldNode>;

interface Data {
  [fieldName: string]: Data[] | Data | DataField;
}

const getFieldKey = (fieldName: string, args?: Variables) =>
  args ? `${fieldName}(${stringify(args)})` : fieldName;

export const startQuery = (
  request: Operation,
  data: Data,
  map: ParsedNodeMap = Object.create(null)
) => {
  if (request.operationName !== "query") {
    return map;
  }

  const operation = getMainOperation(request.query);

  if (operation.selectionSet.selections.length === 0) {
    return map;
  }

  const ctx = {
    variables: getNormalizedVariables(
      operation.variableDefinitions,
      request.variables
    ),
    fragments: getFragments(request.query),
    cacheOutcome: request.context.meta && request.context.meta.cacheOutcome
  };

  const owner = {};
  return copyFromData(
    ctx,
    copyNodeMap(map),
    operation.selectionSet.selections,
    data,
    owner
  );
};

const copyNodeMap = (map: null | ParsedNodeMap): ParsedNodeMap => {
  const newMap = Object.create(null);
  return map !== null ? Object.assign(newMap, map) : newMap;
};

const copyParsedFieldNode = (node: ParsedFieldNode, owner: {}) => {
  if (node._owner === owner) {
    return node;
  } else {
    const newNode = {
      ...node,
      _owner: owner
    };

    if (Array.isArray(node.children)) {
      newNode.children = node.children.map(copyNodeMap);
    } else if (typeof node.children === "object") {
      newNode.children = copyNodeMap(node.children);
    }

    return newNode;
  }
};

function copyFromData(
  ctx: Context,
  map: ParsedNodeMap,
  selection: readonly SelectionNode[],
  data: Data,
  owner: {}
): ParsedNodeMap {
  selection.forEach(fieldNode => {
    if (isFieldNode(fieldNode)) {
      const fieldName = fieldNode.name.value || "query";
      const fieldArgs = getFieldArguments(fieldNode, ctx.variables);
      const fieldKey = getFieldKey(fieldName, fieldArgs);
      const fieldAlias =
        fieldNode.alias !== undefined
          ? fieldNode.alias.value
          : fieldNode.name.value;
      const fieldValue = data[fieldAlias];

      let node: ParsedFieldNode;
      if (map[fieldKey] === undefined) {
        node = map[fieldKey] = {
          _id: nanoid(),
          _owner: owner,
          cacheOutcome: ctx.cacheOutcome,
          key: fieldKey,
          name: fieldName,
          args: fieldArgs
        };
      } else {
        node = map[fieldKey] = copyParsedFieldNode(map[fieldKey], owner);
        node.cacheOutcome = ctx.cacheOutcome;
      }

      if (
        fieldNode.selectionSet !== undefined &&
        typeof fieldValue === "object" &&
        fieldValue !== null
      ) {
        const childValue = fieldValue as Data | Data[];
        const fieldSelection = fieldNode.selectionSet
          ? fieldNode.selectionSet.selections
          : [];

        if (Array.isArray(childValue)) {
          const size = childValue.length;
          node.children = Array.isArray(node.children)
            ? node.children
            : new Array(size);
          node.children.length = size;

          for (let i = 0; i < size; i++) {
            const childData: Data | null = childValue[i];
            if (childData === null) {
              node.children[i] = null;
            } else {
              const childMap = node.children[i] || Object.create(null);
              node.children[i] = copyFromData(
                ctx,
                childMap,
                fieldSelection,
                childData,
                owner
              );
            }
          }
        } else {
          const childMap = node.children || Object.create(null);
          node.children = copyFromData(
            ctx,
            childMap,
            fieldSelection,
            childValue,
            owner
          );
        }

        delete node.value;
      } else {
        node.value = fieldValue === undefined ? null : fieldValue;
        delete node.children;
      }
    } else {
      const fragmentNode = !isInlineFragment(fieldNode)
        ? ctx.fragments[fieldNode.name.value]
        : fieldNode;
      if (fragmentNode) {
        copyFromData(
          ctx,
          map,
          fragmentNode.selectionSet.selections,
          data,
          owner
        );
      }
    }
  });

  return map;
}

const isFieldNode = (node: SelectionNode): node is FieldNode =>
  node.kind === Kind.FIELD;

const isInlineFragment = (node: SelectionNode): node is InlineFragmentNode =>
  node.kind === Kind.INLINE_FRAGMENT;
