import React, { FC } from "react";
import styled from "styled-components";

interface TabsProps<T = any> {
  readonly active: T;
  readonly options: readonly { readonly label: string; readonly value: T }[];
  readonly setActive: (active: T) => void;
}

export const Tabs: FC<TabsProps> = ({ active, options, setActive }) => (
  <Container>
    {options.map((o) => (
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
  padding: ${(p) => p.theme.space[3]};
  font-size: ${(p) => p.theme.fontSizes.body.m};
  line-height: ${(p) => p.theme.lineHeights.body.m};
  color: ${(p) => p.theme.colors.textDimmed.base};

  &[data-active="true"] {
    color: ${(p) => p.theme.colors.text.base};
  }

  &:hover {
    color: ${(p) => p.theme.colors.textDimmed.hover};
    cursor: pointer;
  }
`;
