import styled from "styled-components";
import { ParsedEvent } from "../../../types";

/** Convert parsed event to timeline event type. */
const getEventType = (event: ParsedEvent) => {
  if (event.type === "teardown") {
    return "teardown";
  }

  if (event.type === "response" || event.type === "error") {
    return "update";
  }

  return "addition";
};

export const TimelineEvent = styled.div.attrs<{ event: ParsedEvent }>(
  props => ({
    "data-type": getEventType(props.event)
  })
)<{ event: ParsedEvent }>`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  border: solid 2px ${props => props.theme.dark["+1"]};

  &[data-type="addition"] {
    background: ${props => props.theme.green["0"]};
  }

  &[data-type="update"] {
    background: ${props => props.theme.orange["0"]};
  }

  &[data-type="teardown"] {
    background: ${props => props.theme.grey["-1"]};
  }
`;
