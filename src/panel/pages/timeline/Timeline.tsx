import React, { FC } from "react";
import styled from "styled-components";
import { useTimelineContext } from "../../context";
import { Background } from "../../components/Background";
import { TimelineRow, TimelinePane } from "./components";

export const Timeline: FC = () => {
  const {
    setContainer,
    getTimePosition,
    events,
    selectedEvent
  } = useTimelineContext();

  // We lie about the types to save having to do this check
  // in every component. This guard is needed.
  if (!getTimePosition)
    return (
      <Container>
        <TimelineList ref={setContainer} />
      </Container>
    );

  return (
    <Container>
      <TimelineList ref={setContainer}>
        {Object.entries(events).map(([key, eventList]) => (
          <TimelineRow key={key} events={eventList} />
        ))}
      </TimelineList>
      {selectedEvent && <TimelinePane event={selectedEvent} sections={[]} />}
    </Container>
  );
};

const Container = styled(Background)`
  background-color: ${p => p.theme.dark["0"]};
`;

const TimelineList = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: 40px 0;
`;
