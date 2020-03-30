import React from "react";
import styled from "styled-components";
import { TimelineNetworkDuration } from "./TimelineNetworkDuration";

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
  fetching: (
    <Wrapper>
      <TimelineNetworkDuration data-snapshot state="fetching" />
    </Wrapper>
  ),
  success: (
    <Wrapper>
      <TimelineNetworkDuration data-snapshot state="success" />
    </Wrapper>
  ),
  error: (
    <Wrapper>
      <TimelineNetworkDuration data-snapshot state="error" />
    </Wrapper>
  ),
};
