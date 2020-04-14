import { lighten, darken } from "polished";
import { createGlobalStyle } from "styled-components";

const dark = "#141414";
const light = "#fff";
const grey = "#808080";
const blue = "#0084FF";
const green = "#80DF68";
const orange = "#FF7940";
const red = "#FF4D58";
const purple = "#813BF2";
const pink = "#FA65BE";

export const theme = {
  dark: {
    "0": dark,
    "+1": lighten(0.02, dark),
    "+2": lighten(0.04, dark),
    "+3": lighten(0.06, dark),
    "+4": lighten(0.08, dark),
    "+5": lighten(0.1, dark),
    "+6": lighten(0.12, dark),
    "+7": lighten(0.14, dark),
    "+8": lighten(0.16, dark),
    "+9": lighten(0.18, dark),
  },
  light: {
    "0": light,
    "-1": darken(0.02, light),
    "-2": darken(0.04, light),
    "-3": darken(0.06, light),
    "-4": darken(0.08, light),
    "-5": darken(0.1, light),
    "-6": darken(0.12, light),
    "-7": darken(0.14, light),
    "-8": darken(0.16, light),
    "-9": darken(0.18, light),
  },
  grey: {
    "0": grey,
    "-1": darken(0.02, grey),
    "-2": darken(0.04, grey),
    "-3": darken(0.06, grey),
    "-4": darken(0.08, grey),
    "-5": darken(0.1, grey),
    "-6": darken(0.12, grey),
    "-7": darken(0.14, grey),
    "-8": darken(0.16, grey),
    "-9": darken(0.18, grey),
    "+1": lighten(0.02, grey),
    "+2": lighten(0.04, grey),
    "+3": lighten(0.06, grey),
    "+4": lighten(0.08, grey),
    "+5": lighten(0.1, grey),
    "+6": lighten(0.12, grey),
    "+7": lighten(0.14, grey),
    "+8": lighten(0.16, grey),
    "+9": lighten(0.18, grey),
  },
  blue: {
    "0": blue,
    "-1": darken(0.05, blue),
    "-2": darken(0.1, blue),
    "-3": darken(0.15, blue),
    "-4": darken(0.2, blue),
    "-5": darken(0.25, blue),
    "-6": darken(0.3, blue),
    "-7": darken(0.35, blue),
    "-8": darken(0.4, blue),
    "-9": darken(0.45, blue),
    "+1": lighten(0.05, blue),
    "+2": lighten(0.1, blue),
    "+3": lighten(0.15, blue),
    "+4": lighten(0.2, blue),
    "+5": lighten(0.25, blue),
    "+6": lighten(0.3, blue),
    "+7": lighten(0.35, blue),
    "+8": lighten(0.4, blue),
    "+9": lighten(0.45, blue),
  },
  green: {
    "0": green,
    "-1": darken(0.05, green),
    "-2": darken(0.1, green),
    "-3": darken(0.15, green),
    "-4": darken(0.2, green),
    "-5": darken(0.25, green),
    "-6": darken(0.3, green),
    "-7": darken(0.35, green),
    "-8": darken(0.4, green),
    "-9": darken(0.45, green),
    "+1": lighten(0.05, green),
    "+2": lighten(0.1, green),
    "+3": lighten(0.15, green),
    "+4": lighten(0.2, green),
    "+5": lighten(0.25, green),
    "+6": lighten(0.3, green),
    "+7": lighten(0.35, green),
    "+8": lighten(0.4, green),
    "+9": lighten(0.45, green),
  },
  orange: {
    "0": orange,
    "-1": darken(0.05, orange),
    "-2": darken(0.1, orange),
    "-3": darken(0.15, orange),
    "-4": darken(0.2, orange),
    "-5": darken(0.25, orange),
    "-6": darken(0.3, orange),
    "-7": darken(0.35, orange),
    "-8": darken(0.4, orange),
    "-9": darken(0.45, orange),
    "+1": lighten(0.05, orange),
    "+2": lighten(0.1, orange),
    "+3": lighten(0.15, orange),
    "+4": lighten(0.2, orange),
    "+5": lighten(0.25, orange),
    "+6": lighten(0.3, orange),
    "+7": lighten(0.35, orange),
    "+8": lighten(0.4, orange),
    "+9": lighten(0.45, orange),
  },
  red: {
    "0": red,
    "-1": darken(0.05, red),
    "-2": darken(0.1, red),
    "-3": darken(0.15, red),
    "-4": darken(0.2, red),
    "-5": darken(0.25, red),
    "-6": darken(0.3, red),
    "-7": darken(0.35, red),
    "-8": darken(0.4, red),
    "-9": darken(0.45, red),
    "+1": lighten(0.05, red),
    "+2": lighten(0.1, red),
    "+3": lighten(0.15, red),
    "+4": lighten(0.2, red),
    "+5": lighten(0.25, red),
    "+6": lighten(0.3, red),
    "+7": lighten(0.35, red),
    "+8": lighten(0.4, red),
    "+9": lighten(0.45, red),
  },
  purple: {
    "0": purple,
    "-1": darken(0.05, purple),
    "-2": darken(0.1, purple),
    "-3": darken(0.15, purple),
    "-4": darken(0.2, purple),
    "-5": darken(0.25, purple),
    "-6": darken(0.3, purple),
    "-7": darken(0.35, purple),
    "-8": darken(0.4, purple),
    "-9": darken(0.45, purple),
    "+1": lighten(0.05, purple),
    "+2": lighten(0.1, purple),
    "+3": lighten(0.15, purple),
    "+4": lighten(0.2, purple),
    "+5": lighten(0.25, purple),
    "+6": lighten(0.3, purple),
    "+7": lighten(0.35, purple),
    "+8": lighten(0.4, purple),
    "+9": lighten(0.45, purple),
  },
  pink: {
    "0": pink,
    "-1": darken(0.05, pink),
    "-2": darken(0.1, pink),
    "-3": darken(0.15, pink),
    "-4": darken(0.2, pink),
    "-5": darken(0.25, pink),
    "-6": darken(0.3, pink),
    "-7": darken(0.35, pink),
    "-8": darken(0.4, pink),
    "-9": darken(0.45, pink),
    "+1": lighten(0.05, pink),
    "+2": lighten(0.1, pink),
    "+3": lighten(0.15, pink),
    "+4": lighten(0.2, pink),
    "+5": lighten(0.25, pink),
    "+6": lighten(0.3, pink),
    "+7": lighten(0.35, pink),
    "+8": lighten(0.4, pink),
    "+9": lighten(0.45, pink),
  },
};

export const GlobalStyle = createGlobalStyle`
  /** Global styles for prism-react-renderer and codemirror */

  .CodeMirror, code {
    font-size: 12px;
  }

  .CodeMirror-hints.material {
    font-size: 12px;
    background: #222;
    border: none;
  }

  .CodeMirror-hints .CodeMirror-hint {
    color: #eee;
  }

  /* Graphql */
  .codemirror, .language-graphql {
    .CodeMirror-cursor {
      border-left: solid 1px ${(p) => p.theme.light["-2"]};
    }

    .token.attr-name, .token.class-name, .token.function, .token.plain, .token.keyword, .cm-property, .cm-keyword {
      color: ${(p) => p.theme.purple["+5"]};
    }

    .cm-invalidchar {
      color: ${(p) => p.theme.red["+2"]};
    }

    .token.comment, .cm-comment {
      color: ${(p) => p.theme.grey["-5"]};
    }

    .token.variable, .cm-attribute, .cm-variable {
      color: ${(p) => p.theme.grey["+5"]};
    }

    .token.punctuation, .token.operator, .CodeMirror-linenumber, .cm-punctuation {
      color: ${(p) => p.theme.grey["0"]};
    }

    .token.boolean {
      color: ${(p) => p.theme.green["+3"]};
    }

    .token.number {
      color: ${(p) => p.theme.blue["+4"]};
    }

    .token.string {
      color: ${(p) => p.theme.orange["+2"]};
    }
  }

  /* JSON */
  .language-json, .language-javascript {
    .token.boolean {
      color: ${(p) => p.theme.green["+3"]};
    }

    .token.string {
      color: ${(p) => p.theme.purple["+4"]};
    }

    .token.number {
      color: ${(p) => p.theme.blue["+4"]};
    }

    .token.null {
      color: ${(p) => p.theme.grey["0"]};
    }

    .token.property, .token.plain {
      color: ${(p) => p.theme.light["-8"]};
    }

    .token.punctuation {
      color: ${(p) => p.theme.grey["0"]};
    }

    .token.operator {
      color: ${(p) => p.theme.grey["-5"]};
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
    margin: 0.5em 0;
    padding: 1.25em 1em;
  }
`;
