import React, { FC, useMemo } from "react";
import gql from "graphql-tag";
import { ExchangeDebugEventMessage } from "@urql/devtools";
import {
  DevtoolsContext,
  ExplorerProvider,
  DevtoolsContextType,
} from "../../context";
import { Explorer } from "./Explorer";

export const defaultEvents: ExchangeDebugEventMessage[] = [
  {
    type: "debug-event",
    source: "exchange",
    data: {
      type: "update",
      message: "Todo message",
      source: "MyComponent",
      timestamp: Date.now(),
      operation: {
        key: 12345,
        kind: "query",
        variables: {
          name: "carl",
          address: {
            postcode: "E1",
          },
          other: {
            postcode: "E1",
          },
          other2: {
            postcode: "E1",
          },
        },
        query: gql`
          query getTodos($name: String!, $address: Address!) {
            todos(
              id: 1234
              name: $name
              address: $address
              otherArg: "really long string to cause overflow"
              finalArg: "Other long arg to cause overflow"
            ) {
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
        value: {
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
    },
  },
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
      client: {
        connected: true,
        version: {
          mismatch: false,
          required: "",
          actual: "",
        },
      },
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
      <Explorer data-snapshot />
    </DevtoolsContextMock>
  ),
  updating: (
    <DevtoolsContextMock
      addMessageHandler={(h) => {
        const event = defaultEvents[0];
        let content = 1;
        const update = () => {
          const updatedDebugMessage = {
            ...event,
            data: {
              ...event.data,
              data: {
                value: {
                  todos: [
                    {
                      id: 123,
                      content: content.toString(),
                      __typename: "Todo",
                    },
                  ],
                },
              },
            },
          };

          h(updatedDebugMessage);
        };

        update();
        setInterval(() => {
          update();
          content += 1;
        }, 1500);

        return () => false;
      }}
    >
      <Explorer data-snapshot />
    </DevtoolsContextMock>
  ),
};
