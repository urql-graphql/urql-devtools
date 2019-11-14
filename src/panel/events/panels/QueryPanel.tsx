import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.js";
import "codemirror-graphql/mode";
import { UnControlled as CodeMirror } from "react-codemirror2";
import React, { FC } from "react";
import styled from "styled-components";

export const QueryPanel: FC<{ query: string }> = ({ query }) => (
  <StyledCodeMirror
    options={{
      mode: "graphql",
      theme: "material",
      lineNumbers: true,
      readOnly: true,
      foldGutter: true
    }}
    value={query}
  />
);

const StyledCodeMirror = styled(CodeMirror)`
  .CodeMirror {
    height: 100%;
  }

  .cm-s-material,
  .CodeMirror-gutters {
    background: ${props => props.theme.dark["-2"]} !important;
  }
`;
