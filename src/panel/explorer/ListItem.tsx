import React, { useState, useMemo, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { NodeMap, FieldNode } from "../context/explorer/ast";
import { ArrowIcon } from "./Icons";
import { Arguments } from "./Arguments";
import { Value } from "./Value";

interface ItemProps {
  node: FieldNode;
  renderChildren: (node: NodeMap, index?: number) => any;
  setFocusedNode: (node: FieldNode) => any;
  setDetailView: (node: FieldNode | null) => any;
  focusedNodeId: string | undefined;
  index?: number;
}

const sortFields = (map: NodeMap): NodeMap => {
  if (!map) {
    return {};
  }

  const odering = Object.keys(map).sort((a, b) => {
    if (map[a].name === "__typename" && map[b].name !== "__typename") {
      return -1;
    }

    if (map[a].children && !map[b].children) {
      return 1;
    }

    return -1;
  });

  return odering.reduce(
    (acc, key) => ({ ...acc, [key]: map[key] }),
    {} as typeof map
  );
};

export function ListItem({
  node,
  renderChildren,
  focusedNodeId,
  setFocusedNode,
  setDetailView,
  index
}: ItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      setDetailView(node);
      setFocusedNode(node);
    } else {
      setDetailView(null);
    }
  }, [isExpanded]);

  const hasChildren = Array.isArray(node.children)
    ? node.children.length > 0
    : !!node.children;
  const children = node.children as NodeMap;

  const nodeChildren = !Array.isArray(children) ? (
    <List role="group">{renderChildren(sortFields(children))}</List>
  ) : (
    children.map((child, index) => (
      <List role="group">{renderChildren(sortFields(child), index)}</List>
    ))
  );

  const isActive = node.id === focusedNodeId && isExpanded;

  console.log(focusedNodeId);

  const handleOnClick = () => {
    setIsExpanded(isExpanded => !isExpanded);
  };

  return (
    <>
      {hasChildren ? (
        <Item role="treeitem" hasChildren>
          <FieldContainer onClick={handleOnClick} isActive={isActive}>
            <Button>
              <Arrow active={isExpanded} />
              {node.name}
            </Button>
            <Arguments node={node} displayAll={isExpanded} />
          </FieldContainer>
          {isExpanded ? nodeChildren : null}
        </Item>
      ) : (
        <>
          {node.name !== "__typename" ? (
            <Item role="treeitem" hasChildren={false}>
              <Name>{`${node.name}: `}</Name>
              <Value node={node} value={node.value} />
            </Item>
          ) : (
            <Item hasChildren>
              <Typename>
                {`${node.value}`}
                {typeof index === "number" ? ` #${index}` : null}
              </Typename>
            </Item>
          )}
        </>
      )}
    </>
  );
}

export const List = styled.ul`
  margin: 0;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  margin-left: 5px;
  margin-top: 3.5px;
  border-left: 3px solid #cae3f212;
  list-style: none;
  font-size: 14px;
  color: ${p => p.theme.grey["-1"]};

  &:last-of-type {
    margin-bottom: 0;
  }

  &[role="tree"] {
    border-left: none;
    padding-left: 0;

    & > li {
      border-left: none;
      padding: 0;
    }
  }
`;

const FieldContainer = styled.button`
  width: 100%;
  padding: 3px;
  margin: 0;
  background-color: transparent;
  border: none;
  outline: none;

  color: ${p => p.theme.grey["-1"]};
  text-align: left;
  font-size: 14px;

  ${({ isActive }: { isActive: boolean }) =>
    isActive &&
    css`
      background-color: ${p => p.theme.dark["-1"]};
      transition: background-color 0.3s linear;
    `};
`;

const Item = styled.li`
  padding-left: 1rem;
  line-height: 1.5rem;

  ${({ hasChildren }: { hasChildren: boolean }) =>
    hasChildren &&
    css`
      padding-left: 0;
    `}
`;

const Name = styled.span`
  color: ${p => p.theme.grey["+2"]};
`;

const Button = styled.div`
  position: relative;
  margin-right: 3px;
  display: inline-block;

  color: ${p => p.theme.grey["-1"]};

  font-weight: bold;
  font-size: 14px;
`;

const Arrow = styled(ArrowIcon)`
  display: inline-block;
  margin: 3px 3px 0 0;
  transform: ${({ active }: { active: boolean }) =>
    active ? "rotate(90deg)" : "rotate(0deg)"};
  color: ${({ active, theme }: { active: boolean }) =>
    active ? theme.red["+1"] : theme.grey["+1"]};
  transition: all 0.1s;
`;

const Typename = styled.button`
  border: 1px solid #32444d;
  background-color: #11171a;
  border-radius: 2px;
  padding: 3px 5px;
  margin-left: 3px;
  color: ${p => p.theme.grey["+2"]};
`;
