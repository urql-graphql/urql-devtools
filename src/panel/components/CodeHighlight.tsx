import React, {
  FC,
  useCallback,
  ComponentPropsWithoutRef,
  useState,
  useEffect,
} from "react";
import styled from "styled-components";

type PrismLanguage = "javascript" | "graphql";

export const CodeHighlight: FC<
  {
    code: string;
    language: PrismLanguage;
  } & ComponentPropsWithoutRef<typeof StyledCodeBlock>
> = ({ code, language, ...props }) => {
  const [visible, setVisibility] = useState(false);
  const [copy, setCopied] = useState({ state: false });

  const handleClick = async () => {
    const text = document.getElementsByClassName("language")[0].textContent;
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied({ state: true });
      } catch (err) {
        console.error("Failed to copy!", err);
      }
    }
  };

  useEffect(() => {
    if (!copy) return;
    const timeout = setTimeout(function () {
      setCopied({ state: false });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [copy]);

  const handleRef = useCallback(
    (ref: HTMLPreElement | null) => {
      if (!ref) {
        return;
      }
      // Create new child node with text
      const child = document.createElement("code");
      child.textContent = code;

      if (ref.hasChildNodes()) {
        ref.innerHTML = "";
      }

      ref.appendChild(child);
      // Run prism on element (in web worker/async)
      // when code is a chonker
      Prism.highlightElement(ref, code.length > 600);
    },
    [language, code]
  );

  return (
    <Div
      onMouseEnter={() => setVisibility(true)}
      onMouseLeave={() => setVisibility(false)}
    >
      <StyledCodeBlock
        {...props}
        ref={handleRef}
        className={`language language-${language} ${props.className || ""}`}
      />
      {visible ? (
        <CopyButton onClick={handleClick} id="copy-button">
          {copy.state ? "Copied" : "Copy"}
        </CopyButton>
      ) : null}
    </Div>
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

const CopyButton = styled.button`
  background: ${(props) => props.theme.dark["+2"]} !important;
  margin: 1rem;
  padding: 0.5rem;
  color: white;
  border: ${(props) => props.theme.dark["+1"]} !important;
  border-radius: 4px;
  position: absolute;
  top: 0;
  right: 6px;

  :hover {
    background: #adadad !important;
  }
`;

const Div = styled.div`
  position: relative;
`;
