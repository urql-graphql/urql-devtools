import { rem } from "polished";
import styled from "styled-components";

export const Background = styled.div`
  overflow: hidden;
  position: fixed;
  background-color: ${(p) => p.theme.colors.canvas.base};
  top: ${rem(36)};
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;
  }
`;
