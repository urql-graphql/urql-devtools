import styled from "styled-components";

export const TimelineSourceIcon = styled.div<{
  kind: "query" | "mutation" | "subscription";
}>`
  background-color: ${(p) => p.theme.light["0"]};
  color: ${(p) => p.theme.dark["0"]};
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  text-align: center;
  width: 20px;

  :before {
    content: "${({ kind }) => kind[0].toUpperCase()}";
  }
`;
