import React, { FC, useContext, useCallback } from "react";
import styled from "styled-components";
import { useTransition } from "react-spring";
import { animated } from "react-spring";
import { EventsContext, EventsContextValue } from "../../../context";

interface FilterEntry {
  type: keyof EventsContextValue["activeFilters"];
  value: string;
}

export const Filters: FC = () => {
  const { activeFilters, removeFilter } = useContext(EventsContext);

  const flattenedFilters = Object.keys(activeFilters).reduce(
    (filters, key) => [
      ...filters,
      ...(activeFilters as Record<string, any>)[key].map((value: string[]) => ({
        type: key,
        value
      }))
    ],
    [] as FilterEntry[]
  );

  const transitionFilters = useTransition(flattenedFilters, i => i.value, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 100 }
  });

  const handleFilterClick = useCallback(
    (filter: FilterEntry) => () => removeFilter(filter.type, filter.value),
    [removeFilter]
  );

  return (
    <FiltersContainer>
      {transitionFilters.length ? (
        transitionFilters.map(({ item, key, props }) => (
          <FilterButton
            key={key}
            style={props}
            data-type={item.type}
            onClick={handleFilterClick(item)}
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
  );
};

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  text-align: center;
  height: 70px;
`;

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
  color: rgba(255, 255, 255, 0.9);

  &:last-of-type {
    margin-right: 0;
  }

  &[data-type="key"] {
    background: ${props => props.theme.blue[-2]};
  }

  &[data-type="type"] {
    background: ${props => props.theme.blue[-2]};
  }

  &[data-type="source"] {
    background: ${props => props.theme.blue[-2]};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  color: ${p => p.theme.grey["+2"]};
`;

const Title = styled.strong`
  font-size: 15px;
  margin-bottom: 8px;
`;
