import React, { FC } from "react";
import styled from "styled-components";
import { useTimelineContext } from "../../context";
import { TimelineRow } from "./components";

export const Timeline: FC = () => {
  const { setContainer, getTimePosition, events } = useTimelineContext();

  // We lie about the types to save having to do this check
  // in every component. This guard is needed.
  if (!getTimePosition) return <Container ref={setContainer} />;

  return (
    <Container ref={setContainer}>
      {Object.entries(events).map(([key, eventList]) => (
        <TimelineRow key={key} events={eventList} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;
