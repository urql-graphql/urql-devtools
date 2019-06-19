import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.js";
import "codemirror/mode/javascript/javascript";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { OperationEvent } from "../../types";
import React, { FC } from "react";

interface RawOperationProps {
  operation: OperationEvent;
}

export const RawOperation: FC<RawOperationProps> = ({ operation }) => (
  <CodeMirror
    options={{
      theme: "material",
      lineNumbers: true,
      readOnly: true,
      foldGutter: true
    }}
    onBeforeChange={() => console.log("change")}
    value={JSON.stringify(operation, null, 2)}
  />
);
