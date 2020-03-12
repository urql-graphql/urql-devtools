import React from "react";
import styled from "styled-components";
import { ParsedEvent } from "../../../types";
import { theme as importedTheme } from "../../../theme";
import { useTimelineContext } from "../../../context/Timeline";
import { TooltipPosition } from "./TimelineTooltip";

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

const Wrapper = styled.div`
  padding: 50px;
`;

const Container = styled.div`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  border: solid 2px ${props => props.theme.dark["+1"]};
  background: ${props => props.color};
`;

const getPosFromRef = (
  ref: React.RefObject<HTMLDivElement>
): TooltipPosition => {
  const { x, y, width, height } = ref.current!.getBoundingClientRect(); //eslint-disable-line @typescript-eslint/no-non-null-assertion
  return {
    x: x + width / 2,
    y: y + height / 2
  };
};

export const TimelineEvent = ({ event }: { event: ParsedEvent }) => {
  const { setTooltipPosition } = useTimelineContext();
  const ref = React.useRef<HTMLDivElement>(null);
  const eventColor = React.useMemo(() => COLOR_MAPPING[getEventType(event)], [
    event
  ]);

  console.log(ref.current && ref.current.getBoundingClientRect());

  return (
    <Wrapper>
      <Container
        ref={ref}
        color={eventColor}
        onMouseEnter={() => setTooltipPosition(getPosFromRef(ref))}
        // TODO: triggering too often currently
        onMouseOut={() => setTooltipPosition(null)}
      />
    </Wrapper>
  );
};
