import React, { FC, useContext, useMemo } from "react";
import styled, { ThemeContext } from "styled-components";
import { PresentedEvent } from "../../../types";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

/** Convert parsed event to timeline event type. */
const getEventName = (event: PresentedEvent) => {
  if (event.type === "teardown") {
    return "teardown";
  }

  if (event.type === "response" || event.type === "error") {
    return "update";
  }

  return "addition";
};

const EventDot = styled.div`
  background: ${props => props.color};
  border-radius: 50%;
  border: solid 2px ${props => props.theme.dark["+1"]};
  cursor: pointer;
  height: 10px;
  width: 10px;
`;

export const TimelineEvent: FC<{
  event: PresentedEvent;
  selectEvent: () => void;
} & JSX.IntrinsicElements["div"]> = ({
  event,
  selectEvent,
  ...elementProps
}) => {
  const theme = useContext(ThemeContext);
  const { ref, tooltipProps, isVisible } = useTooltip();
  const eventName = useMemo(() => getEventName(event), [event]);

  const eventColor = React.useMemo(
    () =>
      ({
        addition: theme.green["0"],
        update: theme.orange["0"],
        teardown: theme.grey["-1"]
      }[eventName]),
    [eventName, theme]
  );

  return (
    <>
      <EventDot
        {...elementProps}
        color={eventColor}
        ref={ref}
        onClick={selectEvent}
      />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>
          {`This is a query ${eventName}`}
        </TimelineTooltip>
      )}
    </>
  );
};
