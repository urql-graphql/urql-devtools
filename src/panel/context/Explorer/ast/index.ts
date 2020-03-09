import stringify from "fast-json-stable-stringify";
import nanoid from "nanoid";
import { Operation, OperationDebugMeta } from "urql";
import {
  SelectionNode,
  Kind,
  FieldNode,
  InlineFragmentNode,
  FragmentSpreadNode
} from "graphql";

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
  value?: Scalar | Scalar[] | null;
  children?: ParsedNodeMap | (ParsedNodeMap | null)[];
}

export type ParsedNodeMap = Record<string, ParsedFieldNode>;

type RequestData = Record<string, FieldData> | DataField | null | FieldData[];
interface ResponseData {
  [fieldName: string]: ResponseData[] | ResponseData | DataField | null;
}

const getFieldKey = (fieldName: string, args?: Variables) =>
  args ? `${fieldName}(${stringify(args)})` : fieldName;

export const startQuery = (
  request: Operation,
  data: ResponseData,
  parsedNodes: ParsedNodeMap = Object.create(null)
) => {
  if (request.operationName !== "query") {
    return parsedNodes;
  }

  const operation = getMainOperation(request.query);
  if (operation.selectionSet.selections.length === 0) {
    return parsedNodes;
  }

  return parseNodes({
    variables: getNormalizedVariables(
      operation.variableDefinitions,
      request.variables
    ),
    selections: operation.selectionSet.selections,
    parsedNodes,
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
  data: ResponseData;
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

    if (isFragmentSpread(selectionNode)) {
      return parseNodes({
        ...copyArgs,
        parsedNodes: parsedNodemap,
        selections: fragments[selectionNode.name.value].selectionSet.selections
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

    const node: ParsedFieldNode = parsedNodemap[key]
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
      const children = (node.children || []) as ParsedNodeMap[];
      return {
        ...parsedNodemap,
        [key]: {
          ...node,
          children: value.map(
            (data, i) =>
              data === null
                ? null
                : parseNodes({
                    ...copyArgs,
                    parsedNodes: children[i],
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

    if (
      selectionNode.selectionSet &&
      !Array.isArray(value) &&
      value &&
      typeof value === "object"
    ) {
      return {
        ...parsedNodemap,
        [key]: {
          ...node,
          children: parseNodes({
            ...copyArgs,
            parsedNodes: {},
            selections: selectionNode.selectionSet.selections,
            data: value
          })
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

const isFragmentSpread = (node: SelectionNode): node is FragmentSpreadNode =>
  node.kind === Kind.FRAGMENT_SPREAD;
