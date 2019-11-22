import React, { useContext, useEffect, useState } from "react";
import { useTransition } from "react-spring";
import styled from "styled-components";
import { EventsContext } from "../context";
import { Background } from "../components/Background";
import { EventPane } from "./EventPane";
import { EventCard } from "./EventCard";
import { Filters } from "./Filters";
import { Headers } from "./Headers";

export const Events = () => {
  const { events, selectedEvent } = useContext(EventsContext);
  const [filteringOn, setFilteringOn] = useState(false);

  const transitionEvents = useTransition(events, e => e.timestamp, {
    config: { duration: 200 },
    from: { transform: `translateY(100%)`, opacity: 0 },
    enter: { transform: `translateY(0%)`, opacity: 1 }
  });

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
        <Headers />
        {transitionEvents.length === 0 ? (
          <NoEvents>No Events</NoEvents>
        ) : (
          transitionEvents.map(({ key, item, props }) => (
            <EventCard
              style={props}
              key={key}
              event={item}
              canFilter={filteringOn}
              active={event === selectedEvent}
            />
          ))
        )}
      </EventsList>
      {selectedEvent !== undefined && <EventPane event={selectedEvent} />}
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
  color: ${p => p.theme.grey["+2"]};
  margin: 0;
  margin-top: 12px;
  font-style: italic;
  text-align: center;
  width: 100%;
`;
