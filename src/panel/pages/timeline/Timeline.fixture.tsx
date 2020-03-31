import React, { FC, useMemo } from "react";
import { DebugEvent } from "@urql/core";
import gql from "graphql-tag";
import { TimelineProvider, DevtoolsContext } from "../../context";
import { Timeline } from "./Timeline";

const query = gql`
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
`;
const defaultEvents: DebugEvent[] = [
  {
    type: "debug",
    data: {
      type: "execution",
      message: "A listener was added to the stream",
      operation: {
        key: 1,
        query,
      },
      query,
    },
  },
  {
    type: "debug",
    data: {
      type: "fetchRequest",
      message: "An update occured",
      operation: {
        key: 1,
        query,
      },
    },
  },
  {
    type: "debug",
    data: {
      type: "update",
      message: "This is an update to the operation response / data",
      operation: {
        key: 1,
        query,
      },
    },
  },
  {
    type: "debug",
    data: {
      type: "fetchResponse",
      message: "The fetch request succeeded",
      operation: {
        key: 1,
        query,
      },
    },
  },
  {
    type: "debug",
    data: {
      type: "other",
      message: "This is an update to the operation response / data",
      operation: {
        key: 1,
        query,
      },
    },
  },
  {
    type: "debug",
    data: {
      type: "other",
      message: "This is an update to the operation response / data",
      operation: {
        key: 1,
        query,
      },
    },
  },
  {
    type: "debug",
    data: {
      type: "error",
      message: "This is an update to the operation response / data",
      operation: {
        key: 1,
        query,
      },
    },
  },
  {
    type: "debug",
    data: {
      type: "update",
      message: "A listener was added to the stream",
      operation: {
        key: 2,
        query,
      },
    },
  },
  {
    type: "debug",
    data: {
      type: "fetchRequest",
      message: "An request was triggered",
      operation: {
        key: 2,
        query,
      },
    },
  },
  {
    type: "debug",
    data: {
      type: "fetchError",
      message: "An request errored",
      operation: {
        key: 2,
        query,
      },
    },
  },
  {
    type: "debug",
    data: {
      type: "teardown",
      message: "A teardown was triggered on the stream",
      operation: {
        key: 1,
        query,
      },
    },
  },
  {
    type: "debug",
    data: {
      type: "teardown",
      message: "A teardown was triggered on the stream",
      operation: {
        key: 2,
        query,
      },
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
              }, 2000);

              return () => clearInterval(interval);
            },
          } as any),
        []
      )}
    >
      <TimelineProvider>{children}</TimelineProvider>
    </DevtoolsContext.Provider>
  );
};

export default {
  basic: (
    <DevtoolsContextMock>
      <Timeline />
    </DevtoolsContextMock>
  ),
};
