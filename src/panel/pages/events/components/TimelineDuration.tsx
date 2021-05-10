import styled from "styled-components";
import React, { FC, ComponentProps } from "react";
import { rem } from "polished";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

export const TimelineAliveDuration = styled.div`
  height: ${(p) => p.theme.space[6]};
  background: ${(p) => p.theme.colors.canvas.elevated05};
`;

type NetworkState = "fetching" | "success" | "error";

export const NetworkDuration = styled.div<{ isSelected?: boolean }>`
  cursor: pointer;
  height: ${rem(10)};

  outline: ${({ isSelected, theme }) =>
    isSelected ? `${theme.colors.divider.base} solid 3px` : "none"};

  &[data-state="fetching"] {
    background: ${(p) => p.theme.colors.pending.base};
  }

  &[data-state="success"] {
    background: ${(p) => p.theme.colors.success.base};
  }

  &[data-state="error"] {
    background: ${(p) => p.theme.colors.error.base};
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
