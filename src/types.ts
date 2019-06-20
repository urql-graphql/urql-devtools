import { Operation, OperationResult } from "urql";

export type OperationEvent = OutgoingOperation | IncomingResponse;

export interface OutgoingOperation {
  type: "operation";
  data: Operation;
  timestamp: number;
}

export interface IncomingResponse {
  type: "response";
  data: OperationResult;
  timestamp: number;
}

export type ContentScriptMessage = OperationEvent;
