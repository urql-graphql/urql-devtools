import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.js";
import "codemirror/mode/javascript/javascript";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { OperationEvent } from "../../types";
import React, { FC } from "react";
import { print } from "graphql";

interface QueryTabProps {
  operation: OperationEvent;
}

export const QueryTab: FC<QueryTabProps> = ({ operation }) => {
  const doc =
    operation.type === "operation"
      ? operation.data.query
      : operation.data.operation.query;

  console.log(doc);

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
