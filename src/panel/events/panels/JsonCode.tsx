import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.js";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/brace-fold";
import "codemirror/mode/javascript/javascript";
import { UnControlled as CodeMirror } from "react-codemirror2";
import React, { FC } from "react";

interface JsonCodeProps {
  json: object;
}

export const JsonCode: FC<JsonCodeProps> = ({ json }) => (
  <CodeMirror
    options={{
      theme: "material",
      lineNumbers: true,
      readOnly: true,
      foldGutter: true
    }}
    value={JSON.stringify(json, null, 2).replace(/\"([^(\")"]+)\":/g, "$1:")}
  />
);
