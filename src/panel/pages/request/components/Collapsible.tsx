import React, { FC, ReactChild } from "react";
import styled from "styled-components";
import { Arrow } from "../../../components";

interface CollapsibleProps {
  title: string;
  isActive: boolean;
  children: ReactChild;
  onClick: () => void;
}

export const Collapsible: FC<CollapsibleProps> = ({
  title,
  isActive,
  children,
  onClick,
}) => {
  return (
    <>
      <CollapsibleHeader onClick={onClick} aria-expanded={isActive}>
        <Arrow data-active={isActive} />
        <span>{title}</span>
      </CollapsibleHeader>
      {isActive && <div>{children}</div>}
    </>
  );
};

const CollapsibleHeader = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${(p) => p.theme.colors.textDimmed.base};
  border-top: 1px solid ${(p) => p.theme.colors.divider.base};
  border-bottom: 1px solid ${(p) => p.theme.colors.divider.base};
  font-size: ${(p) => p.theme.fontSizes.body.m};
  line-height: ${(p) => p.theme.lineHeights.body.m};
  padding: ${(p) => p.theme.space[2]};

  &:hover {
    background: ${(p) => p.theme.colors.canvas.hover};
  }

  &:focus {
    background: ${(p) => p.theme.colors.canvas.active};
    outline: none;
  }

  & + & {
    border-top: 0;
  }
`;
