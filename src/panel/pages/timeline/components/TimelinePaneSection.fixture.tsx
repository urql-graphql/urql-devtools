import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import {
  TimelineQuerySection,
  TimelinePaneHeading
} from "./TimelinePaneSection";

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
      <TimelinePaneHeading data-snapshot collapsed={true}>
        My Heading
      </TimelinePaneHeading>
    </Wrapper>
  ),
  "subheading (expanded)": (
    <Wrapper>
      <TimelinePaneHeading data-snapshot collapsed={false}>
        My Heading
      </TimelinePaneHeading>
    </Wrapper>
  ),
  "query section": (
    <Wrapper data-snapshot>
      <TimelineQuerySection query={query} variables={{ filter: "Will" }} />
    </Wrapper>
  )
};
