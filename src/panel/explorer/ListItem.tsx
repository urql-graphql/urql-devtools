import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { FieldNode } from "../context/Explorer/ast";
import { ArrowIcon } from "./Icons";
import { Arguments } from "./Arguments";
import { Value } from "./Value";
import { Tree } from "./Tree";
import { useHighlight, HighlightUpdate } from "./Highlight";

interface ItemProps {
  node: FieldNode;
  setFocusedNode: (id: string) => any;
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
  const [isAnimating, onAnimationEnd] = useHighlight([node.children]);

  useEffect(() => {
    if (isExpanded) {
      setFocusedNode(node._id);
      setDetailView(node);
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

  const contents = (
    <>
      <Name>{node.name}</Name>
      <Arguments args={node.args} displayAll={isExpanded} />
      <Symbol>{`:`}</Symbol>
      <ValueWrapper>
        <Value
          value={node.children !== undefined ? node.children : node.value}
          expandValues
        />
      </ValueWrapper>
    </>
  );

  return (
    <>
      {hasChildren ? (
        <Item role="treeitem" withChildren>
          <FieldContainer onClick={handleOnClick}>
            <OutlineContainer isActive={isActive}>
              <HighlightUpdate
                isAnimating={isAnimating && !isExpanded}
                onAnimationEnd={onAnimationEnd}
              >
                <Arrow active={isExpanded} />
                <ChildrenName>{node.name}</ChildrenName>
                <Arguments args={node.args} displayAll={isExpanded} />
              </HighlightUpdate>
            </OutlineContainer>
          </FieldContainer>
          {isExpanded ? nodeChildren : null}
        </Item>
      ) : (
        <Item role="treeitem" withChildren={false}>
          {node.args ? (
            <FieldContainer onClick={handleOnClick}>
              <OutlineContainer isActive={isActive}>
                {contents}
              </OutlineContainer>
            </FieldContainer>
          ) : (
            <>{contents}</>
          )}
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
  <Item withChildren={false}>
    <Typename>
      {`${node.value}`}
      {typeof index === "number" ? ` #${index}` : null}
    </Typename>
  </Item>
);

const ValueWrapper = styled.div`
  display: inline-block;
`;

const Item = styled.li`
  padding-left: ${({ withChildren }: { withChildren: boolean }) =>
    withChildren ? "0" : "1rem"};
  min-height: 1.4rem;
  line-height: 1.4rem;
  color: ${p => p.theme.grey["-1"]};
`;

const FieldContainer = styled.button`
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
  padding-left: 1rem;
  background-color: transparent;
  border: none;
  outline: none;
  position: relative;
  min-height: 1.4rem;
  line-height: 1.4rem;
  cursor: pointer;

  color: ${p => p.theme.grey["-1"]};
  text-align: left;
  font-size: 14px;

  & > ${ValueWrapper} {
    display: inline-flex;
    width: min-content;
    flex-wrap: wrap;
  }
`;

const OutlineContainer = styled.div`
  position: absolute;
  bottom: 0;
  top: 0;
  left: -3px;
  width: 100%;

  padding-left: 3px;

  ${({ isActive }: { isActive: boolean }) =>
    isActive &&
    css`
      background-color: ${p => p.theme.dark["-1"]};
      outline: 1px dashed ${p => `${p.theme.pink["0"]}a0`};
      transition: all 0.3s linear;
    `};
`;

const Name = styled.span`
  color: ${p => p.theme.pink["0"]};
`;

const ChildrenName = styled.span`
  position: relative;
  margin-right: 3px;
  display: inline-block;
  color: ${p => p.theme.purple["+1"]};
  font-weight: bold;
  font-size: 14px;
`;

const Arrow = styled(ArrowIcon)`
  display: inline-block;
  height: 10px;
  width: 10px;

  margin-top: -4px;
  margin-left: 2px;
  margin-right: 5px;

  transform: ${({ active }: { active: boolean }) =>
    active ? "rotate(90deg)" : "rotate(0deg)"};
  color: ${p => (p.active ? p.theme.pink["+2"] : p.theme.grey["-1"])};
  transition: all 0.1s;
`;

const Typename = styled.div`
  display: inline-block;
  margin-left: -7px;
  margin-bottom: 0.15rem;
  margin-top: -0.1rem;
  padding: 3px 5px;
  border: 1px solid ${p => `${p.theme.grey["-1"]}50`};
  border-radius: 2px;
  background-color: ${p => p.theme.dark["-1"]};
  color: ${p => p.theme.grey["+2"]};
  font-size: 11px;
  line-height: 1rem;
`;

const Symbol = styled.span`
  color: ${p => p.theme.grey["-1"]};
  margin-right: 3px;
`;
