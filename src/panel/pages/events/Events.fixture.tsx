import React, { FC } from "react";
import gql from "graphql-tag";
import {
  OperationMessage,
  OperationResponseMessage,
  OperationErrorMessage,
} from "@urql/devtools";
import { DevtoolsContext, EventsProvider } from "../../context";
import { Events } from "./Events";

const defaultEvents: (
  | OperationMessage
  | OperationResponseMessage
  | OperationErrorMessage
)[] = [
  {
    type: "operation",
    timestamp: 1234,
    data: {
      key: 12345,
      operationName: "query",
      variables: {
        myVar: 1234,
      },
      query: gql`
        {
          todos(id: 1234) {
            id
            content
          }
        }
      `,
      context: {
        url: "http://asdsad",
        requestPolicy: "cache-and-network",
        meta: {
          source: "MyComponent",
        },
      },
    },
  },
  {
    type: "operation",
    timestamp: 1234,
    data: {
      key: 2211,
      operationName: "mutation",
      variables: {
        id: 1,
      },
      query: gql`
        mutation DeleteTodo($id: ID!) {
          deleteTodo(id: $id) {
            id
          }
        }
      `,
      context: {
        url: "http://asdsad",
        requestPolicy: "cache-and-network",
        meta: {
          source: "MyOtherComponent",
        },
      },
    },
  },
];

const DevtoolsContextMock: FC<{ events?: typeof defaultEvents }> = ({
  children,
  events = defaultEvents,
}) => {
  return (
    <DevtoolsContext.Provider
      value={{
        addMessageHandler: (h) => {
          events.forEach(h);
          return () => false;
        },
        clientConnected: true,
        sendMessage: () => false,
      }}
    >
      <EventsProvider>{children}</EventsProvider>
    </DevtoolsContext.Provider>
  );
};

export default {
  basic: (
    <DevtoolsContextMock>
      <Events />
    </DevtoolsContextMock>
  ),
  empty: (
    <DevtoolsContextMock events={[]}>
      <Events />
    </DevtoolsContextMock>
  ),
};
