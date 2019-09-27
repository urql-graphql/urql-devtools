import { useLayoutEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

export type HighlightState = "NOT_READY" | "READY" | "RUNNING";

export const useHighlight = (deps: any[] = []): [boolean, () => void] => {
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

const updated = keyframes`
  from {
    background-color: #9594d4c4;
  }
  to {
    background-color: transparent;
  }
`;

export const HighlightUpdate = styled.span`
  border-radius: 3px;
  animation-duration: 1s;
  animation-iteration-count: 1;

  ${({ isAnimating }: { isAnimating: boolean }) =>
    isAnimating &&
    css`
      animation-name: ${updated};
    `};
`;
