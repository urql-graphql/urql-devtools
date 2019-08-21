import { Operation, OperationResult } from "urql";

/** Dispatched when an operation is dispatched in the urql client. */
export interface OperationMessage {
  type: "operation";
  data: Operation;
  timestamp: number;
}

/** Dispatched when an operation result without an error has been returned. */
export interface OperationResponseMessage {
  type: "response";
  data: OperationResult;
  timestamp: number;
}

/** Dispatched when an operation result with an error has been returned. */
export interface OperationErrorMessage {
  type: "error";
  data: OperationResult;
  timestamp: number;
}

export interface InitMessage {
  type: "init";
}

/** Messages being sent by the devtools exchange to the content script. */
export type DevtoolsExchangeOutgoingMessage =
  | OperationMessage
  | OperationResponseMessage
  | OperationErrorMessage
  | InitMessage;

/** Event type associated with events triggered by the exchange. */
export const DevtoolsExchangeOutgoingEventType = "urql-devtools-exchange" as const;
