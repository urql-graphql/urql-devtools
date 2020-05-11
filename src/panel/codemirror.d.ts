/// <reference types="graphql" />
/// <reference types="codemirror" />

declare namespace CodeMirror {
  // Update lint options to work with codemirror-graphql
  interface LintOptions {
    schema?: import("graphql").GraphQLSchema;
  }
}
