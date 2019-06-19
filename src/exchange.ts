import { pipe, tap } from "wonka";
import { Exchange, Client, Operation, OperationResult } from "urql";
import { OperationEvent } from "./types";
declare global {
  interface Window {
    __urql__: {
      client: Client;
      operations: OperationEvent[];
    };
  }
}

export const devtoolsExchange: Exchange = ({ client, forward }) => {
  if (process.env.NODE_ENV === "production") {
    return ops$ =>
      pipe(
        ops$,
        forward
      );
  }

  window.__urql__ = {
    client,
    operations: []
  };
  sendToContentScript("init");

  return ops$ => {
    return pipe(
      ops$,
      tap(handleOperation),
      forward,
      tap(handleOperation)
    );
  };
};

const handleOperation = (op: Operation | OperationResult) => {
  const typedOp = isOperation(op)
    ? ({ type: "operation", data: op } as const)
    : ({ type: "response", data: op } as const);

  const operationEvent = {
    ...typedOp,
    timestamp: new Date().valueOf()
  } as const;

  // Dispatch for panel
  sendToContentScript(operationEvent);

  // Add to window cache
  window.__urql__.operations = [...window.__urql__.operations, operationEvent];
};

/** Type guard. */
const isOperation = (o: any): o is Operation =>
  o["operationName"] !== undefined;

const sendToContentScript = (oe: ContentScriptEvent) =>
  window.dispatchEvent(new CustomEvent("urql", { detail: oe }));

type ContentScriptEvent = OperationEvent | "init";
