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
  color: ${(p) => p.theme.textDimmed.base};
  border-top: 1px solid ${(p) => p.theme.divider.base};
  border-bottom: 1px solid ${(p) => p.theme.divider.base};
  font-size: 12px;
  padding: 6px;

  &:hover {
    background: ${(p) => p.theme.canvas.hover};
  }

  &:focus {
    background: ${(p) => p.theme.canvas.active};
    outline: none;
  }

  & + & {
    border-top: 0;
  }
`;
