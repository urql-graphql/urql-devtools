import React, { FC, useCallback, ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

type PrismLanguage = "javascript" | "graphql";

export const CodeHighlight: FC<
  {
    code: string;
    language: PrismLanguage;
  } & ComponentPropsWithoutRef<typeof StyledCodeBlock>
> = ({ code, language, ...props }) => {
  const handleRef = useCallback(
    (ref: HTMLPreElement | null) => {
      if (!ref) {
        return;
      }

      // Create new child node with text
      const child = document.createElement("code");
      child.textContent = code;
      ref.firstChild
        ? ref.replaceChild(child, ref.firstChild)
        : ref.appendChild(child);

      // Run prism on element (in web worker/async)
      // when code is a chonker
      Prism.highlightElement(ref, code.length > 600);
    },
    [language, code]
  );

  return (
    <StyledCodeBlock
      {...props}
      ref={handleRef}
      className={`language language-${language} ${props.className || ""}`}
    />
  );
};

export const InlineCodeHighlight: FC<
  {
    code: string;
    language: PrismLanguage;
  } & ComponentPropsWithoutRef<typeof StyledCodeBlock>
> = ({ code, language, ...props }) => {
  const handleRef = useCallback(
    (ref: HTMLPreElement | null) => {
      if (!ref) {
        return;
      }

      // Create new child node with text
      const child = document.createElement("code");
      child.textContent = code;
      ref.firstChild
        ? ref.replaceChild(child, ref.firstChild)
        : ref.appendChild(child);

      // Run prism on pre
      Prism.highlightElement(ref, false);
    },
    [language, code]
  );

  return (
    <StyledInlineBlock
      {...props}
      ref={handleRef}
      className={`language language-${language} ${props.className || ""}`}
    />
  );
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
  background: ${(props) => props.theme.dark["+2"]} !important;
  font-size: 12px !important;
`;
