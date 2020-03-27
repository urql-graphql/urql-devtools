import React from "react";
import styled from "styled-components";
import { ReceivedDebugEvent } from "../../../types";
import { TimelineEvent } from "./TimelineEvent";

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  background: ${(props) => props.theme.dark["0"]};
  flex-grow: 1;
  padding: 100px;
`;

const props = {
  selectEvent: () => false,
};

const executionEvent: ReceivedDebugEvent = {
  type: "execution",
} as any;

const updateEvent: ReceivedDebugEvent = {
  type: "update",
} as any;

const teardownEvent: ReceivedDebugEvent = {
  type: "teardown",
} as any;

const otherEvent: ReceivedDebugEvent = {
  type: "abcdefg",
} as any;

export default {
  execution: (
    <Wrapper>
      <TimelineEvent data-snapshot {...props} event={executionEvent} />
    </Wrapper>
  ),
  update: (
    <Wrapper>
      <TimelineEvent data-snapshot {...props} event={updateEvent} />
    </Wrapper>
  ),
  teardown: (
    <Wrapper>
      <TimelineEvent data-snapshot {...props} event={teardownEvent} />
    </Wrapper>
  ),
  other: (
    <Wrapper>
      <TimelineEvent data-snapshot {...props} event={otherEvent} />
    </Wrapper>
  ),
};
