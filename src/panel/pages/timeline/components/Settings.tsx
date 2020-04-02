import React, { useState, useCallback, FC, ComponentProps } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Collapsible } from "../../../components";
import { useTimelineContext } from "../../../context";

export const Settings: FC<ComponentProps<typeof Container>> = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleExpandToggle = useCallback(() => setCollapsed((c) => !c), []);

  return (
    <Container {...props}>
      <Icon icon={faCog} onClick={handleExpandToggle} />
      <Content collapsed={collapsed}>
        <Filter />
      </Content>
    </Container>
  );
};

export const Filter: FC<ComponentProps<typeof FilterList>> = (props) => {
  const { exchanges, filter, setFilter } = useTimelineContext();

  const handleFilterToggle = useCallback(
    (v: string) => () =>
      setFilter((state) => ({
        ...state,
        source: state.source.includes(v)
          ? state.source.filter((f) => f !== v)
          : [...state.source, v],
      })),
    [setFilter]
  );

  return (
    <FilterList {...props}>
      <FilterTitle>source</FilterTitle>
      {exchanges.map((e) => (
        <FilterButton
          key={e}
          aria-role="checkbox"
          aria-selected={filter.source.includes(e)}
          onClick={handleFilterToggle(e)}
        >
          {e.replace(/Exchange$/, "")}
        </FilterButton>
      ))}
    </FilterList>
  );
};

const FilterList = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const FilterButton = styled.button`
  background: ${(props) => props.theme.dark["0"]};
  padding: 5px 10px;
  border: none;
  font-size: 12px;
  margin: 5px;
  color: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
  font-weight: bold;
  cursor: pointer;
  outline: none;

  &[aria-selected="true"] {
    background: #fff;
    color: #000;
  }
`;

const FilterTitle = styled.p`
  margin: 0 15px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #fff;
  opacity: 0.7;
  font-size: 14px;
  margin: 3px;
  margin-left: auto;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.75;
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
  background: ${(props) => props.theme.dark["-1"]};
`;
