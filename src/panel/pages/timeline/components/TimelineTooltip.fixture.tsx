import React from "react";
import styled from "styled-components";
import { TimelineTooltip } from "./TimelineTooltip";

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  background: ${props => props.theme.dark["0"]};
  flex-grow: 1;
`;

export default {
  basic: (
    <Wrapper>
      <TimelineTooltip>A network response or cache update</TimelineTooltip>
    </Wrapper>
  ),
  positioned: (
    <Wrapper>
      <TimelineTooltip pos={{ x: 50, y: 50 }}>
        A network response or cache update
      </TimelineTooltip>
    </Wrapper>
  )
};
