import React, { ComponentProps, FC } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Icon from "../../assets/icon.svg";

type NavItem = { link: string; label: string };

export const Navigation: FC<
  { items: NavItem[] } & ComponentProps<typeof Container>
> = ({ items, ...props }) => (
  <Container {...props}>
    {items.map((item, index) => (
      <Item as={NavLink} key={index} to={item.link}>
        {item.label}
      </Item>
    ))}

    <Item
      href="https://formidable.com/open-source/urql/"
      target="_blank"
      rel="noopener"
      title="urql Documentation"
      alignRight
    >
      <Logo />
    </Item>
  </Container>
);

const Container = styled.div`
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  border-bottom: solid 1px ${(p) => p.theme.dark["+4"]};
  background-color: ${(props) => props.theme.dark[0]};
  height: 36px;
  top: 0;
  left: 0;
  right: 0;
`;

const Item = styled.a<{ alignRight?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;
  color: ${(p) => p.theme.light["0"]};
  ${({ alignRight }) => alignRight && `margin-left: auto;`}

  &:hover {
    background: ${(p) => p.theme.accent["-8"]};
  }

  &.active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${(p) => p.theme.accent["0"]};
  }
`;

const Logo = styled(Icon)`
  width: 32px;
  height: 19px;
  > * {
    fill: ${(p) => p.theme.grey["0"]};
  }
`;
