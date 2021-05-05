import React, { ComponentProps, FC } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type ToolbarItem = {
  title: string;
  icon: IconProp;
  onClick: () => void;
  id?: string;
  active?: boolean;
  disabled?: boolean;
};

export const Toolbar: FC<
  { items: ToolbarItem[] } & ComponentProps<typeof Container>
> = ({ items, children, ...props }) => (
  <Container {...props}>
    {items.map((item, index) => (
      <Item
        key={index}
        title={item.title}
        onClick={item.onClick}
        active={item.active}
        id={item.id}
        disabled={item.disabled}
      >
        <FontAwesomeIcon icon={item.icon} />
      </Item>
    ))}

    {children}
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: solid 1px ${(p) => p.theme.divider};
`;

const Item = styled.button<{ active?: boolean }>`
  font-size: 13px;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  color: ${(p) => (p.active ? p.theme.primary : p.theme.textDimmed)};

  &:hover {
    color: ${(p) =>
      p.active ? p.theme.primaryHover : p.theme.textDimmedHover};
  }

  &:active {
    color: ${(p) =>
      p.active ? p.theme.primaryActive : p.theme.textDimmedActive};
  }

  &::[disabled] {
    opacity: 0.5;
  }
`;
