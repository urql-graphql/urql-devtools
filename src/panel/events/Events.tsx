import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { EventsContext } from "../context";
import { Background } from "../components/Background";
import { Panel } from "./panels";
import { EventCard } from "./EventCard";
import { Filters } from "./Filters";

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

  return (
    <Container>
      <EventsList>
        <Filters />
        {events.map((event, i) => (
          <EventCard
            key={i}
            event={event}
            canFilter={filteringOn}
            active={event === selectedEvent}
          />
        ))}
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
