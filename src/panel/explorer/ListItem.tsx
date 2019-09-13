import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { FieldNode } from "../context/explorer/ast";
import { ArrowIcon } from "./Icons";
import { Arguments } from "./Arguments";
import { Value } from "./Value";
import { Tree } from "./Tree";

interface ItemProps {
  node: FieldNode;
  setFocusedNode: (node: FieldNode) => any;
  setDetailView: (node: FieldNode | null) => any;
  activeId: string | undefined;
  depth?: number;
}

export function ListItem({
  node,
  activeId,
  setFocusedNode,
  setDetailView,
  depth = 0
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

  const nodeChildren = (
    <Tree
      nodeMap={node.children}
      activeId={activeId}
      setFocusedNode={setFocusedNode}
      setDetailView={setDetailView}
      depth={depth + 1}
    />
  );

  const isActive = node._id === activeId && isExpanded;

  const handleOnClick = () => {
    setIsExpanded(isExpanded => !isExpanded);
  };

  return (
    <>
      {hasChildren ? (
        <Item role="treeitem" withChildren>
          <FieldContainer onClick={handleOnClick} isActive={isActive}>
            <Arrow active={isExpanded} />
            <ChildrenName>{node.name}</ChildrenName>
            <Arguments args={node.args} displayAll={isExpanded} />
          </FieldContainer>
          {isExpanded ? nodeChildren : null}
        </Item>
      ) : (
        <Item role="treeitem">
          <Name>{node.name}</Name>
          <Arguments args={node.args} displayAll={isExpanded} />
          {`: `}
          <Value value={node.value} expandValues={false} />
        </Item>
      )}
    </>
  );
}

export const SystemListItem = ({
  node,
  index
}: {
  node: FieldNode;
  index?: number;
}) => (
  <Item>
    {" "}
    withChildren={false}
    <Typename>
      {`${node.value}`}
      {typeof index === "number" ? ` #${index}` : null}
    </Typename>
  </Item>
);

export const List = styled.ul`
  margin: 0;
  padding-bottom: 0.3rem;
  padding-top: 0.3rem;
  padding-left: 0.5rem;
  margin-left: 5px;
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
  padding: 0;
  margin: 0;
  padding-left: 1rem;
  background-color: transparent;
  border: none;
  outline: none;
  position: relative;
  height: 1.4rem;
  line-height: 1.4rem;

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
  padding-left: ${({ withChildren }: { withChildren: boolean }) =>
    withChildren ? "0" : "1rem"};
  min-height: 1.4rem;
  line-height: 1.4rem;
`;

const Name = styled.span`
  color: ${p => p.theme.grey["+2"]};
`;

const ChildrenName = styled.span`
  position: relative;
  margin-right: 3px;
  display: inline-block;
  color: ${p => p.theme.grey["-1"]};
  font-weight: bold;
  font-size: 14px;
`;

const Arrow = styled(ArrowIcon)`
  display: inline-block;
  height: 10px;
  width: 10px;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -4px;
  margin-left: 2px;

  transform: ${({ active }: { active: boolean }) =>
    active ? "rotate(90deg)" : "rotate(0deg)"};
  color: ${p => (p.active ? p.theme.red["+1"] : p.theme.grey["+1"])};
  transition: all 0.1s;
`;

const Typename = styled.button`
  border: 1px solid #32444d;
  background-color: #11171a;
  border-radius: 2px;
  padding: 3px 5px;
  margin-left: -7px;
  margin-bottom: 0.15rem;
  margin-top: -0.1rem;
  color: ${p => p.theme.grey["+2"]};
`;
