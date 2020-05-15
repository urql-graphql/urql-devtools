import React from "react";
import styled from "styled-components";
import { scaleLinear } from "d3-scale";
import { TimelineContext } from "../../../context";
import { TimelineRow } from "./TimelineRow";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 70px;
  flex-direction: column;
`;

const Viewport = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 300px;
`;

const context = {
  container: {
    clientWidth: 300,
  },
  scale: scaleLinear()
    .domain([Date.now(), Date.now() + 30000])
    .range([0, 300]),
  filter: {
    source: ["devtoolsExchange", "dedupExchange"],
  },
} as any;

export default {
  basic: (
    <Wrapper>
      <Viewport>
        <TimelineContext.Provider value={context}>
          <TimelineRow
            data-snapshot
            events={
              [
                {
                  type: "execution",
                  message: "A listener was added to the stream",
                  timestamp: Date.now(),
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "query",
                  },
                },
                {
                  type: "update",
                  message: "An update occured",
                  timestamp: Date.now() + 25000,
                  source: "otherExchange",
                  operation: {
                    operationName: "query",
                  },
                },
                {
                  type: "error",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 65000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "query",
                  },
                },
                {
                  type: "teardown",
                  message: "The operation stream was torn down",
                  timestamp: Date.now() + 80000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "query",
                  },
                },
              ] as any
            }
          />
        </TimelineContext.Provider>
      </Viewport>
    </Wrapper>
  ),
  "network success": (
    <Wrapper>
      <Viewport>
        <TimelineContext.Provider value={context}>
          <TimelineRow
            data-snapshot
            events={
              [
                {
                  type: "execution",
                  message: "A listener was added to the stream",
                  timestamp: Date.now(),
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "query",
                  },
                },
                {
                  type: "fetchRequest",
                  message: "An update occured",
                  timestamp: Date.now(),
                  source: "fetchExchange",
                  operation: {
                    operationName: "query",
                  },
                },
                {
                  type: "fetchSuccess",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 65000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "query",
                  },
                },
                {
                  type: "teardown",
                  message: "The operation stream was torn down",
                  timestamp: Date.now() + 80000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "query",
                  },
                },
              ] as any
            }
          />
        </TimelineContext.Provider>
      </Viewport>
    </Wrapper>
  ),
  "network error": (
    <Wrapper>
      <Viewport>
        <TimelineContext.Provider value={context}>
          <TimelineRow
            data-snapshot
            events={
              [
                {
                  type: "execution",
                  message: "A listener was added to the stream",
                  timestamp: Date.now(),
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "query",
                  },
                },
                {
                  type: "fetchRequest",
                  message: "An update occured",
                  timestamp: Date.now(),
                  source: "fetchExchange",
                  operation: {
                    operationName: "query",
                  },
                },
                {
                  type: "fetchError",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 65000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "query",
                  },
                },
                {
                  type: "teardown",
                  message: "The operation stream was torn down",
                  timestamp: Date.now() + 80000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "query",
                  },
                },
              ] as any
            }
          />
        </TimelineContext.Provider>
      </Viewport>
    </Wrapper>
  ),
  "network fetching": (
    <Wrapper>
      <Viewport>
        <TimelineContext.Provider value={context}>
          <TimelineRow
            events={
              [
                {
                  type: "execution",
                  message: "A listener was added to the stream",
                  timestamp: Date.now(),
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "query",
                  },
                },
                {
                  type: "fetchRequest",
                  message: "An update occured",
                  timestamp: Date.now(),
                  source: "fetchExchange",
                  operation: {
                    operationName: "query",
                  },
                },
              ] as any
            }
          />
        </TimelineContext.Provider>
      </Viewport>
    </Wrapper>
  ),
  "mutation update": (
    <Wrapper>
      <Viewport>
        <TimelineContext.Provider value={context}>
          <TimelineRow
            data-snapshot
            events={
              [
                {
                  type: "execution",
                  message: "A listener was added to the stream",
                  timestamp: Date.now(),
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
                {
                  type: "dedup",
                  message: "Mutation was deduped",
                  timestamp: Date.now() + 2000,
                  source: "dedupExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
                {
                  type: "update",
                  message: "An update occured",
                  timestamp: Date.now() + 3000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
                {
                  type: "execution",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 5000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
                {
                  type: "execution",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 6000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
                {
                  type: "update",
                  message: "An update occured",
                  timestamp: Date.now() + 7000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
                {
                  type: "update",
                  message: "An update occured",
                  timestamp: Date.now() + 8000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
              ] as any
            }
          />
        </TimelineContext.Provider>
      </Viewport>
    </Wrapper>
  ),
  "mutation error": (
    <Wrapper>
      <Viewport>
        <TimelineContext.Provider value={context}>
          <TimelineRow
            data-snapshot
            events={
              [
                {
                  type: "execution",
                  message: "A listener was added to the stream",
                  timestamp: Date.now(),
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
                {
                  type: "dedup",
                  message: "Mutation was deduped",
                  timestamp: Date.now() + 3000,
                  source: "dedupExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
                {
                  type: "error",
                  message: "An error occured",
                  timestamp: Date.now() + 4000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
                {
                  type: "execution",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 5000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
                {
                  type: "error",
                  message: "An error occured",
                  timestamp: Date.now() + 7000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
              ] as any
            }
          />
        </TimelineContext.Provider>
      </Viewport>
    </Wrapper>
  ),
  "mutation (with group)": (
    <Wrapper>
      <Viewport>
        <TimelineContext.Provider value={context}>
          <TimelineRow
            data-snapshot
            events={
              [
                {
                  type: "execution",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 1000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
                {
                  type: "execution",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 1001,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
                {
                  type: "update",
                  message: "An update occured",
                  timestamp: Date.now() + 8000,
                  source: "devtoolsExchange",
                  operation: {
                    operationName: "mutation",
                  },
                },
              ] as any[]
            }
          />
        </TimelineContext.Provider>
      </Viewport>
    </Wrapper>
  ),
};
