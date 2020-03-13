import React, { FC, useContext, useMemo } from "react";
import styled, { ThemeContext } from "styled-components";
import { ParsedEvent } from "../../../types";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

/** Convert parsed event to timeline event type. */
const getEventName = (event: ParsedEvent) => {
  if (event.type === "teardown") {
    return "teardown";
  }

  if (event.type === "response" || event.type === "error") {
    return "update";
  }

  return "addition";
};

const EventDot = styled.div`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  border: solid 2px ${props => props.theme.dark["+1"]};
  background: ${props => props.color};
`;

export const TimelineEvent: FC<{
  event: ParsedEvent;
} & JSX.IntrinsicElements["div"]> = ({ event, ...elementProps }) => {
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
      <EventDot {...elementProps} color={eventColor} ref={ref} />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>
          {`This is a query ${eventName}`}
        </TimelineTooltip>
      )}
    </>
  );
};
