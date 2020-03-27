import React from "react";
import gql from "graphql-tag";
import { ReceivedDebugEvent } from "../../../../types";
import { TimelinePane } from "./TimelinePane";

const mockDebugEvent: ReceivedDebugEvent = {
  key: 1,
  timestamp: 1234,
  type: "operation",
  message: "operation execution event",
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
  combined: <TimelinePane data-snapshot event={mockDebugEvent} />,
};
