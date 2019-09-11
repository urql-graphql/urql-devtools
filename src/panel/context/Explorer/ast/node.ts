/** Copied from https://github.com/FormidableLabs/urql-exchange-graphcache/blob/master/src/ast/node.ts */

import {
  NameNode,
  SelectionNode,
  SelectionSetNode,
  InlineFragmentNode,
  FieldNode,
  OperationDefinitionNode,
  Kind
} from "graphql";

import { SelectionSet, Scalar } from "./types";

/** Returns the name of a given node */
export const getName = (node: { name: NameNode }): string => node.name.value;

export const getOperationName = (node: OperationDefinitionNode) => {
  switch (node.operation) {
    case "query":
      return "Query";
    case "mutation":
      return "Mutation";
    case "subscription":
      return "Subscription";
  }
};

/** Returns either the field's name or the field's alias */
export const getFieldAlias = (node: FieldNode): string =>
  node.alias !== undefined ? node.alias.value : getName(node);

/** Returns the SelectionSet for a given inline or defined fragment node */
export const getSelectionSet = (node: {
  selectionSet?: SelectionSetNode;
}): SelectionSet =>
  node.selectionSet !== undefined ? node.selectionSet.selections : [];

export const isFieldNode = (node: SelectionNode): node is FieldNode =>
  node.kind === Kind.FIELD;

export const isInlineFragment = (
  node: SelectionNode
): node is InlineFragmentNode => node.kind === Kind.INLINE_FRAGMENT;

export const isScalar = (x: any): x is Scalar | Scalar[] => {
  if (Array.isArray(x)) {
    return x.some(isScalar);
  }

  return (
    typeof x !== "object" ||
    (x !== null && typeof (x as any).__typename !== "string")
  );
};
