import React from "react";
import styled from "styled-components";
import { scaleLinear } from "d3-scale";
import { TimelineContext } from "../../../context";
import { TimelineRow } from "./TimelineRow";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px;
  flex-direction: column;
  background: ${(props) => props.theme.dark["0"]};
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
    source: ["devtoolsExchange"],
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
                },
                {
                  type: "update",
                  message: "An update occured",
                  timestamp: Date.now() + 25000,
                  source: "otherExchange",
                },
                {
                  type: "error",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 65000,
                  source: "devtoolsExchange",
                },
                {
                  type: "teardown",
                  message: "The operation stream was torn down",
                  timestamp: Date.now() + 80000,
                  source: "devtoolsExchange",
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
                },
                {
                  type: "fetchRequest",
                  message: "An update occured",
                  timestamp: Date.now(),
                  source: "devtoolsExchange",
                },
                {
                  type: "fetchSuccess",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 65000,
                  source: "devtoolsExchange",
                },
                {
                  type: "teardown",
                  message: "The operation stream was torn down",
                  timestamp: Date.now() + 80000,
                  source: "devtoolsExchange",
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
                },
                {
                  type: "fetchRequest",
                  message: "An update occured",
                  timestamp: Date.now(),
                  source: "devtoolsExchange",
                },
                {
                  type: "fetchError",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 65000,
                  source: "devtoolsExchange",
                },
                {
                  type: "teardown",
                  message: "The operation stream was torn down",
                  timestamp: Date.now() + 80000,
                  source: "devtoolsExchange",
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
                },
                {
                  type: "fetchRequest",
                  message: "An update occured",
                  timestamp: Date.now(),
                  source: "devtoolsExchange",
                },
              ] as any
            }
          />
        </TimelineContext.Provider>
      </Viewport>
    </Wrapper>
  ),
};
