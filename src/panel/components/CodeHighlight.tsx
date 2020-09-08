import * as Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-graphql";
import React, { FC } from "react";
import styled from "styled-components";

type PrismLanguage = "json" | "graphql";

export const CodeHighlight: FC<{ code: string; language: PrismLanguage }> = ({
  code,
  language,
}) => (
  <StyledCodeBlock className={`language language-${language}`}>
    <code
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(code, Prism.languages[language], language),
      }}
    />
  </StyledCodeBlock>
);

export const InlineCodeHighlight: FC<{
  code: string;
  language: PrismLanguage;
}> = ({ code, language }) => (
  <StyledInlineBlock className={`language language-${language}`}>
    <code
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(code, Prism.languages[language], language),
      }}
    />
  </StyledInlineBlock>
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
