/** Copied from https://github.com/FormidableLabs/urql-exchange-graphcache/blob/master/src/ast/traversal.ts */
import {
  DefinitionNode,
  DocumentNode,
  FragmentDefinitionNode,
  OperationDefinitionNode,
  Kind
} from "graphql";
import { Fragments } from "./types";

const isFragmentNode = (
  node: DefinitionNode
): node is FragmentDefinitionNode => {
  return node.kind === Kind.FRAGMENT_DEFINITION;
};

/** Returns the main operation's definition */
export const getMainOperation = (
  doc: DocumentNode
): OperationDefinitionNode => {
  const operation = doc.definitions.find(
    node => node.kind === Kind.OPERATION_DEFINITION
  ) as OperationDefinitionNode;

  if (process.env.NODE_ENV !== "production" && !operation) {
    throw new Error(
      "Invalid GraphQL document: All GraphQL documents must contain an OperationDefinition" +
        "node for a query, subscription, or mutation."
    );
  }

  return operation;
};

/** Returns a mapping from fragment names to their selections */
export const getFragments = (doc: DocumentNode) =>
  doc.definitions.filter(isFragmentNode).reduce<Fragments>(
    (map, node) => ({
      ...map,
      [node.name.value]: node
    }),
    {}
  );
