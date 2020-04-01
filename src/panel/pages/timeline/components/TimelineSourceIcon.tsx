import styled from "styled-components";

export const TimelineSourceIcon = styled.div<{
  kind: "query" | "mutation" | "subscription";
}>`
  background-color: ${({ kind, theme }) => {
    const [color, index] = colors[kind];
    return (theme as any)[color][index];
  }};
  color: #fff;
  height: 20px;
  line-height: 20px;
  text-align: center;
  width: 20px;

  :before {
    content: "${({ kind }) => kind[0].toUpperCase()}";
  }
`;

const colors = {
  query: ["blue", "-1"],
  mutation: ["green", "0"],
  subscription: ["red", "0"],
};
