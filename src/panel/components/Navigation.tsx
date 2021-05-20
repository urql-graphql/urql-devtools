import React, { ComponentProps, FC } from "react";
import { rem } from "polished";
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
  border-bottom: solid 1px ${(p) => p.theme.colors.divider.base};
  background: ${(p) => p.theme.colors.canvas.base};
  height: ${rem(36)};
  top: 0;
  left: 0;
  right: 0;
`;

const Item = styled.a<{ alignRight?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 ${(p) => p.theme.space[3]};
  font-size: ${(p) => p.theme.fontSizes.body.m};
  font-height: ${(p) => p.theme.lineHeights.body.m};
  font-weight: 400;
  text-decoration: none;
  color: ${(p) => p.theme.colors.text.base};
  ${({ alignRight }) => alignRight && `margin-left: auto;`}

  &:hover {
    background: ${(p) => p.theme.colors.canvas.hover};
  }

  &:active {
    background: ${(p) => p.theme.colors.canvas.active};
  }

  &.active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: ${rem(2)};
    background: ${(p) => p.theme.colors.primary.base};
  }
`;

const Logo = styled(Icon)`
  width: ${rem(32)};
  height: ${rem(19)};

  path {
    fill: ${(p) => p.theme.colors.textDimmed.base};
  }
`;
