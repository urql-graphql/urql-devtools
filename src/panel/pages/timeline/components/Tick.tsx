import styled from "styled-components";

export const Tick = styled.div<{ label: string }>`
  position: absolute;
  background: ${(props) => props.theme.dark["+1"]};
  width: 2px;
  top: 0;
  bottom: 0;

  &:before {
    content: "${(props) => props.label}";
    margin-left: 10px;
    font-size: 10px;
    color: ${(props) => props.theme.grey["0"]};
  }
`;
