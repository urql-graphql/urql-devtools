/** Copied from https://github.com/FormidableLabs/urql-exchange-graphcache/blob/master/src/ast/variables.ts */

import {
  FieldNode,
  ValueNode,
  OperationDefinitionNode,
  Kind,
  valueFromASTUntyped
} from "graphql";

import { getName } from "./node";
import { Variables } from "./types";

/** Evaluates a given ValueNode to a JSON value taking vars into account */
export const evaluateValueNode = (node: ValueNode, vars: Variables): any => {
  switch (node.kind) {
    case Kind.NULL:
      return null;
    case Kind.INT:
      return parseInt(node.value, 10);
    case Kind.FLOAT:
      return parseFloat(node.value);
    case Kind.LIST:
      return node.values.map(v => evaluateValueNode(v, vars));
    case Kind.OBJECT:
      return node.fields.reduce((obj, field) => {
        obj[getName(field)] = evaluateValueNode(field.value, vars);
        return obj;
      }, Object.create(null));
    case Kind.VARIABLE:
      const varValue = vars[getName(node)];
      return varValue !== undefined ? varValue : null;
    default:
      return node.value;
  }
};

/** Evaluates a fields arguments taking vars into account */
export const getFieldArguments = (
  node: FieldNode,
  vars: Variables
): null | Variables => {
  if (node.arguments === undefined || node.arguments.length === 0) {
    return null;
  }

  const args = Object.create(null);
  let argsSize = 0;

  for (let i = 0, l = node.arguments.length; i < l; i++) {
    const arg = node.arguments[i];
    const value = valueFromASTUntyped(arg.value, vars);
    if (value !== undefined && value !== null) {
      args[getName(arg)] = value;
      argsSize++;
    }
  }

  return argsSize > 0 ? args : null;
};

/** Returns a normalized form of variables with defaulted values */
export const normalizeVariables = (
  node: OperationDefinitionNode,
  input: void | object
): Variables => {
  if (node.variableDefinitions === undefined) {
    return {};
  }

  const args: Variables = (input as Variables) || {};

  return node.variableDefinitions.reduce((vars, def) => {
    const name = getName(def.variable);
    let value = args[name];
    if (value === undefined) {
      if (def.defaultValue !== undefined) {
        value = evaluateValueNode(def.defaultValue, args);
      } else {
        return vars;
      }
    }

    vars[name] = value;
    return vars;
  }, Object.create(null));
};