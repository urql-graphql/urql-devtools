import stringify from "fast-json-stable-stringify";
import { nanoid } from "nanoid";
import { Operation, OperationDebugMeta, OperationResult } from "@urql/core";
import {
  SelectionNode,
  Kind,
  FieldNode,
  InlineFragmentNode,
  FragmentSpreadNode,
  OperationDefinitionNode,
  FragmentDefinitionNode,
  ASTNode,
} from "graphql";
import { getFieldArguments, getNormalizedVariables } from "./variables";

export interface ParsedFieldNode {
  _id: string;
  _owner: {};
  cacheOutcome?: OperationDebugMeta["cacheOutcome"];
  key: string;
  name: string;
  args?: Operation["variables"];
  value?: OperationResult["data"];
  children?: ParsedNodeMap | (ParsedNodeMap | null)[];
}

export type ParsedNodeMap = Record<string, ParsedFieldNode>;

interface HandleResponseArgs {
  operation: Operation;
  data?: OperationResult["data"];
  parsedNodes?: ParsedNodeMap;
}

export const handleResponse = ({
  operation,
  data,
  parsedNodes = {},
}: HandleResponseArgs) => {
  if (operation.operationName !== "query") {
    return parsedNodes;
  }

  const opNode = operation.query.definitions.find(
    (node) => node.kind === Kind.OPERATION_DEFINITION
  ) as OperationDefinitionNode;

  if (!opNode) {
    throw new Error(
      "Invalid GraphQL document: All GraphQL documents must contain an OperationDefinition" +
        "node for a query, subscription, or mutation."
    );
  }

  const fragments = operation.query.definitions
    .filter(isFragmentNode)
    .reduce<Record<string, FragmentDefinitionNode>>(
      (map, node) => ({
        ...map,
        [node.name.value]: node,
      }),
      {}
    );

  if (opNode.selectionSet.selections.length === 0) {
    return parsedNodes;
  }

  return parseNodes({
    variables: getNormalizedVariables(
      opNode.variableDefinitions,
      operation.variables
    ),
    selections: opNode.selectionSet.selections,
    fragments,
    parsedNodes,
    cacheOutcome: operation.context.meta && operation.context.meta.cacheOutcome,
    data,
    owner: {},
  });
};

interface CopyFromDataArgs {
  fragments: Record<string, FragmentDefinitionNode>;
  variables: Operation["variables"];
  cacheOutcome: OperationDebugMeta["cacheOutcome"];
  parsedNodes: ParsedNodeMap;
  selections: readonly SelectionNode[];
  data?: OperationResult["data"];
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
    owner,
  } = copyArgs;

  return selections.reduce((parsedNodemap, selectionNode): ParsedNodeMap => {
    if (!selectionNode) {
      return parsedNodemap;
    }

    if (isInlineFragment(selectionNode)) {
      return parseNodes({
        ...copyArgs,
        parsedNodes: parsedNodemap,
        selections: selectionNode.selectionSet.selections,
      });
    }

    if (isFragmentSpread(selectionNode)) {
      return parseNodes({
        ...copyArgs,
        parsedNodes: parsedNodemap,
        selections: fragments[selectionNode.name.value].selectionSet.selections,
      });
    }

    if (!isFieldNode(selectionNode)) {
      return parsedNodemap;
    }

    const name = selectionNode.name.value || "query";
    const args = getFieldArguments(selectionNode, variables);
    const key = getFieldKey(name, args);
    const value =
      data?.[
        selectionNode.alias !== undefined
          ? selectionNode.alias.value
          : selectionNode.name.value
      ];

    const node: ParsedFieldNode = parsedNodemap[key]
      ? {
          ...parsedNodemap[key],
          _owner: owner,
        }
      : {
          _id: nanoid(),
          _owner: owner,
          cacheOutcome,
          key,
          name,
          args,
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
                    data,
                  }),
            {}
          ),
        },
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
            data: value,
          }),
        },
      };
    }

    return {
      ...parsedNodemap,
      [key]: {
        ...node,
        value,
      },
    };
  }, parsedNodes);
};

const getFieldKey = (fieldName: string, args?: Operation["variables"]) =>
  args ? `${fieldName}(${stringify(args)})` : fieldName;

const isFieldNode = (node: ASTNode): node is FieldNode =>
  node.kind === Kind.FIELD;

const isInlineFragment = (node: ASTNode): node is InlineFragmentNode =>
  node.kind === Kind.INLINE_FRAGMENT;

const isFragmentSpread = (node: ASTNode): node is FragmentSpreadNode =>
  node.kind === Kind.FRAGMENT_SPREAD;

const isFragmentNode = (node: ASTNode): node is FragmentDefinitionNode => {
  return node.kind === Kind.FRAGMENT_DEFINITION;
};
