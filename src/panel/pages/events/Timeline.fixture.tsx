import React, { FC, useMemo } from "react";
import { DebugEvent } from "@urql/core";
import gql from "graphql-tag";
import { TimelineProvider, DevtoolsContext } from "../../context";
import { Timeline } from "./Timeline";

const operation1 = {
  key: 1,
  operationName: "query",
  query: gql`
    query Users {
      users {
        id
        name
        posts {
          id
          title
        }
      }
    }
  `,
};

const operation2 = {
  key: 2,
  operationName: "mutation",
  query: gql`
    mutation AddUser($id: ID!) {
      addUser(id: $id) {
        id
        name
        posts {
          id
          title
        }
      }
    }
  `,
  variables: {
    id: 1234,
  },
};

const defaultEvents: DebugEvent[] = [
  {
    type: "debug-event",
    data: {
      type: "execution",
      message: "A listener was added to the stream",
      operation: operation1,
      source: "devtoolsExchange",
    },
  },
  {
    type: "debug-event",
    data: {
      type: "fetchRequest",
      message: "An update occured",
      operation: operation1,
      source: "fetchExchange",
    },
  },
  {
    type: "debug-event",
    data: {
      type: "update",
      message: "This is an update to the operation response / data",
      operation: operation1,
      source: "devtoolsExchange",
    },
  },
  {
    type: "debug-event",
    data: {
      type: "fetchSuccess",
      message: "The fetch request succeeded",
      operation: operation1,
      source: "fetchExchange",
    },
  },
  {
    type: "debug-event",
    data: {
      type: "other",
      message: "This is an update to the operation response / data",
      operation: operation1,
      source: "otherExchange",
    },
  },
  {
    type: "debug-event",
    data: {
      type: "other",
      message: "This is an update to the operation response / data",
      operation: operation1,
      source: "otherExchange",
    },
  },
  {
    type: "debug-event",
    data: {
      type: "error",
      message: "This is an update to the operation response / data",
      operation: operation1,
      source: "fetchExchange",
    },
  },
  {
    type: "debug-event",
    data: {
      type: "update",
      message: "A listener was added to the stream",
      operation: operation2,
      source: "fetchExchange",
    },
  },
  {
    type: "debug-event",
    data: {
      type: "fetchRequest",
      message: "An request was triggered",
      operation: operation2,
      source: "fetchExchange",
    },
  },
  {
    type: "debug-event",
    data: {
      type: "fetchError",
      message: "An request errored",
      operation: operation2,
      source: "fetchExchange",
    },
  },
  {
    type: "debug-event",
    data: {
      type: "teardown",
      message: "A teardown was triggered on the stream",
      operation: operation1,
      source: "devtoolsExchange",
    },
  },
  {
    type: "debug-event",
    data: {
      type: "update",
      message: "An update was triggered on the stream",
      operation: operation2,
      source: "devtoolsExchange",
    },
  },
] as any;

const DevtoolsContextMock: FC<{ events?: typeof defaultEvents }> = ({
  children,
  events = defaultEvents,
}) => {
  return (
    <DevtoolsContext.Provider
      value={useMemo(
        () =>
          ({
            addMessageHandler: (h: any) => {
              let i = 0;

              // h({ ...events[i++ % events.length], timestamp: Date.now() });
              const interval = setInterval(() => {
                const event = events[i++ % events.length];
                h({
                  ...event,
                  data: {
                    ...event.data,
                    timestamp: Date.now(),
                  },
                });
                i === events.length ? clearInterval(interval) : null;
              }, 400);

              return () => clearInterval(interval);
            },
          } as any),
        []
      )}
    >
      {children}
    </DevtoolsContext.Provider>
  );
};

export default {
  empty: (
    <DevtoolsContext.Provider
      value={{ addMessageHandler: () => () => false } as any}
    >
      <TimelineProvider>
        <Timeline data-snapshot />
      </TimelineProvider>
    </DevtoolsContext.Provider>
  ),
  dynamic: (
    <DevtoolsContextMock>
      <TimelineProvider>
        <Timeline />
      </TimelineProvider>
    </DevtoolsContextMock>
  ),
};
