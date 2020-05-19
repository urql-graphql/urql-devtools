import React from "react";
import styled from "styled-components";
import { TimelineSourceIcon } from "./TimelineSourceIcon";

const Wrapper = styled.div`
  padding: 100px;
`;

export default {
  query: (
    <Wrapper>
      <TimelineSourceIcon data-snapshot kind="query" />
    </Wrapper>
  ),
  mutation: (
    <Wrapper>
      <TimelineSourceIcon data-snapshot kind="mutation" />
    </Wrapper>
  ),
  subscription: (
    <Wrapper>
      <TimelineSourceIcon data-snapshot kind="subscription" />
    </Wrapper>
  ),
};
