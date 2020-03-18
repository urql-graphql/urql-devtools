import React from "react";
import styled from "styled-components";
import { ReceivedDebugEvent } from "../../../types";
import { TimelineEvent } from "./TimelineEvent";

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  background: ${props => props.theme.dark["0"]};
  flex-grow: 1;
  padding: 100px;
`;

const props = {
  selectEvent: () => false
};

const queryEvent: ReceivedDebugEvent = {
  type: "query"
} as any;

const mutationEvent: ReceivedDebugEvent = {
  type: "mutation"
} as any;

const subscriptionEvent: ReceivedDebugEvent = {
  type: "subscription"
} as any;

const responseEvent: ReceivedDebugEvent = {
  type: "response"
} as any;

const errorEvent: ReceivedDebugEvent = {
  type: "error"
} as any;

const teardownEvent: ReceivedDebugEvent = {
  type: "teardown"
} as any;

export default {
  "addition (query)": (
    <Wrapper>
      <TimelineEvent {...props} event={queryEvent} />
    </Wrapper>
  ),
  "addition (mutation)": (
    <Wrapper>
      <TimelineEvent {...props} event={mutationEvent} />
    </Wrapper>
  ),
  "addition (subscription)": (
    <Wrapper>
      <TimelineEvent {...props} event={subscriptionEvent} />
    </Wrapper>
  ),
  "update (response)": (
    <Wrapper>
      <TimelineEvent {...props} event={responseEvent} />
    </Wrapper>
  ),
  "update (error)": (
    <Wrapper>
      <TimelineEvent {...props} event={errorEvent} />
    </Wrapper>
  ),
  teardown: (
    <Wrapper>
      <TimelineEvent {...props} event={teardownEvent} />
    </Wrapper>
  )
};
