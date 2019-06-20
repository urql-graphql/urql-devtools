import React, { FC } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface TabsProps<T = any> {
  options: { label: string; to: T }[];
}

export const Tabs: FC<TabsProps> = ({ options }) => (
  <Container>
    {options.map(o => (
      <Tab key={o.label} to={o.to}>
        {o.label}
      </Tab>
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
`;

const Tab = styled(NavLink)`
  margin: 0;
  padding: 10px;
  font-size: 12px;
  color: #fff;
  opacity: 0.6;
  text-decoration: none;

  &.active {
    opacity: 1;
  }

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
