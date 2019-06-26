import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.js";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/brace-fold";
import "codemirror/mode/javascript/javascript";
import { UnControlled as CodeMirror } from "react-codemirror2";
import React, { useContext } from "react";
import styled from "styled-components";
import { RequestContext } from "../context";

export const Response = () => {
  const { response, error } = useContext(RequestContext);

  const className =
    error !== undefined ? "error" : response !== undefined ? "success" : "";

  return (
    <Container>
      <Heading className={className}>Response</Heading>
      <CodeMirror
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true,
          readOnly: true,
          foldGutter: true
        }}
        value={JSON.stringify(error || response || {}, null, 2).replace(
          /\"([^(\")"]+)\":/g,
          "$1:"
        )}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;

  .cm-s-material,
  .CodeMirror-gutters {
    background: ${props => props.theme.dark["-2"]} !important;
  }
`;

const Heading = styled.h2`
  margin: 0;
  padding: 10px;
  font-size: 12px;
  color: #fff;
  background: ${props => props.theme.dark["-2"]} !important;

  &.success {
    background: ${props => props.theme.green["0"]};
  }

  &.error {
    background: ${props => props.theme.red["0"]};
  }
`;
