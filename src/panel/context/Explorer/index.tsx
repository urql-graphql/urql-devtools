import { print } from "graphql";
import stringify from "fast-json-stable-stringify";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from "react";

import { DocumentNode } from "graphql";
import { UrqlEvent } from "../../../types";
import { DevtoolsContext } from "../Devtools";
import { Scalar, SelectionSet, Variables } from "./ast/types";


import {
  getName,
  getSelectionSet,
  isFieldNode,
  isInlineFragment,
  getFieldAlias,
  getTypeCondition
} from "./ast/node";

import { getFieldArguments, normalizeVariables } from "./ast/variables";

import { getMainOperation, getFragments } from "./ast/traversal";


interface ExplorerContextValue {
  data?: any;
}

export const ExplorerContext = createContext<ExplorerContextValue>(
  undefined as any
);

interface Props {
  children: ReactNode;
}

export function ExplorerContextProvider({ children }: Props) {
  const { addMessageHandler } = useContext(DevtoolsContext);
  const [operations, setOperations] = useState<UrqlEvent[]>([]);
  /** Set initial state from cache */
  useEffect(() => {
    window.chrome.devtools.inspectedWindow.eval(
      `window.__urql__.events`,
      (ops: UrqlEvent[]) => {
        ops.forEach(o => {
          if (o.type === "response") {
            console.log(o);
            startQuery(o.data.operation);
          }

          return;
        });
      }
    );
  }, []);

  useEffect(() => {
    return addMessageHandler(msg => {
      if (["response"].includes(msg.type)) {
        setOperations(o => [msg, ...o]);
      }

      console.log("incoming Explorer EVENT:", msg);
    });
  }, []);

  const value = {
    data: operations
  };

  return (
    <ExplorerContext.Provider value={value}>
      {children}
    </ExplorerContext.Provider>
  );
}

type DataField = Scalar | (Scalar | null)[] | null;

interface FieldNode {
  name: string;
  args: Variables | null;
  value?: DataField;
  children?: NodeMap;
  map?: NodeMap;
}

interface NodeMap {
  [key: string]: FieldNode;
}

interface Data {
  [fieldName: string]: Data | DataField;
}

export interface OperationRequest {
  query: DocumentNode;
  variables?: object;
}

interface QueryResult {
  data: Data;
}

export const startQuery = (request: any) => {
  const operation = getMainOperation(request.query);
  const root = {};
  const result: QueryResult = {
    data: root
  };
  const map = {};

  const ctx: any = {
    variables: normalizeVariables(operation, request.variables),
    fragments: getFragments(request.query),
    result
  };

  copyFromData(ctx, map, getSelectionSet(operation), root);

  return result.data;
};

export const keyOfField = (fieldName: string, args?: null | Variables) =>
  args ? `${fieldName}(${stringify(args)})` : fieldName;

export const joinKeys = (parentKey: string, key: string) =>
  `${parentKey}.${key}`;

function copyFromData(
  ctx: any,
  map: NodeMap,
  selection: SelectionSet,
  data: Data
) {
  selection.forEach(fieldNode => {
    if (isFieldNode(fieldNode)) {
      const fieldName = getName(fieldNode);
      const fieldArgs = getFieldArguments(fieldNode, ctx.variables);
      const fieldAlias = getFieldAlias(fieldNode);
      const fieldKey = keyOfField(fieldAlias, fieldArgs);

      const node =
        map[fieldKey] ||
        (map[fieldKey] = {
          name: fieldName,
          args: fieldArgs
        });

      if (fieldNode.selectionSet !== undefined) {
        const fieldNodeMap = (node.children = {});
        const innerMap = fieldNodeMap;
        //@ts-ignore
        data[fieldKey] = { ...node };
        //@ts-ignore

        data[fieldKey].children = innerMap;

        copyFromData(
          ctx,
          innerMap,
          getSelectionSet(fieldNode),
          //@ts-ignore

          data[fieldKey].children
        );
      } else {
        data[fieldKey] = node;
      }
    } else {
      const fragmentNode = isInlineFragment(fieldNode)
        ? fieldNode
        : ctx.fragments[getName(fieldNode)];
      copyFromData(ctx, map, getSelectionSet(fragmentNode), data);
    }
  });
}
