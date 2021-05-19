import { tint, shade, darken, lighten, mix, rem } from "polished";
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
  space: {
    0: 0,
    1: rem(2),
    2: rem(4),
    3: rem(8),
    4: rem(12),
    5: rem(16),
    6: rem(20),
    7: rem(24),
    8: rem(32),
    9: rem(48),
    10: rem(64),
  },
  radii: {
    s: rem(2),
    m: rem(4),
    round: "50%",
  },
  fontSizes: {
    body: {
      s: rem(11),
      m: rem(12),
      l: rem(13),
      xl: rem(16),
    },
    display: {
      s: rem(40),
      m: rem(60),
      l: rem(80),
    },
  },
  lineHeights: {
    body: {
      s: rem(14),
      m: rem(15),
      l: rem(16),
      xl: rem(20),
    },
    display: {
      s: rem(48),
      m: rem(72),
      l: rem(96),
    },
  },
  colors: {
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
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
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
    font-size: ${(p) => p.theme.fontSizes.body.m};
  }

  .cm-s-default,
  .CodeMirror-gutters {
    background: ${(p) => p.theme.colors.canvas.base};
    border-color: ${(p) => p.theme.colors.canvas.base};
  }

  .CodeMirror-cursor {
    border-color: ${(p) => p.theme.colors.text.base};
  }

  .CodeMirror-hints li.CodeMirror-hint-active {
    background: ${(p) => p.theme.colors.canvas.base};
  }

  .CodeMirror-matchingbracket {
    text-decoration: underline;
    color: ${(p) => p.theme.colors.syntax.punctuation} !important;
  }

  .CodeMirror-selected {
    background: ${(p) => p.theme.colors.canvas.elevated05};
  }

  .CodeMirror-focused .CodeMirror-selected {
    background: ${(p) => p.theme.colors.codeblock.background};
  }

  .CodeMirror-line::selection,
  .CodeMirror-line>span::selection,
  .CodeMirror-line>span>span::selection {
    background: ${(p) => p.theme.colors.codeblock.background};
  }

  .CodeMirror-line::-moz-selection,
  .CodeMirror-line>span::-moz-selection,
  .CodeMirror-line>span>span::-moz-selection {
    background: ${(p) => p.theme.colors.codeblock.background};
  }

  .cm-s-default, [class*="language-"] {
    color: ${(p) => p.theme.colors.syntax.base};

    .token.comment, .cm-comment {
      color: ${(p) => p.theme.colors.syntax.comment};
    }

    .token.punctuation, .cm-punctuation {
      color: ${(p) => p.theme.colors.syntax.punctuation};
    }

    .token.number, .cm-number {
      color: ${(p) => p.theme.colors.syntax.number};
    }

    .token.string, .cm-string, .cm-string-2 {
      color: ${(p) => p.theme.colors.syntax.string};
    }

    .token.operator {
      color: ${(p) => p.theme.colors.syntax.operator};
    }

    .token.keyword, .cm-keyword {
      color: ${(p) => p.theme.colors.syntax.keyword};
    }

    .token.function {
      color: ${(p) => p.theme.colors.syntax.function};
    }

    .token.constant {
      color: ${(p) => p.theme.colors.syntax.constant};
    }

    .token.class-name, .cm-def {
      color: ${(p) => p.theme.colors.syntax.className};
    }

    .token.boolean {
      color: ${(p) => p.theme.colors.syntax.boolean};
    }

    .token.property, .cm-property {
      color: ${(p) => p.theme.colors.syntax.property};
    }

    .token.variable, .cm-variable {
      color: ${(p) => p.theme.colors.syntax.variable};
    }

    .token.attr-name, .cm-attribute {
      color: ${(p) => p.theme.colors.syntax.attrName};
    }

    .cm-atom {
      color: ${(p) => p.theme.colors.syntax.atom};
    }

    .cm-builtin {
      color: ${(p) => p.theme.colors.syntax.builtin};
    }

    .cm-meta {
      color: ${(p) => p.theme.colors.syntax.meta};
    }

    .cm-invalidchar {
      color: ${(p) => p.theme.colors.syntax.base};
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
    font-size: ${(p) => p.theme.fontSizes.body.m};
    line-height: 1.5;

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
    border-radius: ${(p) => p.theme.radii.m};
    padding: ${(p) => p.theme.space[1]};
  }

  pre[class*="language-"] {
    overflow: auto;
    position: relative;
    padding: ${(p) => p.theme.space[3]};
    margin-top: ${(p) => p.theme.space[3]};
    margin-bottom: 0;
  }

  html {
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
    scrollbar-width: thin;
  }

  html, body {
    height: 100%;
  }

  body {
    font-size: ${(p) => p.theme.fontSizes.body.m};
    line-height: ${(p) => p.theme.lineHeights.body.m};
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
