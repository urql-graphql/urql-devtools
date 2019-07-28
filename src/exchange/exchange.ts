import { pipe, tap, toPromise } from "wonka";
import {
  Exchange,
  Client,
  Operation,
  OperationResult,
  createRequest
} from "urql";
import { UrqlEvent, DevtoolsMessage } from "../types-old";

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
    events: []
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
  const event = JSON.parse(JSON.stringify(parseStreamData(op))); // Serialization required for some events (such as error)

  // Dispatch for panel
  sendToContentScript(event);

  // Add to window cache
  window.__urql__.events = [event, ...window.__urql__.events];
};

const handleMessage = (client: Client) => (message: DevtoolsMessage) => {
  if (message.type === "request") {
    const isMutation = /(^|\W)+mutation\W/.test(message.query);
    const execFn = isMutation ? client.executeMutation : client.executeQuery;

    pipe(
      execFn(createRequest(message.query), {
        meta: { source: "Devtools" }
      }),
      toPromise
    );
  }
};

const parseStreamData = <T extends Operation | OperationResult>(op: T) => {
  const timestamp = new Date().valueOf();

  // Outgoing operation
  if ("operationName" in op) {
    return { type: "operation", data: op as Operation, timestamp } as const;
  }

  // Incoming error
  if ((op as OperationResult).error !== undefined) {
    return { type: "error", data: op as OperationResult, timestamp } as const;
  }

  // Incoming response
  return { type: "response", data: op as OperationResult, timestamp } as const;
};

const sendToContentScript = (oe: ContentScriptEvent) =>
  window.dispatchEvent(new CustomEvent("urql-out", { detail: oe }));

type ContentScriptEvent = UrqlEvent | "init";
