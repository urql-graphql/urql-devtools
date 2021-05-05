import styled from "styled-components";

export const Tick = styled.div<{ label: string }>`
  position: absolute;
  width: 2px;
  top: 20px;
  bottom: 0;

  &:before {
    content: "${(p) => p.label}";
    font-family: "Roboto";
    font-size: 12px;
    color: #fff;
    opacity: 0.9;

    display: block;
    text-align: center;
    width: 100px;
    margin-left: -50px;
  }

  &:after {
    content: "";
    position: absolute;
    width: 2px;
    top: 25px;
    bottom: 0;
    background: ${(p) => p.theme.divider};
    opacity: 0.3;
  }
`;
