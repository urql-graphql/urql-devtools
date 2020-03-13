import React from "react";
import styled from "styled-components";
import { ParsedEvent } from "../../../types";
import { TimelineEvent } from "./TimelineEvent";

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  background: ${props => props.theme.dark["0"]};
  flex-grow: 1;
  padding: 100px;
`;

const queryEvent: ParsedEvent = {
  type: "query"
} as any;

const mutationEvent: ParsedEvent = {
  type: "mutation"
} as any;

const subscriptionEvent: ParsedEvent = {
  type: "subscription"
} as any;

const responseEvent: ParsedEvent = {
  type: "response"
} as any;

const errorEvent: ParsedEvent = {
  type: "error"
} as any;

const teardownEvent: ParsedEvent = {
  type: "teardown"
} as any;

export default {
  "addition (query)": (
    <Wrapper>
      <TimelineEvent event={queryEvent} />
    </Wrapper>
  ),
  "addition (mutation)": (
    <Wrapper>
      <TimelineEvent event={mutationEvent} />
    </Wrapper>
  ),
  "addition (subscription)": (
    <Wrapper>
      <TimelineEvent event={subscriptionEvent} />
    </Wrapper>
  ),
  "update (response)": (
    <Wrapper>
      <TimelineEvent event={responseEvent} />
    </Wrapper>
  ),
  "update (error)": (
    <Wrapper>
      <TimelineEvent event={errorEvent} />
    </Wrapper>
  ),
  teardown: (
    <Wrapper>
      <TimelineEvent event={teardownEvent} />
    </Wrapper>
  )
};
