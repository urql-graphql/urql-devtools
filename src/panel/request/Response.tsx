import { UnControlled as CodeMirror } from "react-codemirror2";
import React, { useState } from "react";
import styled from "styled-components";

export const Response = () => {
  return (
    <Container>
      <Heading className="success">Response</Heading>
      <CodeMirror
        options={{
          theme: "material",
          lineNumbers: true,
          readOnly: true,
          foldGutter: true
        }}
        value={JSON.stringify({}, null, 2).replace(/\"([^(\")"]+)\":/g, "$1:")}
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const Heading = styled.h2`
  margin: 0;
  padding: 10px;
  font-size: 12px;
  color: #fff;

  .success {
    background: ${props => props.theme.green};
  }
`;
