import React, {
  useContext,
  useReducer,
  Reducer,
  ReactNode,
  useEffect,
  useState
} from "react";
import styled, { css } from "styled-components";
import { EventCard } from "./EventCard";
import { Panel } from "./panels";
import { EventsContext } from "../context";
import { Background } from "../components/Background";
import { UrqlEvent } from "../../types";

enum FilterType {
  Name = "name",
  Key = "key",
  Info = "info"
}
interface Filter {
  value: string;
  propName: FilterType;
  propGetter: any;
}

enum FilterActionType {
  Add = "add",
  Remove = "remove"
}

interface FilterState {
  filters: Filter[];
  filteredEvents: any[];
}

interface FilterAction {
  type: FilterActionType;
  payload: {
    filter: Filter;
  };
}

function initialState(initialEvents: any[]): FilterState {
  return {
    filters: [],
    filteredEvents: initialEvents
  };
}

export const Events = () => {
  const { events, selectedEvent } = useContext(EventsContext);

  const reducer: Reducer<FilterState, FilterAction> = (state, action) => {
    switch (action.type) {
      case FilterActionType.Add: {
        const newFilter = action.payload.filter;
        const newFilters = [
          action.payload.filter,
          ...state.filters.filter(
            f =>
              f.value !== newFilter.value && f.propName !== newFilter.propName
          )
        ];

        const newEvents = events.filter(event => {
          return newFilters.every(f => f.propGetter(event) === f.value);
        });

        return {
          filteredEvents: newEvents,
          filters: newFilters
        };
      }

      case FilterActionType.Remove: {
        const oldFilter = action.payload.filter;
        const newFilters = state.filters.filter(
          f => f.value !== oldFilter.value && f.propName !== oldFilter.propName
        );

        const newEvents = newFilters.length
          ? events.filter(event => {
              return newFilters.every(f => f.propGetter(event) === f.value);
            })
          : events;

        return {
          filteredEvents: newEvents,
          filters: newFilters
        };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer<Reducer<FilterState, FilterAction>>(
    reducer,
    initialState(events)
  );

  const [pressed, setPressed] = useState(false);

  const setPressedState = (e?: KeyboardEvent) => {
    if (!e) {
      return setPressed(false);
    }
    /* TODO: this maps to the command key currently
     but the keycode might not match on non-webkit browsers */
    return setPressed(e.keyCode === 91);
  };

  useEffect(() => {
    window.addEventListener("keydown", setPressedState);
    window.addEventListener("keyup", () => setPressedState());

    () => {
      window.removeEventListener("keydown", setPressedState);
      window.removeEventListener("keyup", () => setPressedState());
    };
  }, []);

  const renderFilters: Filter[] | [] = state.filters || [];
  const renderEvents: any[] | [] = state.filteredEvents || [];

  return (
    <Container>
      <FiltersContainer>
        {renderFilters.map(
          (filter: Filter, i: number): ReactNode => (
            <FilterButton
              key={i}
              buttonType={filter.propName}
              onClick={() =>
                dispatch({
                  type: FilterActionType.Remove,
                  payload: {
                    filter: {
                      value: filter.value,
                      propName: filter.propName,
                      propGetter: filter.propGetter
                    }
                  }
                })
              }
            >
              <strong>{filter.propName}:</strong>
              <span>{filter.value}</span>
            </FilterButton>
          )
        )}
      </FiltersContainer>
      <EventsList>
        {renderEvents.map((op: any, i: any) => (
          <EventCard
            key={i}
            operation={op}
            setFilter={dispatch}
            canFilter={pressed}
            active={op === selectedEvent}
          />
        ))}
      </EventsList>
      <Panel />
    </Container>
  );
};

interface StyleProps {
  isPressed: boolean;
}
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
  padding: 10px 15px;
  margin: 10px 0;
`;

const getButtonColor = (type: FilterType) => {
  switch (type) {
    case FilterType.Key: {
      return css`
        background-color: #fcfaa7;
      `;
    }
    case FilterType.Info: {
      return css`
        background-color: #c7f0d2;
      `;
    }

    case FilterType.Name: {
      return css`
        background-color: #b8dbf2;
      `;
    }

    default: {
      return css`
        background-color: white;
        color: black;
      `;
    }
  }
};

const FilterButton = styled.button`
  display: inline-block;
  border: none;
  margin-right: 5px;
  text-decoration: none;
  font-family: "Dank Mono", monospace;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:last-of-type {
    margin-right: 0;
  }

  ${(p: FilterButtonProps) => getButtonColor(p.buttonType)};
`;

const EventsList = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: 0;
  flex-grow: 1;
`;
