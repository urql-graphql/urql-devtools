import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.js";
import "codemirror-graphql/mode";
import { UnControlled as CodeMirror } from "react-codemirror2";
import React, { FC } from "react";
import styled from "styled-components";
import { print } from "graphql";
import { UrqlEvent } from "../../../types";

interface QueryCodeProps {
  operation: UrqlEvent;
}

export const QueryCode: FC<QueryCodeProps> = ({ operation }) => {
  const doc =
    operation.type === "operation"
      ? operation.data.query
      : operation.data.operation.query;

  return (
    <StyledCodeMirror
      options={{
        mode: "graphql",
        theme: "material",
        lineNumbers: true,
        readOnly: true,
        foldGutter: true
      }}
      value={print(doc)}
    />
  );
};

const StyledCodeMirror = styled(CodeMirror)`
  .cm-s-material,
  .CodeMirror-gutters {
    background: ${props => props.theme.dark["-2"]} !important;
  }
`;
