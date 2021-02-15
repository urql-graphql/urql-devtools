import React from "react";
import gql from "graphql-tag";
import { DebugEvent } from "@urql/core";
import { TimelineContext } from "../../../../context";
import { TimelinePane } from "./TimelinePane";

const state = {
  startTime: 1000,
} as any;

const mockDebugEvent: DebugEvent = {
  timestamp: 1234,
  type: "execution",
  message: "An operation was executed",
  source: "MyComponent",
  operation: {
    kind: "query",
    key: 1,
    context: {
      requestPolicy: "network-only",
      url: "https://example.com/graphql",
    },
    query: gql`
      query {
        todos(id: 1234) {
          id
          content
        }
      }
    `,
    variables: {
      myVar: 1234,
    },
  },
  data: {
    myData: 4321,
  },
};

export default {
  event: (
    <TimelineContext.Provider value={state}>
      <TimelinePane data-snapshot event={mockDebugEvent} />
    </TimelineContext.Provider>
  ),
  "event (without metadata)": (
    <TimelineContext.Provider value={state}>
      <TimelinePane
        data-snapshot
        event={{
          ...mockDebugEvent,
          data: undefined,
          operation: { ...mockDebugEvent.operation, variables: undefined },
        }}
      />
    </TimelineContext.Provider>
  ),
  source: (
    <TimelineContext.Provider value={state}>
      <TimelinePane data-snapshot source={mockDebugEvent.operation} />
    </TimelineContext.Provider>
  ),
  "source (without variables)": (
    <TimelineContext.Provider value={state}>
      <TimelinePane
        data-snapshot
        source={{ ...mockDebugEvent.operation, variables: undefined }}
      />
    </TimelineContext.Provider>
  ),
};
