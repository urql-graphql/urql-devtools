import React from "react";
import { parse } from "graphql";
import { TimelinePane, DebugEvent } from "./TimelinePane";
const mockDebugEvent: DebugEvent = {
  type: "operation",
  message: "operation addition event",
  operation: {
    operationName: "query",
    key: 1,
    context: {
      requestPolicy: "network-only",
      url: "https://example.com/graphql"
    },
    query: parse(`query { 
  todos(id: 1234) { 
    id 
    content 
  } 
}`),
    variables: {
      myVar: 1234
    }
  },
  data: {
    myData: 4321
  }
};

export default {
  combined: <TimelinePane event={mockDebugEvent} />
};
