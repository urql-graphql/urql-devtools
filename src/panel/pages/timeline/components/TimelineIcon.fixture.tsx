import React from "react";
import styled from "styled-components";
import { TimelineIcon } from "./TimelineIcon";

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  background: ${(props) => props.theme.dark["0"]};
  flex-grow: 1;
  padding: 100px;
`;

export default {
  query: (
    <Wrapper>
      <TimelineIcon data-snapshot operation="query" />
    </Wrapper>
  ),
  mutation: (
    <Wrapper>
      <TimelineIcon data-snapshot operation="mutation" />
    </Wrapper>
  ),
  subscription: (
    <Wrapper>
      <TimelineIcon data-snapshot operation="subscription" />
    </Wrapper>
  ),
};
