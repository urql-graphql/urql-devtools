import styled from "styled-components";

export const TimelineSourceIcon = styled.div<{
  kind: "query" | "mutation" | "subscription";
}>`
  border-radius: 2px;
  background-color: ${(p) => p.theme.canvas.elevated05};
  color: ${(p) => p.theme.text.base};
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  text-align: center;
  width: 20px;
  transition: background-color 150ms ease-out;

  :before {
    content: "${({ kind }) => kind[0].toUpperCase()}";
  }

  &:hover {
    background-color: ${(p) => p.theme.canvas.elevated10};
  }
`;
