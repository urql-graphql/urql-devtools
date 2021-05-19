import { tint, shade, darken, lighten, mix } from "polished";
import { createGlobalStyle } from "styled-components";

const colors = {
  black: "#1d1d1d",
  blue: "#00A1FF",
  green: "#2DAF7E",
  orange: "#EB9028",
  purple: "#7776D2",
  red: "#F65151",
  yellow: "#FFE248",
};

export const lightTheme = {
  canvas: {
    base: "#fff",
    hover: tint(0.9, colors.purple),
    active: tint(0.85, colors.purple),
    elevated05: darken(0.05, "#fff"),
    elevated10: darken(0.1, "#fff"),
  },
  codeblock: {
    background: darken(0.05, "#fff"),
  },
  tooltip: {
    background: darken(0.1, "#fff"),
  },
  text: {
    base: colors.black,
  },
  textDimmed: {
    base: tint(0.4, colors.black),
    hover: tint(0.3, colors.black),
    active: tint(0.2, colors.black),
  },
  divider: {
    base: shade(0.1, "#fff"),
  },
  primary: {
    base: colors.purple,
    hover: shade(0.05, colors.purple),
    active: shade(0.1, colors.purple),
    contrast: "#fff",
  },
  secondary: {
    base: colors.orange,
  },
  success: {
    base: colors.green,
  },
  error: {
    base: colors.red,
  },
  pending: {
    base: colors.blue,
  },
  syntax: {
    base: shade(0.3, colors.orange),
    atom: tint(0.1, colors.black),
    attrName: shade(0.3, colors.orange),
    boolean: shade(0.3, colors.purple),
    builtin: shade(0.3, colors.purple),
    className: shade(0.3, mix(0.5, colors.green, colors.blue)),
    comment: shade(0.3, colors.green),
    constant: shade(0.3, colors.orange),
    description: tint(0.6, colors.black),
    function: tint(0.1, colors.black),
    invalid: colors.red,
    keyword: shade(0.3, colors.purple),
    meta: tint(0.4, colors.black),
    null: tint(0.4, colors.black),
    number: shade(0.3, colors.green),
    operator: tint(0.1, colors.black),
    property: shade(0.3, colors.orange),
    punctuation: tint(0.1, colors.black),
    string: shade(0.2, colors.red),
    variable: shade(0.3, colors.orange),
    interface: shade(0.3, colors.purple),
    enum: shade(0.3, colors.green),
    union: shade(0.3, mix(0.5, colors.green, colors.blue)),
    scalar: shade(0.2, colors.red),
    input: shade(0.3, colors.green),
    type: shade(0.3, colors.orange),
  },
};

export const darkTheme = {
  canvas: {
    base: colors.black,
    hover: mix(0.9, colors.black, colors.purple),
    active: mix(0.85, colors.black, colors.purple),
    elevated05: lighten(0.075, colors.black),
    elevated10: lighten(0.1, colors.black),
  },
  codeblock: {
    background: lighten(0.03, colors.black),
  },
  tooltip: {
    background: darken(0.03, colors.black),
  },
  text: {
    base: lighten(0.8, colors.black),
  },
  textDimmed: {
    base: lighten(0.7, colors.black),
    hover: lighten(0.9, colors.black),
    active: lighten(0.7, colors.black),
  },
  divider: {
    base: lighten(0.15, colors.black),
  },
  primary: {
    base: colors.purple,
    hover: lighten(0.05, colors.purple),
    active: lighten(0.1, colors.purple),
    contrast: lighten(0.9, colors.black),
  },
  secondary: {
    base: colors.yellow,
  },
  success: {
    base: colors.green,
  },
  error: {
    base: colors.red,
  },
  pending: {
    base: colors.blue,
  },
  syntax: {
    base: tint(0.2, colors.blue),
    atom: tint(0.9, colors.black),
    attrName: tint(0.2, colors.blue),
    boolean: tint(0.2, colors.purple),
    builtin: tint(0.2, colors.purple),
    className: tint(0.2, mix(0.5, colors.green, colors.blue)),
    comment: tint(0.3, colors.green),
    constant: tint(0.2, colors.blue),
    description: tint(0.6, colors.black),
    function: tint(0.9, colors.black),
    invalid: colors.red,
    keyword: tint(0.2, colors.purple),
    meta: colors.red,
    null: tint(0.6, colors.black),
    number: tint(0.3, colors.green),
    operator: tint(0.9, colors.black),
    property: tint(0.2, colors.blue),
    punctuation: tint(0.9, colors.black),
    string: tint(0.1, colors.orange),
    variable: tint(0.2, colors.blue),
    interface: tint(0.2, colors.purple),
    enum: tint(0.3, colors.green),
    union: tint(0.2, mix(0.5, colors.green, colors.blue)),
    scalar: tint(0.1, colors.orange),
    input: tint(0.2, colors.purple),
    type: tint(0.2, colors.blue),
  },
};

// Syntax highlighting for Prism and CodeMirror
// - Supported languages: JSON and GraphQL
// - Find out which tokens are necessary for supported languages here: https://prismjs.com/faq.html#how-do-i-know-which-tokens-i-can-style-for
// - Light theme based on: https://github.com/PrismJS/prism-themes/blob/master/themes/prism-vs.css
// - Dark theme based on: https://github.com/PrismJS/prism-themes/blob/master/themes/prism-vsc-dark-plus.css

export const GlobalStyle = createGlobalStyle`
  /** Global styles for prism-react-renderer and codemirror */
  .CodeMirror, code {
    font-size: 12px;
  }

  .cm-s-default,
  .CodeMirror-gutters {
    background: ${(p) => p.theme.canvas.base};
    border-color: ${(p) => p.theme.canvas.base};
  }

  .CodeMirror-cursor {
    border-color: ${(p) => p.theme.text.base};
  }

  .CodeMirror-hints li.CodeMirror-hint-active {
    background: ${(p) => p.theme.canvas.base};
  }

  .CodeMirror-matchingbracket {
    text-decoration: underline;
    color: ${(p) => p.theme.syntax.punctuation} !important;
  }

  .CodeMirror-selected {
    background: ${(p) => p.theme.canvas.elevated05};
  }

  .CodeMirror-focused .CodeMirror-selected {
    background: ${(p) => p.theme.codeblock.background};
  }

  .CodeMirror-line::selection,
  .CodeMirror-line>span::selection,
  .CodeMirror-line>span>span::selection {
    background: ${(p) => p.theme.codeblock.background};
  }

  .CodeMirror-line::-moz-selection,
  .CodeMirror-line>span::-moz-selection,
  .CodeMirror-line>span>span::-moz-selection {
    background: ${(p) => p.theme.codeblock.background};
  }

  .cm-s-default, [class*="language-"] {
    color: ${(p) => p.theme.syntax.base};

    .token.comment, .cm-comment {
      color: ${(p) => p.theme.syntax.comment};
    }

    .token.punctuation, .cm-punctuation {
      color: ${(p) => p.theme.syntax.punctuation};
    }

    .token.number, .cm-number {
      color: ${(p) => p.theme.syntax.number};
    }

    .token.string, .cm-string, .cm-string-2 {
      color: ${(p) => p.theme.syntax.string};
    }

    .token.operator {
      color: ${(p) => p.theme.syntax.operator};
    }

    .token.keyword, .cm-keyword {
      color: ${(p) => p.theme.syntax.keyword};
    }

    .token.function {
      color: ${(p) => p.theme.syntax.function};
    }

    .token.constant {
      color: ${(p) => p.theme.syntax.constant};
    }

    .token.class-name, .cm-def {
      color: ${(p) => p.theme.syntax.className};
    }

    .token.boolean {
      color: ${(p) => p.theme.syntax.boolean};
    }

    .token.property, .cm-property {
      color: ${(p) => p.theme.syntax.property};
    }

    .token.variable, .cm-variable {
      color: ${(p) => p.theme.syntax.variable};
    }

    .token.attr-name, .cm-attribute {
      color: ${(p) => p.theme.syntax.attrName};
    }

    .cm-atom {
      color: ${(p) => p.theme.syntax.atom};
    }

    .cm-builtin {
      color: ${(p) => p.theme.syntax.builtin};
    }

    .cm-meta {
      color: ${(p) => p.theme.syntax.meta};
    }

    .cm-invalidchar {
      color: ${(p) => p.theme.syntax.base};
    }
  }

  /* Modified version of - https://github.com/PrismJS/prism-themes/blob/master/themes/prism-material-dark.css */
  code[class*="language-"], pre[class*="language-"] {
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    font-family: Roboto Mono, monospace;
    font-size: 12px;
    line-height: 1.5em;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  :not(pre) > code[class*="language-"] {
    white-space: normal;
    border-radius: 0.2em;
    padding: 0.1em;
  }

  pre[class*="language-"] {
    overflow: auto;
    position: relative;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 0;
  }

  html {
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
    scrollbar-width: thin;
  }

  html, body {
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track, ::-webkit-scrollbar-corner {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

GlobalStyle.displayName = "GlobalStyle";
