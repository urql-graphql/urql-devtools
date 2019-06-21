import { pipe, tap, toPromise } from "wonka";
import {
  Exchange,
  Client,
  Operation,
  OperationResult,
  createRequest
} from "urql";
import { OperationEvent, DevtoolsMessage } from "./types";

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

  // Initialize
  sendToContentScript("init");

  // Listen for messages
  window.addEventListener("urql-in", e =>
    handleMessage(client)((e as CustomEvent).detail)
  );

  return ops$ => {
    return pipe(
      ops$,
      tap(handleOperation),
      forward,
      tap(handleOperation)
    );
  };
};

/** Handle operation or response from stream. */
const handleOperation = <T extends Operation | OperationResult>(op: T) => {
  const timestamp = new Date().valueOf();
  const event =
    op["operationName"] !== undefined
      ? ({ type: "operation", data: op as Operation, timestamp } as const)
      : ({ type: "response", data: op as OperationResult, timestamp } as const);

  // Dispatch for panel
  sendToContentScript(event);

  // Add to window cache
  window.__urql__.operations = [...window.__urql__.operations, event];
};

const handleMessage = (client: Client) => (message: DevtoolsMessage) => {
  if (message.type === "request") {
    const stream = client.executeQuery(createRequest(message.query), {
      devtools: { source: "Devtools" }
    });
    pipe(
      stream,
      toPromise
    );
  }
};

const sendToContentScript = (oe: ContentScriptEvent) =>
  window.dispatchEvent(new CustomEvent("urql-out", { detail: oe }));

type ContentScriptEvent = OperationEvent | "init";
