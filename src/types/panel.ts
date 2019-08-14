import { DevtoolsExchangeIncomingMessage } from "@urql/devtools";

export interface InitPanelMessage {
  type: "init";
  tabId: number;
}

export type PanelOutgoingMessage =
  | InitPanelMessage
  | DevtoolsExchangeIncomingMessage;
