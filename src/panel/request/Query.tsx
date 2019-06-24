import { Controlled as CodeMirror } from "react-codemirror2";
import React, { useContext, useCallback } from "react";
import styled from "styled-components";
import { RequestContext } from "../context";

export const Query = () => {
  const { query, setQuery, execute } = useContext(RequestContext);
  const handleTextChange = (a: any, b: any, value: string) => setQuery(value);

  console.log(query);

  const handleKeyDown = useCallback(
    (k: CodeMirror.Editor, e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.code === "Enter") {
        console.log("query is", query);
        execute();
      }
    },
    [execute, query]
  );

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
        onKeyDown={handleKeyDown}
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
