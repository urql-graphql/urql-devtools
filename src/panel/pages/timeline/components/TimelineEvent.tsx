import React, { MouseEvent } from "react";
import styled from "styled-components";
import { ParsedEvent } from "../../../types";
import { theme as importedTheme } from "../../../theme";
import { useTimelineTooltip, Position } from "./TimelineTooltip";

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

const COLOR_MAPPING = {
  addition: importedTheme.green["0"],
  update: importedTheme.orange["0"],
  teardown: importedTheme.grey["-1"]
};

const Container = styled.div`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  border: solid 2px ${props => props.theme.dark["+1"]};
  background: ${props => props.color};
`;

const getPosFromRef = (e: MouseEvent): Position => ({
  x: e.clientX,
  y: e.clientY
});

export const TimelineEvent = ({ event }: { event: ParsedEvent }) => {
  const [render, setPos] = useTimelineTooltip() as [
    () => JSX.Element | null,
    React.Dispatch<React.SetStateAction<Position | null>>
  ];
  const eventColor = React.useMemo(() => COLOR_MAPPING[getEventType(event)], [
    event
  ]);
  return (
    <Container
      color={eventColor}
      onMouseEnter={e => setPos(getPosFromRef(e))}
      onMouseLeave={() => setPos(null)}
    >
      {render()}
    </Container>
  );
};
