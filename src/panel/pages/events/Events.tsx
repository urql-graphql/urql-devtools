import React, {
  useContext,
  useEffect,
  useState,
  FC,
  ComponentProps,
} from "react";
import styled from "styled-components";
import { EventsContext } from "../../context";
import { Background } from "../../components/Background";
import { EventPane, EventCard, Filters, Headers } from "./components";

export const Events: FC<ComponentProps<typeof Container>> = (props) => {
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
    <Container {...props}>
      <EventsList>
        <Filters />
        <Headers />
        {events.length === 0 ? (
          <NoEvents>No Events</NoEvents>
        ) : (
          events.map((event) => (
            <EventCard
              key={`${event.timestamp}-${event.type}`}
              event={event}
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
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: 0;
  flex-grow: 1;
`;

const NoEvents = styled.h2`
  color: ${(p) => p.theme.grey["+2"]};
  margin: 0;
  margin-top: 12px;
  font-style: italic;
  text-align: center;
  width: 100%;
`;
