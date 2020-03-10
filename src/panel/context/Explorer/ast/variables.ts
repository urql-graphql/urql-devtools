import {
  FieldNode,
  OperationDefinitionNode,
  valueFromASTUntyped
} from "graphql";
import { Operation } from "urql";
import Maybe from "graphql/tsutils/Maybe";

/** Evaluates a fields arguments taking vars into account */
export const getFieldArguments = (
  node: FieldNode,
  vars: Operation["variables"]
) => {
  if (node.arguments === undefined || node.arguments.length === 0) {
    return;
  }

  return node.arguments.reduce<Operation["variables"]>(
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
  variableDefinitions.reduce<Operation["variables"]>(
    (normalized, definition) => ({
      ...normalized,
      [definition.variable.name.value]: valueFromASTUntyped(
        definition.variable,
        variables
      )
    }),
    {}
  );
