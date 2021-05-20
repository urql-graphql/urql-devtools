import { rem } from "polished";
import styled from "styled-components";

export const TimelineSourceIcon = styled.div<{
  kind: "query" | "mutation" | "subscription";
}>`
  border-radius: ${(p) => p.theme.radii.s};
  background-color: ${(p) => p.theme.colors.canvas.elevated05};
  color: ${(p) => p.theme.colors.text.base};
  cursor: pointer;
  height: ${rem(20)};
  line-height: ${rem(20)};
  text-align: center;
  width: ${rem(20)};
  transition: background-color 150ms ease-out;

  :before {
    content: "${({ kind }) => kind[0].toUpperCase()}";
  }

  &:hover {
    background-color: ${(p) => p.theme.colors.canvas.elevated10};
  }
`;
