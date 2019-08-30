import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { EventsContext } from "../context";
import { Background } from "../components/Background";
import { Panel } from "./panels";
import { EventCard } from "./EventCard";
import { Filters } from "./Filters";
import { Headers } from "./Headers";

export const Events = () => {
  const { events, selectedEvent } = useContext(EventsContext);
  const [filteringOn, setFilteringOn] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      (e.metaKey || e.ctrlKey) && setFilteringOn(true);
    const handleKeyUp = (e: KeyboardEvent) =>
      (e.key === "Meta" || e.key == "Control") && setFilteringOn(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  console.log(events.length);
  return (
    <Container>
      <EventsList>
        <Filters />
        <Headers />
        {events.length === 0 ? (
          <NoEvents>No Events</NoEvents>
        ) : (
          events.map((event, i) => (
            <EventCard
              key={i}
              event={event}
              canFilter={filteringOn}
              active={event === selectedEvent}
            />
          ))
        )}
      </EventsList>
      {selectedEvent !== undefined && <Panel event={selectedEvent} />}
    </Container>
  );
};

const Container = styled(Background)`
  @media (min-aspect-ratio: 1/1) {
    & > * {
      width: 50%;
    }

    & > *:nth-child(2) {
      height: unset;
      max-height: unset;
    }
  }
`;

const EventsList = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: 0;
  flex-grow: 1;
`;

const NoEvents = styled.h2`
  color: white;
  margin: 0;
  margin-top: 12px;
  font-style: italic;
  text-align: center;
  width: 100%;
`;
