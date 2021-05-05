import React, { useState, useCallback, FC, ComponentProps } from "react";
import styled from "styled-components";
import {
  faCog,
  faFastBackward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import { Collapsible, Toolbar } from "../../../components";
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
      <Toolbar
        items={[
          {
            title: "Show filters",
            icon: faCog,
            active: !collapsed,
            onClick: handleExpandToggle,
          },
          {
            title: "Back to start [Home]",
            icon: faFastBackward,
            onClick: handleBackClick,
          },
          {
            title: "Forward to current time [End]",
            icon: faFastForward,
            onClick: handleForwardClick,
          },
        ]}
      />

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
  border-bottom: solid 1px ${(p) => p.theme.divider.base};
`;

const FilterGroup = styled.div`
  margin: 6px 0;
  padding: 0 5px;
  display: flex;
  align-items: center;

  & + & {
    border-left: solid 1px ${(p) => p.theme.divider.base};
  }
`;

const FilterButton = styled.button`
  padding: 3px 6px;
  border: none;
  font-size: 12px;
  font-weight: 500;
  margin: 0 4px;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
  background: ${(p) => p.theme.canvas.base};
  color: ${(p) => p.theme.text.base};

  &:hover {
    background: ${(p) => p.theme.canvas.hover};
  }

  &:active {
    background: ${(p) => p.theme.canvas.active};
  }

  &[aria-selected="true"] {
    background: ${(p) => p.theme.primary.base};
    color: ${(p) => p.theme.primary.contrast};

    &:hover {
      background: ${(p) => p.theme.primary.hover};
    }

    &:active {
      background: ${(p) => p.theme.primary.active};
    }
  }
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
`;
