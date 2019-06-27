import React, { useContext, useEffect, useState } from "react";

import { useTransition, animated } from "react-spring";
import styled, { css } from "styled-components";
import { UrqlEvent } from "../../types";
import { EventsContext, FilterContext, FilterType } from "../context";
import { Background } from "../components/Background";
import { Panel } from "./panels";
import { EventCard } from "./EventCard";

interface Filter {
  value: string;
  propName: FilterType;
  propGetter: (e: UrqlEvent) => string | number;
}

function filterEvents(events: UrqlEvent[], filters: Filter[]) {
  return events.filter(event => {
    return filters.every(f => f.propGetter(event) === f.value);
  });
}

export const Events = () => {
  const { events, selectedEvent } = useContext(EventsContext);
  const { filters, removeFilter } = useContext(FilterContext);
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    setFilteredEvents(filterEvents(events, filters));
  }, [filters]);

  const [pressed, setPressed] = useState(false);

  /* TODO: this maps to the command key currently
  but the keycode might not match on non-webkit browsers */

  const handleKeydown = (e: KeyboardEvent) => setPressed(e.keyCode === 91);
  const handleKeyUp = () => setPressed(false);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyUp);

    () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const transitionFilters = useTransition(filters, filter => filter.value, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <Container>
      <FiltersContainer>
        {transitionFilters.length ? (
          transitionFilters.map(({ item, key, props }) => (
            <FilterButton
              key={key}
              style={props}
              buttonType={item.propName}
              onClick={() => removeFilter(item)}
            >
              <Cross viewBox="0 0 17 17" width="8px" height="8px">
                <path
                  d="M10.377 8.142l5.953-5.954-2.234-2.234-5.954 5.954L2.188-.046-.046 2.188l5.954 5.954-5.954 5.954 2.234 2.234 5.954-5.953 5.954 5.953 2.234-2.234z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </Cross>
              <span>{item.value}</span>
            </FilterButton>
          ))
        ) : (
          <TextContainer>
            <Title>No filters active</Title>
            <span>cmd+click an entry to toggle a filter</span>
          </TextContainer>
        )}
      </FiltersContainer>
      <EventsList>
        {filteredEvents.map((op: UrqlEvent, i: number) => (
          <EventCard
            key={i}
            operation={op}
            canFilter={pressed}
            active={op === selectedEvent}
          />
        ))}
      </EventsList>
      <Panel />
    </Container>
  );
};

interface FilterButtonProps {
  buttonType: FilterType;
}

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

const FiltersContainer = styled.div`
  display: flex;
  margin: 10px;
  text-align: center;
`;

const getButtonColor = (type: FilterType) => {
  switch (type) {
    case FilterType.Key: {
      return css`
        background-color: #fcfaa7;
        color: black;
      `;
    }
    case FilterType.Info: {
      return css`
        background-color: #239dd7;
        color: white;
      `;
    }

    case FilterType.Name: {
      return css`
        background-color: #695fd6;
        color: white;
      `;
    }

    default: {
      return css`
        background-color: white;
      `;
    }
  }
};

const Cross = styled.svg`
  color: currentColor;
  margin-right: 6px;
`;

const FilterButton = styled(animated.button)`
  display: flex;
  align-items: center;
  border: none;
  margin: 5px 8px 5px 5px;
  padding: 5px 8px;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: center;
  text-transform: capitalize;

  &:last-of-type {
    margin-right: 0;
  }

  ${(p: FilterButtonProps) => getButtonColor(p.buttonType)};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  color: white;
`;

const Title = styled.strong`
  font-size: 15px;
  margin-bottom: 8px;
`;

const EventsList = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: 0;
  flex-grow: 1;
`;
