import { pipe, tap } from "wonka";
import { Exchange, Client, Operation } from "urql";
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

  return ops$ => {
    return pipe(
      ops$,
      tap(handleOperation),
      forward
    );
  };
};

const handleOperation = (op: Operation) => {
  const operationEvent = {
    type: "operation",
    data: op,
    timestamp: new Date().valueOf()
  } as const;

  // Dispatch for panel
  sendToContentScript(operationEvent);

  // Add to window cache
  window.__urql__.operations = [...window.__urql__.operations, operationEvent];
};

const sendToContentScript = (oe: OperationEvent) =>
  window.dispatchEvent(new CustomEvent("urql", { detail: oe }));
