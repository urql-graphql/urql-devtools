import React, { FC, useMemo, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  ParsedMutationEvent,
  ParsedQueryEvent,
  ParsedSubscriptionEvent,
  ParsedResponseEvent,
  ParsedErrorEvent
} from "../../../types";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

interface TimelineRequestProps {
  trigger: ParsedMutationEvent | ParsedQueryEvent | ParsedSubscriptionEvent;
  response?: ParsedResponseEvent | ParsedErrorEvent;
}

/** Convert parsed event to timeline event type. */
const getResponseName = (response: TimelineRequestProps["response"]) => {
  return !response
    ? "fetching"
    : response.type === "response"
    ? "success"
    : "error";
};

const RequestBar = styled.div`
  width: 10px;
  height: 40px;
  background: ${props => props.color};
`;

export const TimelineRequest: FC<TimelineRequestProps> = ({
  response,
  ...elementProps
}) => {
  const theme = useContext(ThemeContext);
  const { ref, tooltipProps, isVisible } = useTooltip();
  const responseName = useMemo(() => getResponseName(response), [response]);

  const responseColor = useMemo(
    () =>
      ({
        fetching: theme.blue["0"],
        success: theme.green["0"],
        error: theme.red["0"]
      }[responseName]),
    [responseName, theme]
  );

  return (
    <>
      <RequestBar {...elementProps} color={responseColor} ref={ref} />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>
          {`Request: ${responseName}`}
        </TimelineTooltip>
      )}
    </>
  );
};
