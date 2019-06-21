import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream, faGlobe } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const navItems = [
  { link: "/events", icon: faStream },
  { link: "/request", icon: faGlobe }
];

export const Navigation = () => (
  <Container>
    {navItems.map((item, index) => (
      <NavLink key={index} to={item.link}>
        <FontAwesomeIcon icon={item.icon} />
      </NavLink>
    ))}
  </Container>
);

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.cardBg};
  height: 50px;
  bottom: 0;
  left: 0;
  right: 0;

  a {
    color: #fff;
    font-size: 20px;
    margin: 0 30px;
    opacity: 0.6;

    &.active {
      opacity: 0.9;
    }

    &:hover:not(.active) {
      opacity: 0.8;
    }
  }

  @media (min-aspect-ratio: 1/1) {
    flex-direction: column;
    top: 0;
    right: unset;
    width: 40px;
    height: auto;

    a {
      margin: 20px 0;
    }
  }
`;
