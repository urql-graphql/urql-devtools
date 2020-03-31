import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { TimelineQuerySection } from "./TimelineQuerySection";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 30px;
  background: ${(props) => props.theme.dark["-3"]};
`;

const query = gql`
  query getUsers($filter: String!) {
    users(filter: $filter) {
      id
      name
      age
    }
  }
`;

export default {
  basic: (
    <Wrapper data-snapshot>
      <TimelineQuerySection query={query} variables={{ filter: "Will" }} />
    </Wrapper>
  ),
  "basic (without variables)": (
    <Wrapper data-snapshot>
      <TimelineQuerySection query={query} />
    </Wrapper>
  ),
};
