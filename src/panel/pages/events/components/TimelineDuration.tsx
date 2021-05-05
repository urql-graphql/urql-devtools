import styled from "styled-components";
import React, { FC, ComponentProps } from "react";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

export const TimelineAliveDuration = styled.div`
  height: 20px;
  background: ${(p) => p.theme.canvasElevated05};
`;

type NetworkState = "fetching" | "success" | "error";

export const NetworkDuration = styled.div<{ isSelected?: boolean }>`
  cursor: pointer;
  height: 10px;

  outline: ${({ isSelected, theme }) =>
    isSelected ? `${theme.divider} solid 3px` : "none"};

  &[data-state="fetching"] {
    background: ${(p) => p.theme.pending};
  }

  &[data-state="success"] {
    background: ${(p) => p.theme.success};
  }

  &[data-state="error"] {
    background: ${(p) => p.theme.error};
  }
`;

export const TimelineNetworkDuration: FC<
  { state: NetworkState; isSelected?: boolean } & ComponentProps<
    typeof NetworkDuration
  >
> = ({ state, ...props }) => {
  const { ref, tooltipProps, isVisible } = useTooltip();

  return (
    <>
      <NetworkDuration data-state={state} ref={ref} {...props} />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>
          {`Network state: ${state}`}
        </TimelineTooltip>
      )}
    </>
  );
};
