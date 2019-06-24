import React, { useContext } from "react";
import styled from "styled-components";
import { EventsContext } from "../context";
import { Background } from "../components/Background";
import { EventCard } from "./EventCard";
import { Panel } from "./panels";

export const Events = () => {
  const { events } = useContext(EventsContext);

  return (
    <Container>
      <EventsList>
        {events.map((op: any, i: any) => (
          <EventCard key={i} operation={op} />
        ))}
      </EventsList>
      <Panel />
    </Container>
  );
};

const Container = styled(Background)`
  @media (min-aspect-ratio: 1/1) {
    & > * {
      width: 50%;
    }

    & > *:nth-child(2) {
      margin: 10px;
      height: unset;
      max-height: unset;
    }
  }
`;

const EventsList = styled.div`
  overflow: scroll;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: 0;
  flex-grow: 1;
`;
