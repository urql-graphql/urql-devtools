import React from "react";
import styled from "styled-components";
import {
  TimelineAliveDuration,
  TimelineNetworkDuration,
} from "./TimelineDuration";

const Wrapper = styled.div`
  display: flex;
  padding: 100px;
  background: ${(props) => props.theme.dark["0"]};
  flex-grow: 1;

  > :first-child {
    width: 100px;
  }
`;

export default {
  "Alive: basic": (
    <Wrapper>
      <TimelineAliveDuration data-snapshot />
    </Wrapper>
  ),
  "Network: fetching": (
    <Wrapper>
      <TimelineNetworkDuration data-snapshot state="fetching" />
    </Wrapper>
  ),
  "Network: success": (
    <Wrapper>
      <TimelineNetworkDuration data-snapshot state="success" />
    </Wrapper>
  ),
  "Network: error": (
    <Wrapper>
      <TimelineNetworkDuration data-snapshot state="error" />
    </Wrapper>
  ),
};
