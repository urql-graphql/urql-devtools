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
} as any;

export default {
  basic: (
    <Wrapper>
      <Viewport>
        <TimelineContext.Provider value={context}>
          <TimelineRow
            events={
              [
                {
                  type: "execution",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 10000,
                },
                {
                  type: "update",
                  message: "An update occured",
                  timestamp: Date.now() + 25000,
                },
                {
                  type: "error",
                  message: "A listener was added to the stream",
                  timestamp: Date.now() + 65000,
                },
                {
                  type: "teardown",
                  message: "The operation stream was torn down",
                  timestamp: Date.now() + 80000,
                },
              ] as any
            }
          />
        </TimelineContext.Provider>
      </Viewport>
    </Wrapper>
  ),
};
