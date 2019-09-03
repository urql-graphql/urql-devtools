import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Background } from "../components/Background";
import { ExplorerContext } from "../context";
import { NodeMap, FieldNode } from "../context/explorer/ast";

interface ItemProps {
  node: FieldNode;
  renderChildren: (node: NodeMap) => any;
}

function ListItem({ node, renderChildren }: ItemProps) {
  const [displayChildren, setDisplayChildren] = useState(false);
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

  const renderValue = (value: FieldNode["value"]) => {
    if (
      Array.isArray(value) ||
      (Array.isArray(node.children) && node.children.length === 0)
    ) {
      return "[]";
    } else if (typeof value === "object" && !!value) {
      return "{}";
    } else {
      return `${value}`;
    }
  };

  return (
    <Item role="treeitem">
      {hasChildren ? (
        <>
          <Button onClick={handleOnClick}>
            <Arrow active={displayChildren} />
            {node.displayName}
          </Button>
          {displayChildren ? nodeChildren : null}
        </>
      ) : (
        <>
          <Name>{node.displayName}:</Name> {renderValue(node.value)}
        </>
      )}
    </Item>
  );
}

export function Explorer() {
  const { data } = useContext(ExplorerContext);

  const renderTree = (data: NodeMap | NodeMap[]) => {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((el: any) => {
        const keys = Object.keys(el);
        return (
          <List>
            {keys.map(key => (
              <ListItem node={el[key]} renderChildren={renderTree} />
            ))}
          </List>
        );
      });
    } else if (typeof data === "object" && !Array.isArray(data)) {
      const keys = Object.keys(data);
      return keys.map((key: string) => {
        const node: FieldNode = data[key];

        if (node) {
          return <ListItem node={node} renderChildren={renderTree} />;
        }
      });
    } else {
      return null;
    }
  };

  return (
    <Container>
      <List role="tree">{renderTree(data)}</List>
    </Container>
  );
}

const Container = styled(Background)`
  padding: 1rem 0;
  background-color: #263238;
  overflow-y: auto;
`;

const SidePanel = styled.aside`
  background-color: #1c2529;
`;

const List = styled.ul`
  margin: 0;
  padding-bottom: 1rem;
  padding-left: 0;
  margin-left: 3.5px;
  border-left: 3px solid #607e90;
  list-style: none;
  font-size: 14px;
  color: #607e8f;

  &:last-of-type {
    margin-bottom: 0;
  }

  &[role="tree"] {
    border-left: none;

    & > li {
      border-left: none;
    }
  }
`;

const Item = styled.li`
  padding-left: 1rem;
`;

const Button = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  color: #607e8f;

  font-weight: bold;
  font-size: 14px;
`;

const Svg = ({ className }: { className?: string }) => (
  <svg
    height="10"
    width="10"
    viewBox="0 0 4 8"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 3.982a.485.485 0 01-.127.355C3.731 4.5.61 7.729.465 7.892c-.145.163-.443.163-.443-.147L0 .255c0-.31.298-.31.442-.147C.587.271 3.71 3.5 3.852 3.663c.085.1.148.173.148.319z"
      fill="currentColor"
    />
  </svg>
);

const Arrow = styled(Svg)`
  display: inline-block;
  margin-right: 3px;
  transform: ${({ active }: { active: boolean }) =>
    active ? "rotate(90deg)" : "rotate(0deg)"};
  color: ${({ active }: { active: boolean }) =>
    active ? "#EC8275" : "#A5B0B7"};
  transition: all 0.1s;
`;

const Name = styled.span`
  color: #b4bfd1;
`;
