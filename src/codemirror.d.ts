/// <reference types="graphql" />
/// <reference types="codemirror" />

declare namespace CodeMirror {
  // Update lint options to work with codemirror-graphql
  interface LintOptions {
    schema?: import("graphql").GraphQLSchema;
    async?: boolean;
    hasGutters?: boolean;
    onUpdateLinting?: (
      annotationsNotSorted: Annotation[],
      annotations: Annotation[],
      codeMirror: Editor
    ) => void;
    // @ts-ignore
    getAnnotations?: Linter | AsyncLinter;
  }

  interface ShowHintOptions {
    // @ts-ignore
    hint?: HintFunction | AsyncHintFunction;
  }
}
