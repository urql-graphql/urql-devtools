import { print } from "graphql";
import React, {
  createContext,
  FC,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback
} from "react";
import {
  ParsedEvent,
  ParsedMutationEvent,
  ParsedQueryEvent,
  ParsedResponseEvent,
  ParsedErrorEvent,
  EventType,
  ParsedSubscriptionEvent,
  ParsedTeardownEvent
} from "../types";
import {
  UrqlEvent,
  OutgoingOperation,
  IncomingResponse,
  IncomingError
} from "../../types-old";
import { DevtoolsContext } from "./Devtools";
import {
  DevtoolsExchangeOutgoingMessage,
  OperationMessage,
  InitMessage
} from "@urql/devtools";

export interface EventsContextValue {
  events: ParsedEvent[];
  selectedEvent?: ParsedEvent;
  selectEvent: (event: ParsedEvent) => void;
  clearSelectedEvent: () => void;
  activeFilters: FilterState;
  addFilter: <T extends keyof FilterState, V extends FilterState[T][number]>(
    property: T,
    value: V
  ) => void;
  removeFilter: <T extends keyof FilterState, V extends FilterState[T][number]>(
    property: T,
    value: V
  ) => void;
}

interface FilterState {
  type: EventType[];
  source: string[];
  key: number[];
}

type PresentedEvent = Exclude<DevtoolsExchangeOutgoingMessage, InitMessage>;

export const EventsContext = createContext<EventsContextValue>(null as any);

export const EventsProvider: FC = ({ children }) => {
  const { addMessageHandler } = useContext(DevtoolsContext);
  const [rawEvents, setRawEvents] = useState<PresentedEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ParsedEvent | undefined>(
    undefined
  );
  const [filters, setFilters] = useState<FilterState>({
    type: [],
    source: [],
    key: []
  });

  // /** Set initial state from cache */
  // useEffect(() => {
  //   window.chrome.devtools.inspectedWindow.eval(
  //     `window.__urql__.events`,
  //     (ops: UrqlEvent[]) => {
  //       console.log(ops);
  //       setRawEvents(ops);
  //     }
  //   );
  // }, []);

  /** Handle incoming events */
  useEffect(() => {
    return addMessageHandler(msg => {
      if (!["operation", "response", "error"].includes(msg.type)) {
        return;
      }

      setRawEvents(o => [msg as PresentedEvent, ...o]);
    });
  }, []);

  const addFilter = useCallback<EventsContextValue["addFilter"]>(
    (property, value) =>
      setFilters(f => ({
        ...f,
        [property]: [...new Set([...f[property], value])]
      })),
    []
  );

  const removeFilter = useCallback<EventsContextValue["removeFilter"]>(
    (property, value) =>
      setFilters(f => ({
        ...f,
        [property]: (f[property] as typeof value[]).filter(val => val !== value)
      })),
    []
  );

  const selectEvent = useCallback(
    (op: ParsedEvent) => setSelectedEvent(op),
    []
  );

  const clearSelectedEvent = useCallback(() => setSelectedEvent(undefined), []);

  const applyFilter = useCallback(
    (e: ParsedEvent) => {
      const typeFilter =
        filters.type.length === 0 ? true : filters.type.includes(e.type);
      const sourceFilter =
        filters.source.length === 0 ? true : filters.source.includes(e.source);
      const keyFilter =
        filters.key.length === 0 ? true : filters.key.includes(e.key);

      return typeFilter && sourceFilter && keyFilter;
    },
    [filters]
  );

  /** Events which are cleaned for rendering */
  const events = useMemo(
    () =>
      rawEvents
        .map(e =>
          e.type === "operation"
            ? parseOperation(rawEvents, e)
            : parseResponse(e)
        )
        .filter(applyFilter),
    [applyFilter, rawEvents]
  );

  const value = {
    events,
    selectedEvent,
    selectEvent,
    clearSelectedEvent,
    activeFilters: filters,
    addFilter,
    removeFilter
  };

  return <EventsContext.Provider value={value} children={children} />;
};

const parseOperation = (
  allEvents: PresentedEvent[],
  event: OutgoingOperation
):
  | ParsedQueryEvent
  | ParsedMutationEvent
  | ParsedSubscriptionEvent
  | ParsedTeardownEvent => {
  const shared = {
    key: event.data.key,
    source: (event.data.context.meta as any).source,
    timestamp: event.timestamp
  } as const;
  const queryPanel = { name: "query", data: print(event.data.query) } as const;
  const varsPanel = { name: "variables", data: event.data.variables } as const;
  const metaPanel = {
    name: "meta",
    data: {
      key: event.data.key,
      operationName: event.data.operationName,
      context: event.data.context
    }
  } as const;

  const type = event.data.operationName;

  const responseEvent = allEvents
    // Only events after the request
    .filter(e => e.type !== "operation" && e.timestamp > event.timestamp)
    // First response for mutation, latest response for query
    .sort((a, b) =>
      type === "mutation"
        ? a.timestamp - b.timestamp
        : b.timestamp - a.timestamp
    )
    .find(
      e =>
        (e as IncomingError | IncomingResponse).data.operation.key ===
        event.data.key
    ) as IncomingError | IncomingResponse | undefined;
  const responseData =
    responseEvent === undefined
      ? {}
      : { data: responseEvent.data.data, error: responseEvent.data.error };

  /**
   * Conditionals can't be called during object construction
   * if we want to keep implicit type safety :(
   */
  if (type === "mutation") {
    return {
      type,
      ...shared,
      panels: [
        queryPanel,
        varsPanel,
        { name: "response", data: responseData },
        metaPanel
      ]
    };
  }

  if (type === "query") {
    return {
      type,
      ...shared,
      panels: [
        queryPanel,
        varsPanel,
        { name: "state", data: responseData },
        metaPanel
      ]
    };
  }

  return {
    type,
    ...shared,
    panels: [metaPanel]
  };
};

const parseResponse = (
  event: IncomingResponse | IncomingError
): ParsedResponseEvent | ParsedErrorEvent => {
  const shared = {
    key: event.data.operation.key,
    source: (event.data.operation.context.meta as any).source,
    timestamp: event.timestamp
  };
  const metaPanel = {
    name: "meta",
    data: {
      key: event.data.operation.key,
      operationName: event.data.operation.operationName,
      context: event.data.operation.context
    }
  } as const;

  const type = event.data.error !== undefined ? "error" : ("response" as const);

  if (type === "error") {
    return {
      type,
      ...shared,
      panels: [{ name: "error", data: event.data.error }, metaPanel]
    };
  }

  // TODO: Fix
  if (type === "response" || true) {
    return {
      type,
      ...shared,
      panels: [{ name: "response", data: event.data.data }, metaPanel]
    };
  }
};
