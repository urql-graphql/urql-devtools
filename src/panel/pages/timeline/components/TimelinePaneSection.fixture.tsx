import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { TimelineQueryInfo, TimelinePaneHeading } from "./TimelinePaneSection";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 30px;
  background: ${props => props.theme.dark["-3"]};
`;

const query = gql`
  query GetUsers($filter: String!) {
    users(filter: $filter) {
      id
      name
    }
  }
`;

export default {
  "subheading (collapsed)": (
    <Wrapper>
      <TimelinePaneHeading collapsed={true}>My Heading</TimelinePaneHeading>
    </Wrapper>
  ),
  "subheading (expanded)": (
    <Wrapper>
      <TimelinePaneHeading collapsed={false}>My Heading</TimelinePaneHeading>
    </Wrapper>
  ),
  "query section": (
    <Wrapper>
      <TimelineQueryInfo query={query} variables={{ filter: "Will" }} />
    </Wrapper>
  )
};
