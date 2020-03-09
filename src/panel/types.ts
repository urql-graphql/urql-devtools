export type EventType =
  | "subscription"
  | "query"
  | "mutation"
  | "response"
  | "error"
  | "teardown";

export interface EventPanel<T = any> {
  name: string;
  data: T;
}

export interface ParsedEventBase {
  type: EventType;
  key: number;
  source: string;
  timestamp: number;
  panels: readonly EventPanel[];
}

export interface ParsedMutationEvent extends ParsedEventBase {
  type: "mutation";
  panels: readonly [
    { name: "query"; data: string },
    { name: "variables"; data: object | undefined },
    { name: "response"; data: object | undefined },
    { name: "meta"; data: object }
  ];
}

export interface ParsedQueryEvent extends ParsedEventBase {
  type: "query";
  panels: readonly [
    { name: "query"; data: string },
    { name: "variables"; data: object | undefined },
    { name: "state"; data: object | undefined },
    { name: "meta"; data: object }
  ];
}

export interface ParsedSubscriptionEvent extends ParsedEventBase {
  type: "subscription";
}

export interface ParsedTeardownEvent extends ParsedEventBase {
  type: "teardown";
}

export interface ParsedResponseEvent extends ParsedEventBase {
  type: "response";
  panels: readonly [
    { name: "response"; data: object },
    { name: "meta"; data: object }
  ];
}

export interface ParsedErrorEvent extends ParsedEventBase {
  type: "error";
  panels: readonly [
    { name: "error"; data: object | undefined },
    { name: "meta"; data: object }
  ];
}

export type ParsedEvent =
  | ParsedMutationEvent
  | ParsedQueryEvent
  | ParsedResponseEvent
  | ParsedErrorEvent
  | ParsedSubscriptionEvent
  | ParsedTeardownEvent;

type Primitive = number | boolean | string | null;

interface SerializedObject<T extends Primitive = Primitive> {
  [key: string]: T | T[] | SerializedObject;
}

/** GraphQL value that has been serialized. */
export type SerializedValue = Primitive | SerializedObject;
