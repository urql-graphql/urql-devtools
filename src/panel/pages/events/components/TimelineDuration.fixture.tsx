import React from "react";
import styled from "styled-components";
import {
  TimelineAliveDuration,
  TimelineNetworkDuration,
} from "./TimelineDuration";

const Wrapper = styled.div`
  padding: 100px;

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
