import React from "react";
import styled from "styled-components";
import { TimelineEventSection } from "./TimelineEventSection";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 30px;
  background: ${props => props.theme.dark["-3"]};
`;

const event = {
  data: {
    test: 1234,
    prop: "Hi there"
  }
} as any;

export default {
  "query section": (
    <Wrapper data-snapshot>
      <TimelineEventSection event={event} />
    </Wrapper>
  )
};
