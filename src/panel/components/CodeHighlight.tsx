import React, { FC } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import "./prism-theme.css";
import styled from "styled-components";

export const CodeHighlight: FC<any> = (props) => (
  <Highlight {...defaultProps} {...props}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <StyledCodeBlock
        className={className}
        style={{ ...style, backgroundColor: undefined }}
      >
        <code>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </code>
      </StyledCodeBlock>
    )}
  </Highlight>
);

export const InlineCodeHighlight: FC<any> = ({ code, ...props }) => {
  const trimmedCode = trimCode(code, props.language);
  console.log(trimmedCode);

  return (
    <Highlight {...defaultProps} code={trimmedCode} {...props}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <StyledInlineBlock
          className={className}
          style={{ ...style, backgroundColor: undefined }}
        >
          <code>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </StyledInlineBlock>
      )}
    </Highlight>
  );
};

const trimCode = (code: string, language: string) => {
  if (language !== "json" || !code) {
    return code;
  }

  // Collapse object
  if (code[0] === "{" && code.length > 16) {
    return `${code.substring(0, 14)}…}`;
  }

  // Collapse array
  if (code[0] === "[" && code.length > 16) {
    return `${code.substring(0, 14)}…]`;
  }

  // Collapse string
  if (code[0] === '"' && code.length > 16) {
    return `${code.substring(0, 14)}…"`;
  }

  if (code[0] === '"' && code.length > 16) {
    return `${code.substring(0, 14)}…"`;
  }

  return code;
};

export const StyledInlineBlock = styled.pre`
  display: inline-flex;
  margin: 0 !important;
  padding: 0 !important;
  background-color: none !important;
  background: none !important;

  & > code > div {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const StyledCodeBlock = styled.pre`
  background: ${(props) => props.theme.dark["+3"]} !important;
  font-size: 12px !important;
`;
