import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.js";
import "codemirror/mode/javascript/javascript";
import { UnControlled as CodeMirror } from "react-codemirror2";
import React, { FC } from "react";
import { print } from "graphql";
import { OperationEvent } from "../../../types";

interface QueryCodeProps {
  operation: OperationEvent;
}

export const QueryCode: FC<QueryCodeProps> = ({ operation }) => {
  const doc =
    operation.type === "operation"
      ? operation.data.query
      : operation.data.operation.query;

  return (
    <CodeMirror
      options={{
        theme: "material",
        lineNumbers: true,
        readOnly: true,
        foldGutter: true
      }}
      value={print(doc)}
    />
  );
};
