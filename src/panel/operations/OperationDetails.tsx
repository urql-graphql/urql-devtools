import React, { FC, useContext } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import styled from "styled-components";
import { OperationContext } from "./OperationContext";
import "codemirror/lib/codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";

export const OperationDetails: FC = () => {
  const { selectedOperation } = useContext(OperationContext);

  if (selectedOperation === undefined) {
    return null;
  }

  return (
    <Container>
      <CodeMirror
        onBeforeChange={() => console.log("change")}
        value={JSON.stringify(selectedOperation, null, 2)}
      />
    </Container>
  );
};

const Container = styled.div`
  background: ${props => props.theme.cardBg};
  width: 100%;
  height: 400px;
  max-height: 400px;
  overflow: scroll;

  @media (min-width: ${props => props.theme.breakpoints.md.max}) {
    width: 50%;
    height: 100%;
  }
`;

const theme = {
  scheme: "monokai",
  author: "wimer hazenberg (http://www.monokai.nl)",
  base00: "#1E1E1E",
  base01: "#383830",
  base02: "#49483e",
  base03: "#75715e",
  base04: "#a59f85",
  base05: "#f8f8f2",
  base06: "#f5f4f1",
  base07: "#f9f8f5",
  base08: "#f92672",
  base09: "#fd971f",
  base0A: "#f4bf75",
  base0B: "#7ce079", // string (green)
  base0C: "#a1efe4",
  base0D: "#5abaf1", // key (blue)
  base0E: "#ae81ff",
  base0F: "#cc6633"
};
