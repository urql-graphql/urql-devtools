import React, { FC, useContext, useMemo } from "react";
import styled, { ThemeContext } from "styled-components";
import { ReceivedDebugEvent } from "../../../types";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

const EventDot = styled.div`
  background: ${props => props.color};
  border-radius: 50%;
  border: solid 2px ${props => props.theme.dark["+1"]};
  cursor: pointer;
  height: 10px;
  width: 10px;
`;

export const TimelineEvent: FC<{
  event: ReceivedDebugEvent;
  selectEvent: () => void;
} & Omit<JSX.IntrinsicElements["div"], "event">> = ({
  event,
  selectEvent,
  ...elementProps
}) => {
  const theme = useContext(ThemeContext);
  const { ref, tooltipProps, isVisible } = useTooltip();

  const eventColor = useMemo(() => {
    const colorMap: Record<string, string | undefined> = {
      addition: theme.green["0"],
      update: theme.purple["0"],
      teardown: theme.grey["-1"]
    };

    return colorMap[event.type] || theme.blue["0"];
  }, [event.type, theme]);

  return (
    <>
      <EventDot
        {...elementProps}
        color={eventColor}
        ref={ref}
        onClick={selectEvent}
      />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>{event.message}</TimelineTooltip>
      )}
    </>
  );
};
