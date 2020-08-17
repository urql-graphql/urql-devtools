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
  color: ${(p) => p.theme.light["-5"]};
  background-color: ${(p) => p.theme.dark["+3"]};
  border: 1px solid ${(p) => p.theme.dark["+7"]};
  font-size: 13px;
  padding: 6px;

  &:hover {
    background-color: ${(p) => p.theme.dark["+5"]};
  }

  &:focus {
    background-color: ${(p) => p.theme.dark["+5"]};
    outline: none;
  }
`;
