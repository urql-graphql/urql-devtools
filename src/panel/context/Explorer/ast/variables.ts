import {
  FieldNode,
  OperationDefinitionNode,
  valueFromASTUntyped,
} from "graphql";
import { Operation } from "@urql/core";

/** Evaluates a fields arguments taking vars into account */
export const getFieldArguments = (
  node: FieldNode,
  vars: Operation["variables"]
): Record<string, unknown> | undefined => {
  if (node.arguments === undefined || node.arguments.length === 0) {
    return;
  }

  return node.arguments.reduce<Operation["variables"]>(
    (p, arg) => ({
      ...p,
      [arg.name.value]: valueFromASTUntyped(arg.value, vars),
    }),
    {}
  ) as Record<string, unknown>;
};

/** Returns a normalized form of variables with defaulted values */
export const getNormalizedVariables = (
  variableDefinitions: OperationDefinitionNode["variableDefinitions"] = [],
  variables?: Record<string, any>
): Record<string, unknown> | undefined =>
  variableDefinitions.reduce<Operation["variables"]>(
    (normalized, definition) => ({
      ...normalized,
      [definition.variable.name.value]: valueFromASTUntyped(
        definition.variable,
        variables
      ),
    }),
    {}
  ) as Record<string, unknown>;
