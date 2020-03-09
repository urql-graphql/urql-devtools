import stringify from "fast-json-stable-stringify";
import nanoid from "nanoid";
import { Operation, OperationDebugMeta } from "urql";
import { SelectionNode, Kind, FieldNode, InlineFragmentNode } from "graphql";

import { Scalar, Variables, Context, Fragments } from "./types";

import { getFieldArguments, getNormalizedVariables } from "./variables";

import { getMainOperation, getFragments } from "./traversal";

type DataField = Scalar | null;

export interface ParsedFieldNode {
  _id: string;
  _owner: {};
  cacheOutcome?: Context["cacheOutcome"];
  key: string;
  name: string;
  args?: Variables;
  value?: DataField | null;
  children?: ParsedNodeMap;
}

export type ParsedNodeMap = Record<string, ParsedFieldNode>;

interface Data {
  [fieldName: string]: Data[] | Data | DataField | null;
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

  return parseNodes({
    variables: getNormalizedVariables(
      operation.variableDefinitions,
      request.variables
    ),
    selections: operation.selectionSet.selections,
    parsedNodes: map,
    fragments: getFragments(request.query),
    cacheOutcome: request.context.meta && request.context.meta.cacheOutcome,
    data,
    owner: {}
  });
};

interface CopyFromDataArgs {
  fragments: Fragments;
  variables: Variables;
  cacheOutcome: OperationDebugMeta["cacheOutcome"];
  parsedNodes: ParsedNodeMap;
  selections: readonly SelectionNode[];
  data: Data;
  owner: {};
}

const parseNodes = (copyArgs: CopyFromDataArgs): ParsedNodeMap => {
  const {
    fragments,
    variables,
    cacheOutcome,
    parsedNodes = {},
    selections,
    data,
    owner
  } = copyArgs;

  return selections.reduce((parsedNodemap, selectionNode): ParsedNodeMap => {
    if (!selectionNode) {
      return parsedNodemap;
    }

    if (isInlineFragment(selectionNode)) {
      return parseNodes({
        ...copyArgs,
        parsedNodes: parsedNodemap,
        selections: selectionNode.selectionSet.selections
      });
    }

    const fragmentDefinition = fragments[selectionNode.name.value];
    if (fragmentDefinition) {
      return parseNodes({
        ...copyArgs,
        parsedNodes: parsedNodemap,
        selections: fragmentDefinition.selectionSet.selections
      });
    }

    if (!isFieldNode(selectionNode)) {
      return parsedNodemap;
    }

    const name = selectionNode.name.value || "query";
    const args = getFieldArguments(selectionNode, variables);
    const key = getFieldKey(name, args);
    const value =
      data[
        selectionNode.alias !== undefined
          ? selectionNode.alias.value
          : selectionNode.name.value
      ];

    const node = parsedNodemap[key]
      ? {
          ...parsedNodemap[key],
          _owner: owner
        }
      : {
          _id: nanoid(),
          _owner: owner,
          cacheOutcome,
          key,
          name,
          args
        };

    if (selectionNode.selectionSet && Array.isArray(value)) {
      return {
        ...parsedNodemap,
        [key]: {
          ...node,
          value: undefined,
          children: value.reduce<ParsedNodeMap>(
            (parsedNodes, data) =>
              parseNodes({
                ...copyArgs,
                parsedNodes,
                selections: selectionNode.selectionSet
                  ? selectionNode.selectionSet.selections
                  : [],
                data
              }),
            {}
          )
        }
      };
    }

    return {
      ...parsedNodemap,
      [key]: {
        ...node,
        value
      }
    };
  }, parsedNodes);
};

const isFieldNode = (node: SelectionNode): node is FieldNode =>
  node.kind === Kind.FIELD;

const isInlineFragment = (node: SelectionNode): node is InlineFragmentNode =>
  node.kind === Kind.INLINE_FRAGMENT;
