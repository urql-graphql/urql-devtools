import React, { useContext } from "react";
import styled from "styled-components";
import { RequestContext } from "../context";
import { Pane } from "../components/Pane";
import { JsonCode } from "../components";

export const Response = () => {
  const { fetching, response, error } = useContext(RequestContext);

  const className =
    error !== undefined ? "error" : response !== undefined ? "success" : "";

  return (
    <Pane>
      <Heading className={className}>Response</Heading>
      <Pane.Body>
        <JsonCode
          json={fetching ? "Fetching" : response || error || "Unknown"}
        />
      </Pane.Body>
    </Pane>
  );
};

const Heading = styled.h2`
  margin: 0;
  padding: 10px;
  font-size: 12px;
  color: ${p => p.theme.grey["+2"]};
  background: ${props => props.theme.dark["-2"]} !important;

  &.success {
    background: ${props => props.theme.green["0"]};
  }

  &.error {
    background: ${props => props.theme.red["0"]};
  }
`;
