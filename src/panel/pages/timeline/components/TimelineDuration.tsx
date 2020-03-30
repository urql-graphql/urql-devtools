import styled from "styled-components";
import React, { FC, ComponentProps } from "react";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

export const TimelineAliveDuration = styled.div`
  height: 20px;
  background: ${(props) => props.theme.dark["+1"]};
`;

type NetworkState = "fetching" | "success" | "error";

export const NetworkDuration = styled.div`
  height: 10px;

  &[data-state="fetching"] {
    background: ${(props) => props.theme.blue["-1"]};
  }

  &[data-state="success"] {
    background: ${(props) => props.theme.green["0"]};
  }

  &[data-state="error"] {
    background: ${(props) => props.theme.red["0"]};
  }
`;

export const TimelineNetworkDuration: FC<
  { state: NetworkState } & ComponentProps<typeof NetworkDuration>
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
