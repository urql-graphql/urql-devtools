import "codemirror/lib/codemirror";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";
import "codemirror-graphql/lint";
import "codemirror-graphql/hint";
import "codemirror-graphql/mode";
import CodeMirror from "codemirror";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { RequestContext } from "../context";

type CodemirrorEventHandler<T extends Event = Event> = (
  ed: CodeMirror.Editor,
  ev: T
) => void;

/** Query editor
 * Inspired by Graphiql's query editor - https://github.com/graphql/graphiql/blob/master/packages/graphiql/src/components/QueryEditor.js
 */
export const Query = () => {
  const [codemirror, setCodeMirror] = useState<CodeMirror.Editor | undefined>();
  const { query, setQuery, execute, schema } = useContext(RequestContext);

  useEffect(() => {
    if (codemirror === undefined) {
      return;
    }

    codemirror.setOption("extraKeys", {
      ...codemirror.getOption("extraKeys"),
      "Ctrl-Enter": execute,
      "Cmd-Enter": execute
    });
  }, [codemirror, execute]);

  // Update on schema change
  useEffect(() => {
    if (codemirror === undefined || schema === undefined) {
      return;
    }

    codemirror.setOption("lint", { schema });
    codemirror.setOption("hintOptions", { schema });
    codemirror.setOption("extraKeys", {
      // @ts-ignore
      "Ctrl-Space": () => codemirror.showHint({ completeSingle: true })
    });
  }, [codemirror, schema]);

  const handleRef = (ref: HTMLTextAreaElement) => {
    if (ref === null || codemirror !== undefined) {
      return;
    }

    const editor = CodeMirror.fromTextArea(ref, {
      value: query || "",
      mode: "graphql",
      theme: "material",
      tabSize: 2,
      lineNumbers: true,
      autoCloseBrackets: "{}[]\"\"''",
      matchBrackets: true
    });

    editor.on("change", () => setQuery(editor.getValue()));

    setCodeMirror(editor);
  };

  return (
    <Container>
      <Heading>Query</Heading>
      <textarea ref={handleRef} value={query} />
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
