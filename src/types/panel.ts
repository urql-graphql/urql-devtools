import { DevtoolsExchangeIncomingMessage } from "@urql/devtools";

export interface InitPanelMessage {
  type: "init";
  tabId: number;
}

export interface RequestVersionMessage {
  type: "request-version";
}

export type PanelOutgoingMessage =
  | InitPanelMessage
  | DevtoolsExchangeIncomingMessage;
