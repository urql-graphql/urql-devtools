import React, { FC } from "react";
import styled from "styled-components";
import { useTimelineContext } from "../../context";
import { Background } from "../../components/Background";
import { TimelineRow, TimelinePane } from "./components";

export const Timeline: FC = () => {
  const { setContainer, getTimePosition, events } = useTimelineContext();

  // console.log(events);

  // We lie about the types to save having to do this check
  // in every component. This guard is needed.
  if (!getTimePosition)
    return (
      <Background>
        <TimelineList ref={setContainer} />
      </Background>
    );

  return (
    <Container>
      <TimelineList ref={setContainer}>
        {Object.entries(events).map(([key, eventList]) => (
          <TimelineRow key={key} events={eventList} />
        ))}
      </TimelineList>
      <TimelinePane event={{}} />
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
