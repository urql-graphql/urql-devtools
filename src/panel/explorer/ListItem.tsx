import React, { useState, useMemo } from "react";
import styled, { css } from "styled-components";
import { NodeMap, FieldNode } from "../context/explorer/ast";
import { ArrowIcon, SeeMoreIcon } from "./Icons";

interface ItemProps {
  node: FieldNode;
  renderChildren: (node: NodeMap) => any;
  openDetailView: (node: FieldNode) => any;
}

export function ListItem({ node, renderChildren, openDetailView }: ItemProps) {
  const [displayChildren, setDisplayChildren] = useState(false);
  const [displayAllArgs, setDisplayAllArgs] = useState(false);

  const hasChildren = Array.isArray(node.children)
    ? node.children.length > 0
    : !!node.children;
  const children = node.children as NodeMap;

  const nodeChildren = !Array.isArray(children) ? (
    <List>{renderChildren(children)}</List>
  ) : (
    children.map(child => <List>{renderChildren(child)}</List>)
  );

  const handleOnClick = () => {
    setDisplayChildren(display => !display);
  };

  const handleExpandClick = () => {
    setDisplayAllArgs(true);
    openDetailView(node);
  };

  const renderValue = (value: FieldNode["value"]) =>
    useMemo(() => {
      if (Array.isArray(value) || Array.isArray(node.children)) {
        if (node.children && node.children.length === 0) {
          return "[]";
        } else {
          return (
            <IconContainer onClick={handleExpandClick}>
              {`[`}
              <SeeMore />
              {`]`}
            </IconContainer>
          );
        }
      } else if (typeof value === "object" && !!value) {
        if (Object.keys(value).length > 0) {
          return (
            <IconContainer onClick={handleExpandClick}>
              {`{`}
              <SeeMore />
              {`}`}
            </IconContainer>
          );
        } else {
          return "{}";
        }
      } else if (typeof value === "string") {
        return `"${value}"`;
      } else if (typeof value === "number") {
        return `${value}`;
      } else {
        return `${value}`;
      }
    }, [node]);

  const renderArguments = (args: FieldNode["args"]) => {
    if (!args) {
      return null;
    }

    args = { blah: { foo: "bar" }, something: ["array"], ...args };
    let content = [];
    const entries = Object.entries(args);

    for (const [key, val] of entries) {
      content.push(
        <ArgWrapper>
          <ArgKey>{key}: </ArgKey>
          {renderValue(val)}
          {content.length === entries.length - 1 ? "" : ","}
        </ArgWrapper>
      );
    }

    if (!displayAllArgs) {
      content = [...content.slice(0, 3)];
      content.push(
        <ExpandContainer onClick={handleExpandClick}>
          <SeeMore />
        </ExpandContainer>
      );
    }

    return content ? <ArgsContainer>({content})</ArgsContainer> : null;
  };

  return (
    <Item role="treeitem">
      {hasChildren ? (
        <>
          <FieldContainer active={displayAllArgs}>
            <Button onClick={handleOnClick}>
              <Arrow active={displayChildren} />
              {node.name}
            </Button>
            {renderArguments(node.args)}
          </FieldContainer>
          {displayChildren ? nodeChildren : null}
        </>
      ) : (
        <>
          <Name>{node.name}:</Name> {renderValue(node.value)}
        </>
      )}
    </Item>
  );
}

export const List = styled.ul`
  margin: 0;
  padding-bottom: 1rem;
  padding-left: 0;
  margin-left: 3.5px;
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

    & > li {
      border-left: none;
      padding: 0;
    }
  }
`;

const Item = styled.li`
  padding-left: 1rem;
`;

const FieldContainer = styled.div`
  width: 100%;
  padding: 3px;

  ${({ active }: { active: boolean }) => {
    return (
      active &&
      css`
        border: 1px dashed ${p => p.theme.purple[0]};
        background-color: ${p => p.theme.dark["-1"]};
      `
    );
  }}
`;

const Button = styled.button`
  padding: 0;
  margin-right: 3px;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${p => p.theme.grey["-1"]};

  font-weight: bold;
  font-size: 14px;
`;

const Arrow = styled(ArrowIcon)`
  display: inline-block;
  margin-right: 3px;
  transform: ${({ active }: { active: boolean }) =>
    active ? "rotate(90deg)" : "rotate(0deg)"};
  color: ${({ active, theme }: { active: boolean }) =>
    active ? theme.red["+1"] : theme.grey["+1"]};
  transition: all 0.1s;
`;

const SeeMore = styled(SeeMoreIcon)`
  margin: 3px;
`;

const Name = styled.span`
  color: ${p => p.theme.grey["+2"]};
`;

const ArgsContainer = styled.div`
  display: inline-flex;
  max-width: 400px;
  flex-wrap: wrap;
`;

const ArgKey = styled.span`
  color: ${p => p.theme.purple["0"]};
`;

const ArgWrapper = styled.span`
  margin-right: 5px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const String = styled.span`
  color: #608f83;
`;

const Keyword = styled.span`
  color: #8f606e;
`;

const Number = styled.span`
  color: #8f8a60;
`;

const IconContainer = styled.button`
  display: inline-flex;
  align-items: flex-end;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  color: ${p => p.theme.grey["-1"]};
  font-size: 14px;
  cursor: pointer;
`;

const ExpandContainer = styled(IconContainer)`
  margin: 5px 5px 0;
`;
