import React from "react";
import styled from "styled-components";
import {
  ParsedQueryEvent,
  ParsedResponseEvent,
  ParsedErrorEvent
} from "../../../types";
import { TimelineRequest } from "./TimelineRequest";

const Wrapper = styled.div`
  display: flex;
  padding: 100px;
  background: ${props => props.theme.dark["0"]};
  flex-grow: 1;
`;

const requestEvent: ParsedQueryEvent = {
  type: "query"
} as any;

const responseEvent: ParsedResponseEvent = {
  type: "response"
} as any;

const errorEvent: ParsedErrorEvent = {
  type: "error"
} as any;

export default {
  fetching: (
    <Wrapper>
      <TimelineRequest trigger={requestEvent} />
    </Wrapper>
  ),
  success: (
    <Wrapper>
      <TimelineRequest trigger={requestEvent} response={responseEvent} />
    </Wrapper>
  ),
  error: (
    <Wrapper>
      <TimelineRequest trigger={requestEvent} response={errorEvent} />
    </Wrapper>
  )
};
