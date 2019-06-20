import { Controlled as CodeMirror } from "react-codemirror2";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { RequestContext } from "./RequestContext";

export const Query = () => {
  const { query, setQuery } = useContext(RequestContext);
  const handleTextChange = (a: any, b: any, value: string) => setQuery(value);

  return (
    <Container>
      <Heading>Query</Heading>
      <CodeMirror
        options={{
          theme: "material",
          lineNumbers: true,
          foldGutter: true
        }}
        value={query}
        onBeforeChange={handleTextChange}
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Heading = styled.h2`
  margin: 0;
  padding: 10px;
  font-size: 12px;
  color: #fff;
`;
