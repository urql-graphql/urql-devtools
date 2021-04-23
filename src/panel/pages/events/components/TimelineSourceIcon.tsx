import styled from "styled-components";

export const TimelineSourceIcon = styled.div<{
  kind: "query" | "mutation" | "subscription";
}>`
  border-radius: 2px;
  background-color: ${(p) => p.theme.dark["+6"]};
  color: ${(p) => p.theme.light["-8"]};
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
    background-color: ${(p) => p.theme.dark["+9"]};
    color: ${(p) => p.theme.light["-2"]};
  }
`;
