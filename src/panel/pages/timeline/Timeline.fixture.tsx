import React, { FC, useMemo } from "react";
import { TimelineProvider, DevtoolsContext } from "../../context";
import { ReceivedDebugEvent } from "../../types";
import { Timeline } from "./Timeline";

const defaultEvents: ReceivedDebugEvent[] = [
  {
    type: "debug",
    data: {
      type: "query",
      message: "A listener was added to the stream",
      operation: {
        key: 1
      }
    }
  },
  {
    type: "debug",
    data: {
      type: "response",
      message: "This is an update to the operation response / data",
      operation: {
        key: 1
      }
    }
  },
  {
    type: "debug",
    data: {
      type: "error",
      message: "This is an update to the operation response / data",
      operation: {
        key: 1
      }
    }
  },
  {
    type: "debug",
    data: {
      type: "mutation",
      message: "A listener was added to the stream",
      operation: {
        key: 2
      }
    }
  },
  {
    type: "debug",
    data: {
      type: "teardown",
      message: "A teardown was triggered on the stream",
      operation: {
        key: 1
      }
    }
  },
  {
    type: "debug",
    data: {
      type: "teardown",
      message: "A teardown was triggered on the stream",
      operation: {
        key: 2
      }
    }
  }
] as any;

const DevtoolsContextMock: FC<{ events?: typeof defaultEvents }> = ({
  children,
  events = defaultEvents
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
                h({ ...events[i++ % events.length], timestamp: Date.now() });
                i === events.length ? clearInterval(interval) : null;
              }, 2000);

              return () => clearInterval(interval);
            }
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
  )
};
