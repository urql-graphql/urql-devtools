import styled from "styled-components";
import {
  ParsedMutationEvent,
  ParsedQueryEvent,
  ParsedSubscriptionEvent,
  ParsedResponseEvent,
  ParsedErrorEvent
} from "../../../types";

interface TimelineRequestProps {
  trigger: ParsedMutationEvent | ParsedQueryEvent | ParsedSubscriptionEvent;
  response?: ParsedResponseEvent | ParsedErrorEvent;
}

export const TimelineRequest = styled.div.attrs<TimelineRequestProps>(
  props => ({
    "data-type": !props.response
      ? "fetching"
      : props.response.type === "response"
      ? "success"
      : "error"
  })
)<TimelineRequestProps>`
  width: 10px;
  height: 40px;

  &[data-type="fetching"] {
    background: ${props => props.theme.blue["0"]};
  }

  &[data-type="success"] {
    background: ${props => props.theme.green["0"]};
  }

  &[data-type="error"] {
    background: ${props => props.theme.red["0"]};
  }
`;
