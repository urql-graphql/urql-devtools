import React, { FC } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import "./prism-theme.css";
import styled from "styled-components";

export const CodeHighlight: FC<any> = (props) => (
  <Highlight {...defaultProps} style={{ background: "#1C1E26" }} {...props}>
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

const StyledCodeBlock = styled.pre`
  background: ${(props) => props.theme.dark["+3"]} !important;
  font-size: 12px !important;
`;
