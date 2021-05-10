import { rem } from "polished";
import styled from "styled-components";

export const Tick = styled.div<{ label: string }>`
  position: absolute;
  width: ${rem(2)};
  top: ${(p) => p.theme.space[6]};
  bottom: 0;

  &:before {
    content: "${(p) => p.label}";
    font-family: "Roboto";
    font-size: ${(p) => p.theme.fontSizes.body.m};
    color: ${(p) => p.theme.colors.textDimmed.base};
    display: block;
    text-align: center;
    width: ${rem(100)};
    margin-left: -${rem(50)};
  }

  &:after {
    content: "";
    position: absolute;
    width: ${rem(2)};
    top: ${rem(25)};
    bottom: 0;
    background: ${(p) => p.theme.colors.divider.base};
    opacity: 0.3;
  }
`;
