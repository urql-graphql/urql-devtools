/** Copied from https://github.com/FormidableLabs/urql-exchange-graphcache/blob/master/src/ast/variables.ts */

import {
  FieldNode,
  ValueNode,
  OperationDefinitionNode,
  Kind,
  valueFromASTUntyped
} from "graphql";
import { Variables } from "./types";

/** Evaluates a given ValueNode to a JSON value taking vars into account */
export const getSerializedValue = (
  node: ValueNode,
  vars: Variables
): Variables[number] => {
  if (node.kind === Kind.NULL) {
    return null;
  }

  if (node.kind === Kind.INT) {
    return parseInt(node.value, 10);
  }

  if (node.kind === Kind.FLOAT) {
    return parseFloat(node.value);
  }

  if (node.kind === Kind.VARIABLE) {
    const value = vars[node.name.value];
    return value !== undefined ? value : null;
  }

  if (node.kind === Kind.LIST) {
    return node.values.map(n => getSerializedValue(n, vars));
  }

  if (node.kind === Kind.OBJECT) {
    return node.fields.reduce(
      (o, field) => ({
        ...o,
        [field.name.value]: getSerializedValue(field.value, vars)
      }),
      {}
    );
  }

  return node.value;
};

/** Evaluates a fields arguments taking vars into account */
export const getFieldArguments = (node: FieldNode, vars: Variables) => {
  if (node.arguments === undefined || node.arguments.length === 0) {
    return;
  }

  const args = node.arguments.reduce<Variables>((p, arg) => {
    const value = valueFromASTUntyped(arg.value, vars);

    if (value === undefined || value === null) {
      return p;
    }

    return {
      ...p,
      [node.name.value]: value
    };
  }, {});

  if (Object.keys(args).length === 0) {
    return;
  }

  return args;
};

/** Returns a normalized form of variables with defaulted values */
export const getNormalizedVariables = (
  variableDefinitions: OperationDefinitionNode["variableDefinitions"] = [],
  variables: Variables
) => {
  return variableDefinitions.reduce<Variables>((normalized, definition) => {
    const name = definition.variable.name.value;

    if (variables[name] !== undefined) {
      return {
        ...normalized,
        [name]: variables[name]
      };
    }

    if (definition.defaultValue !== undefined) {
      return {
        ...normalized,
        [name]: getSerializedValue(definition.defaultValue, variables)
      };
    }

    return normalized;
  }, {});
};
