import React, { useState, useCallback, FC, ComponentProps } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faFastBackward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import { Collapsible } from "../../../components";
import { useTimelineContext, START_PADDING } from "../../../context";

export const Settings: FC<ComponentProps<typeof Container>> = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleExpandToggle = useCallback(() => setCollapsed((c) => !c), []);
  const { setPosition, startTime } = useTimelineContext();

  const handleBackClick = useCallback(
    () => setPosition(startTime - START_PADDING),
    [setPosition, startTime]
  );

  const handleForwardClick = useCallback(() => setPosition(Date.now()), [
    setPosition,
    startTime,
  ]);

  return (
    <Container {...props}>
      <TopRow>
        <Icon
          data-active={!collapsed}
          title="Show filters"
          icon={faCog}
          onClick={handleExpandToggle}
        />
        <Icon
          title="Back to start [Home]"
          icon={faFastBackward}
          onClick={handleBackClick}
        />
        <Icon
          title="Forward to current time [End]"
          icon={faFastForward}
          onClick={handleForwardClick}
        />
      </TopRow>
      <Content collapsed={collapsed}>
        <Filter />
      </Content>
    </Container>
  );
};

export const Filter: FC<ComponentProps<typeof FilterList>> = (props) => {
  const { filterables, filter, setFilter } = useTimelineContext();

  const handleSourceToggle = useCallback(
    (v: string) => () =>
      setFilter((state) => ({
        ...state,
        source: state.source.includes(v)
          ? state.source.filter((f) => f !== v)
          : [...state.source, v],
      })),
    [setFilter]
  );

  const handleTypeToggle = useCallback(
    (v: string) => () =>
      setFilter((state) => ({
        ...state,
        graphqlType: state.graphqlType.includes(v)
          ? state.graphqlType.filter((f) => f !== v)
          : [...state.graphqlType, v],
      })),
    [setFilter]
  );

  return (
    <FilterList {...props}>
      <FilterGroup>
        {filterables.graphqlType.map((e) => (
          <FilterButton
            key={e}
            title="Toggle Graphql operation type"
            role="checkbox"
            aria-selected={filter.graphqlType.includes(e)}
            onClick={handleTypeToggle(e)}
          >
            {e}
          </FilterButton>
        ))}
      </FilterGroup>
      <FilterGroup>
        {filterables.source.map((e) => (
          <FilterButton
            key={e}
            title="Toggle debug event source"
            role="checkbox"
            aria-selected={filter.source.includes(e)}
            onClick={handleSourceToggle(e)}
          >
            {e.replace(/Exchange$/, "")}
          </FilterButton>
        ))}
      </FilterGroup>
    </FilterList>
  );
};

const FilterList = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const FilterGroup = styled.div`
  margin: 5px 0;
  padding: 0 5px;
  display: flex;
  align-items: center;

  & + & {
    border-left: solid 2px ${(p) => p.theme.dark["+8"]};
  }
`;

const FilterButton = styled.button`
  padding: 3px 10px;
  border: none;
  font-size: 12px;
  font-weight: 500;
  margin: 0 5px;
  border-radius: 2px;
  cursor: pointer;
  outline: none;

  background: ${(props) => props.theme.dark["+6"]};
  color: ${(p) => p.theme.grey["0"]};

  &:hover:not(:active) {
    filter: brightness(130%);
  }

  &[aria-selected="true"] {
    background: ${(p) => p.theme.light["-2"]};
    color: ${(p) => p.theme.dark["+2"]};
  }

  &[aria-selected="true"]:hover:not(:active) {
    filter: brightness(90%);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 13px;
  margin: 3px 5px;
  transition: color 100ms ease;
  color: ${(p) => p.theme.grey["0"]};

  &:hover:not(:active) {
    filter: brightness(140%);
  }

  &[data-active="true"] {
    color: ${(p) => p.theme.light["-4"]};
  }
`;

const TopRow = styled.div`
  display: flex;
`;

const Content = styled(Collapsible)`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  transition: max-height 300ms ease;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3px 10px;
  background: ${(props) => props.theme.dark["+3"]};
  border-bottom: solid 1px ${(p) => p.theme.dark["+4"]};
`;
