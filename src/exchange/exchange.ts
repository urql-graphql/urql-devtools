import { map, pipe, tap, toPromise } from "wonka";

import {
  Exchange,
  Client,
  Operation,
  OperationResult,
  createRequest
} from "urql";

import {
  DevtoolsExchangeOutgoingMessage,
  ExecuteRequestMessage
} from "./types";

import { getDisplayName } from "./getDisplayName";

export const devtoolsExchange: Exchange = ({ client, forward }) => {
  if (process.env.NODE_ENV === "production") {
    return ops$ =>
      pipe(
        ops$,
        forward
      );
  }

  // Expose graphql url for introspection
  window.__urql__ = {
    client,
    events: []
  };

  // Listen for messages from content script
  window.addEventListener("urql-in", (e: any) => {
    const handler = (messageHandlers as any)[e.detail.type];
    handler && handler(client)(e.detail);
  });
  sendToContentScript({ type: "init" });

  return ops$ => {
    return pipe(
      ops$,
      map(addOperationContext),
      tap(handleOperation),
      forward,
      map(addOperationResponseContext),
      tap(handleOperation)
    );
  };
};

const addOperationResponseContext = (op: OperationResult): OperationResult => {
  return {
    ...op,
    operation: {
      ...op.operation,
      context: {
        ...op.operation.context,
        meta: {
          ...op.operation.context.meta,
          // @ts-ignore
          networkLatency: Date.now() - op.operation.context.meta.startTime
        }
      }
    }
  };
};

const addOperationContext = (op: Operation): Operation => {
  return {
    ...op,
    context: {
      ...op.context,
      meta: {
        ...op.context.meta,
        source: getDisplayName(),
        // @ts-ignore
        startTime: Date.now()
      }
    }
  };
};

/** Handle operation or response from stream. */
const handleOperation = <T extends Operation | OperationResult>(op: T) => {
  const event = JSON.parse(JSON.stringify(parseStreamData(op))); // Serialization required for some events (such as error)
  sendToContentScript(event);
  window.__urql__.events = [event, ...window.__urql__.events];
};

/** Handles execute request messages. */
const requestHandler = (client: Client) => (message: ExecuteRequestMessage) => {
  const isMutation = /(^|\W)+mutation\W/.test(message.query);
  const execFn = isMutation ? client.executeMutation : client.executeQuery;

  pipe(
    execFn(createRequest(message.query), {
      meta: { source: "Devtools" }
    }),
    toPromise
  );
};

/** Map of handlers for incoming messages. */
const messageHandlers = {
  request: requestHandler
} as const;

/** Creates a DevtoolsExchangeOutgoingMessage from operations/responses. */
const parseStreamData = <T extends Operation | OperationResult>(op: T) => {
  const timestamp = new Date().valueOf();

  // Outgoing operation
  if ("operationName" in op) {
    return {
      type: "operation",
      data: op,
      timestamp
    } as const;
  }

  // Incoming error
  if ((op as OperationResult).error !== undefined) {
    return { type: "error", data: op, timestamp } as const;
  }

  // Incoming response
  return {
    type: "response",
    data: op,
    timestamp
  } as const;
};

const sendToContentScript = (detail: DevtoolsExchangeOutgoingMessage) =>
  window.dispatchEvent(new CustomEvent("urql-out", { detail }));
