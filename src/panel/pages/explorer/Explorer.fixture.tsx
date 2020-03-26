import React, { FC, useMemo } from "react";
import gql from "graphql-tag";
import { OperationResponseMessage } from "@urql/devtools";
import {
  DevtoolsContext,
  ExplorerProvider,
  DevtoolsContextType,
} from "../../context";
import { Explorer } from "./Explorer";

const defaultEvents: OperationResponseMessage[] = [
  ({
    type: "response",
    data: {
      operation: {
        key: 12345,
        operationName: "query",
        variables: {
          name: "carl",
          address: {
            postcode: "E1",
          },
        },
        query: gql`
          query getTodos($name: String!, $address: Address!) {
            todos(id: 1234, name: $name, address: $address) {
              id
              content
              __typename
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
      data: {
        todos: [
          {
            id: 1234,
            content: "My todo",
            __typename: "Todo",
          },
          {
            id: 5678,
            content: "My other todo",
            __typename: "Todo",
          },
        ],
      },
    },
  } as unknown) as OperationResponseMessage,
];

const DevtoolsContextMock: FC<
  { events?: typeof defaultEvents } & Partial<DevtoolsContextType>
> = ({ children, events = defaultEvents, ...val }) => {
  const value = useMemo<DevtoolsContextType>(
    () => ({
      addMessageHandler: (h) => {
        events.forEach(h);
        return () => false;
      },
      clientConnected: true,
      sendMessage: () => false,
      ...val,
    }),
    []
  );

  return (
    <DevtoolsContext.Provider value={value}>
      <ExplorerProvider>{children}</ExplorerProvider>
    </DevtoolsContext.Provider>
  );
};

export default {
  basic: (
    <DevtoolsContextMock>
      <Explorer />
    </DevtoolsContextMock>
  ),
  updating: (
    <DevtoolsContextMock
      addMessageHandler={(h) => {
        const event = defaultEvents[0];
        let content = 1;
        const update = () =>
          h({
            ...event,
            data: {
              ...event.data,
              data: {
                todos: [
                  {
                    id: 123,
                    content: content.toString(),
                    __typename: "Todo",
                  },
                ],
              },
            },
          });
        update();
        setInterval(() => {
          update();
          content += 1;
        }, 1500);

        return () => false;
      }}
    >
      <Explorer />
    </DevtoolsContextMock>
  ),
};
