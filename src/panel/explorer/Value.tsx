import React, { useLayoutEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { FieldNode } from "../context/explorer/ast";

interface Props {
  value: FieldNode["value"];
  expandValues: boolean;
}

type HighlightState = "NOT_READY" | "READY" | "RUNNING";

const useHighlight = (deps: Array<any> = []): [boolean, () => void] => {
  const [state, setState] = useState<HighlightState>("NOT_READY");

  useLayoutEffect(() => {
    setState(prevState => {
      switch (prevState) {
        case "NOT_READY":
          return "READY";
        case "READY":
          return "RUNNING";
        default:
          return prevState;
      }
    });
  }, deps);

  const onAnimationEnd = () => {
    setState("READY");
  };

  return [state === "RUNNING", onAnimationEnd];
};

export function Value({ value, expandValues }: Props) {
  const [isAnimating, onAnimationEnd] = useHighlight([value]);

  const renderValue = () => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <>{"[]"}</>;
      } else {
        return expandValues ? (
          <Code>{JSON.stringify(value, null, 2)}</Code>
        ) : (
          <>{`Array (${value.length})`}</>
        );
      }
    } else if (typeof value === "object" && !!value) {
      if (Object.keys(value).length === 0) {
        return <>{"{}"}</>;
      } else {
        return expandValues ? (
          <Code>{JSON.stringify(value, null, 2)}</Code>
        ) : (
          <>{`Object`}</>
        );
      }
    } else if (typeof value === "string") {
      return (
        <HighlightUpdate
          onAnimationEnd={onAnimationEnd}
          isAnimating={isAnimating}
        >{`"${value}"`}</HighlightUpdate>
      );
    } else {
      return (
        <HighlightUpdate
          onAnimationEnd={onAnimationEnd}
          isAnimating={isAnimating}
        >{`${value}`}</HighlightUpdate>
      );
    }
  };

  return renderValue();
}

const updated = keyframes`
  from {
    background-color: #9c27b0a1;
  }
  to {
    background-color: transparent;
  }
`;

const HighlightUpdate = styled.span`
  border-radius: 3px;
  animation-duration: 2s;
  animation-iteration-count: 1;

  ${({ isAnimating }: { isAnimating: boolean }) =>
    isAnimating &&
    css`
      animation-name: ${updated};
    `}
`;

const Code = styled.code`
  white-space: pre;
`;
