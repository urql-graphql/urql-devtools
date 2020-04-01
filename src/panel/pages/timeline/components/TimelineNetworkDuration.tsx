import React, { FC, ComponentProps } from "react";
import styled from "styled-components";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

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
  const { targetRef, tooltipProps, isVisible } = useTooltip();

  return (
    <>
      <NetworkDuration data-state={state} ref={targetRef} {...props} />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>
          {`Network state: ${state}`}
        </TimelineTooltip>
      )}
    </>
  );
};
