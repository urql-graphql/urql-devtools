export interface ExecuteRequestMessage {
  type: "request";
  query: string;
}

export type DevtoolsExchangeIncomingMessage = ExecuteRequestMessage;

export const DevtoolsExchangeIncomingEventType = "urql-devtools-exchange-in" as const;
