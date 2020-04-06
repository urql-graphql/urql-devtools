import React, { ComponentProps, FC } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const navItems = [
  { link: "/explorer", label: "Explorer" },
  { link: "/events", label: "Events" },
  { link: "/request", label: "Request" },
];

export const Navigation: FC<ComponentProps<typeof Container>> = (props) => (
  <Container {...props}>
    {navItems.map((item, index) => (
      <NavLink key={index} to={item.link}>
        {item.label}
      </NavLink>
    ))}
  </Container>
);

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.dark["0"]};
  border-bottom: solid 1px ${(p) => p.theme.dark["+4"]};
  height: 35px;
  top: 0;
  left: 0;
  right: 0;

  a {
    color: ${(p) => p.theme.light["-4"]};
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 13px;
    font-weight: 400;
    padding: 0 20px;

    &.active {
      color: ${(p) => p.theme.light["0"]};
      background-color: ${(props) => props.theme.dark["+4"]};
    }

    &:hover:not(.active) {
      background-color: ${(p) => p.theme.dark["+3"]};
    }
  }
`;
