import "prismjs/components/prism-json";
import "prismjs/components/prism-graphql";
import React, { FC, memo, useCallback } from "react";
import styled from "styled-components";

type PrismLanguage = "json" | "graphql";

// @ts-ignore
Prism.manual = true;
console.log(Prism.languages);

export const CodeHighlight: FC<{
  code: string;
  language: PrismLanguage;
}> = ({ code, language }) => {
  const handleRef = useCallback((ref) => {
    console.log(ref);
    if (ref === null) {
      return;
    }

    Prism.highlightElement(ref, true, () => console.log("DONEE"));
  }, []);

  return (
    <StyledCodeBlock
      ref={handleRef}
      className={`language language-${language}`}
    >
      <code>{code}</code>
    </StyledCodeBlock>
  );
};
CodeHighlight.displayName = "CodeHighlight";

export const InlineCodeHighlight: FC<{
  code: string;
  language: PrismLanguage;
}> = memo(({ code, language }) => (
  <StyledInlineBlock className={`language language-${language}`}>
    <code
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(code, Prism.languages[language], language),
      }}
    />
  </StyledInlineBlock>
));
InlineCodeHighlight.displayName = "InlineCodeHighlight";

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
