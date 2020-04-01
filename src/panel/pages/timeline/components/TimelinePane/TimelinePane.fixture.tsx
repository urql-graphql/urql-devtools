import React from "react";
import gql from "graphql-tag";
import { DebugEvent } from "@urql/core";
import { TimelinePane } from "./TimelinePane";

const mockDebugEvent: DebugEvent = {
  timestamp: 1234,
  type: "execution",
  message: "An operation was executed",
  source: "MyComponent",
  operation: {
    operationName: "query",
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
  basic: <TimelinePane data-snapshot event={mockDebugEvent} />,
  "without variables": (
    <TimelinePane
      data-snapshot
      event={{
        ...mockDebugEvent,
        operation: { ...mockDebugEvent.operation, variables: undefined },
      }}
    />
  ),
  "without metadata": (
    <TimelinePane
      data-snapshot
      event={{
        ...mockDebugEvent,
        data: undefined,
        operation: { ...mockDebugEvent.operation, variables: undefined },
      }}
    />
  ),
};
