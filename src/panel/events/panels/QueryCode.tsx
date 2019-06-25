import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.js";
import "codemirror-graphql/mode";
import { UnControlled as CodeMirror } from "react-codemirror2";
import React, { FC } from "react";
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
    <CodeMirror
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
