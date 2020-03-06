import {
  FieldNode,
  OperationDefinitionNode,
  valueFromASTUntyped
} from "graphql";
import Maybe from "graphql/tsutils/Maybe";
import { Variables } from "./types";

/** Evaluates a fields arguments taking vars into account */
export const getFieldArguments = (node: FieldNode, vars: Variables) => {
  if (node.arguments === undefined || node.arguments.length === 0) {
    return;
  }

  return node.arguments.reduce<Variables>(
    (p, arg) => ({
      ...p,
      [arg.name.value]: valueFromASTUntyped(arg.value, vars)
    }),
    {}
  );
};

/** Returns a normalized form of variables with defaulted values */
export const getNormalizedVariables = (
  variableDefinitions: OperationDefinitionNode["variableDefinitions"] = [],
  variables?: Maybe<Record<string, any>>
) =>
  variableDefinitions.reduce<Variables>(
    (normalized, definition) => ({
      ...normalized,
      [definition.variable.name.value]: valueFromASTUntyped(
        definition.variable,
        variables
      )
    }),
    {}
  );
