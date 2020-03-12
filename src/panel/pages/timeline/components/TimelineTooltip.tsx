import styled from "styled-components";

export interface TooltipPosition {
  x: number;
  y: number;
}

export const TimelineTooltip = styled.p<{ position?: TooltipPosition }>`
  background-color: ${p => p.theme.dark["-2"]};
  border-radius: 2px;
  color: ${p => p.theme.grey["+2"]};
  height: fit-content;
  left: ${p => p.position && `${p.position.x}px`};
  margin: 0;
  padding: 10px 20px;
  position: absolute;
  transform: translateX(-50%) translateY(calc(-100% - 8px));
  /* temp important to get around cosmos style */
  top: ${p => p.position && `${p.position.y}px`} !important;

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-top: 8px solid ${p => p.theme.dark["-2"]};
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    left: 20px;
    top: 100%;
    transform: translate(-50%, 0);
  }
`;
