import React, { FC } from "react";
import styled from "styled-components";

interface TabsProps<T = any> {
  active: T;
  options: { label: string; value: T }[];
  setActive: (active: T) => void;
}

export const Tabs: FC<TabsProps> = ({ active, options, setActive }) => (
  <Container>
    {options.map(o => (
      <Tab
        key={o.value}
        data-active={o.value === active}
        onClick={() => setActive(o.value)}
      >
        {o.label}
      </Tab>
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
`;

const Tab = styled.h3`
  margin: 0;
  padding: 10px;
  font-size: 12px;
  color: #fff;
  opacity: 0.6;

  &[data-active="true"] {
    opacity: 1;
  }

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
