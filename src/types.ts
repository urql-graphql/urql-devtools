import { Operation } from "urql";

export interface OperationEvent {
  type: "operation";
  data: Operation;
  timestamp: number;
  source?: string;
}
