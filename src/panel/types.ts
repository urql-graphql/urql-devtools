export type EventType =
  | "subscription"
  | "query"
  | "mutation"
  | "response"
  | "error";

export interface EventPanel<T = any> {
  name: string;
  data: T;
}

export interface ParsedEventBase {
  type: EventType;
  key: number;
  source: string;
  timestamp: number;
  panels: EventPanel[];
}

export interface ParsedMutationEvent extends ParsedEventBase {
  type: "mutation";
  panels: [
    { name: "query"; data: string },
    { name: "variables"; data: object | undefined },
    { name: "response"; data: object },
    { name: "meta"; data: object }
  ];
}

export interface ParsedQueryEvent extends ParsedEventBase {
  type: "query";
  panels: [
    { name: "query"; data: string },
    { name: "variables"; data: object | undefined },
    { name: "state"; data: object },
    { name: "meta"; data: object }
  ];
}

export interface ParsedResponseEvent extends ParsedEventBase {
  type: "response";
  panels: [{ name: "response"; data: object }, { name: "meta"; data: object }];
}

export interface ParsedErrorEvent extends ParsedEventBase {
  type: "error";
  panels: [
    { name: "error"; data: object | undefined },
    { name: "meta"; data: object }
  ];
}

export type ParsedEvent =
  | ParsedMutationEvent
  | ParsedQueryEvent
  | ParsedResponseEvent
  | ParsedErrorEvent;
