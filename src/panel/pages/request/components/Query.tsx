import "codemirror/theme/material.css";
import "codemirror/lib/codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";
import "codemirror-graphql/lint";
import "codemirror-graphql/hint";
import "codemirror-graphql/mode";
import CodeMirror, { ShowHintOptions } from "codemirror";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRequest } from "../../../context";

/** Query editor
 * Inspired by Graphiql's query editor - https://github.com/graphql/graphiql/blob/master/packages/graphiql/src/components/QueryEditor.js
 */
export const Query = () => {
  const [codemirror, setCodeMirror] = useState<CodeMirror.Editor | undefined>();
  const { query, setQuery, execute, schema } = useRequest();

  useEffect(() => {
    if (codemirror === undefined) {
      return;
    }

    codemirror.setOption("extraKeys", {
      ...(codemirror.getOption("extraKeys") as object),
      "Ctrl-Enter": execute,
      "Cmd-Enter": execute,
    });
  }, [codemirror, execute]);

  // Update on schema change
  useEffect(() => {
    if (codemirror === undefined || schema === undefined) {
      return;
    }

    // TODO!: Update types
    codemirror.setOption("lint", { schema });
    codemirror.setOption("hintOptions", ({
      schema,
    } as unknown) as ShowHintOptions);
    codemirror.setOption("extraKeys", {
      "Ctrl-Space": () =>
        codemirror.showHint(({
          completeSingle: true,
        } as unknown) as ShowHintOptions),
    });
  }, [codemirror, schema]);

  // Update on programmatic value change
  useEffect(() => {
    if (!codemirror) {
      return;
    }

    if (query !== undefined && query !== codemirror.getValue()) {
      codemirror.setValue(query);
    }
  }, [query, codemirror]);

  const handleRef = (ref: HTMLTextAreaElement) => {
    if (ref === null || codemirror !== undefined) {
      return;
    }

    const editor = CodeMirror.fromTextArea(ref, {
      mode: "graphql",
      theme: "material",
      tabSize: 2,
      lineNumbers: true,
      autoCloseBrackets: "{}[]\"\"''",
      matchBrackets: true,
    });

    editor.on("change", () => setQuery(editor.getValue()));

    setCodeMirror(editor);
  };

  return (
    <Container>
      <textarea
        ref={handleRef}
        defaultValue={
          query ||
          "# Type your query here then hit 'Ctrl+Enter' to execute it.\n"
        }
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 10px;

  .cm-s-material,
  .CodeMirror-gutters {
    background: ${(props) => props.theme.dark["0"]} !important;
  }
`;
