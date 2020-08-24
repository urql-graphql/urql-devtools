import React, { FC, memo } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import styled from "styled-components";

export const CodeHighlight: FC<any> = memo(function CodeHighlightMemo(props) {
  return (
    <Highlight {...defaultProps} {...props}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <StyledCodeBlock
          className={`${className} ${props.className}`}
          style={{ ...style, backgroundColor: undefined, color: undefined }}
        >
          <code>
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                style={undefined}
              >
                {line.map((token, key) => (
                  <span
                    key={key}
                    {...getTokenProps({ token, key })}
                    style={undefined}
                  />
                ))}
              </div>
            ))}
          </code>
        </StyledCodeBlock>
      )}
    </Highlight>
  );
});

export const InlineCodeHighlight: FC<any> = memo(
  function InlineCodeHighlightMemo({ code, ...props }) {
    return (
      <Highlight {...defaultProps} code={code} {...props}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <StyledInlineBlock
            className={`${className} ${props.className}`}
            style={{ ...style, backgroundColor: undefined, color: undefined }}
          >
            <code>
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  style={undefined}
                >
                  {line.map((token, key) => (
                    <span
                      key={key}
                      {...getTokenProps({ token, key })}
                      style={undefined}
                    />
                  ))}
                </div>
              ))}
            </code>
          </StyledInlineBlock>
        )}
      </Highlight>
    );
  }
);

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
  background: ${(props) => props.theme.dark["+2"]} !important;
  font-size: 12px !important;
`;
