import React, { FC, useMemo } from "react";
import {
  OperationMessage,
  OperationResponseMessage,
  OperationErrorMessage
} from "@urql/devtools";
import styled from "styled-components";
import { TimelineProvider, DevtoolsContext } from "../../context";
import { Timeline } from "./Timeline";

const Wrapper = styled.div`
  display: flex;
  background: ${props => props.theme.dark["-2"]};
  flex-grow: 1;
  padding: 40px;
`;

const defaultEvents: (
  | OperationMessage
  | OperationResponseMessage
  | OperationErrorMessage
)[] = [
  {
    type: "operation",
    data: {
      key: 1,
      operationName: "query"
    }
  },
  {
    type: "response",
    data: {
      operation: {
        key: 1
      }
    }
  },
  {
    type: "operation",
    data: {
      key: 1,
      operationName: "query"
    }
  },
  {
    type: "teardown",
    data: {
      operationName: "query",
      operation: {
        key: 1
      }
    }
  },
  {
    type: "operation",
    data: {
      key: 1,
      operationName: "query"
    }
  },
  {
    type: "teardown",
    data: {
      operationName: "query",
      operation: {
        key: 1
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
            addMessageHandler: h => {
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
      <Wrapper>
        <Timeline />
      </Wrapper>
    </DevtoolsContextMock>
  )
};
