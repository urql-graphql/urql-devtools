import styled from "styled-components";

export interface Position {
  x: number;
  y: number;
}

export const TimelineTooltip = styled.p<{ pos?: Position }>`
  background-color: ${p => p.theme.dark["-2"]};
  border-radius: 2px;

  color: ${p => p.theme.grey["+2"]};

  left: ${p => p.pos && `${p.pos.x}px`};
  top: ${p => p.pos && `${p.pos.y}px`};

  height: fit-content;
  padding: 10px 20px;
  position: absolute;

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-top: 8px solid ${p => p.theme.dark["-2"]};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    left: 50px;
    top: 100%;
    transform: translate(-50%, 0);
  }
`;
