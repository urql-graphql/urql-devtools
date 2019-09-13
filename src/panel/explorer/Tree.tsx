import React, { useCallback } from "react";
import styled from "styled-components";
import { NodeMap, FieldNode } from "../context/explorer/ast";
import { ListItem, SystemListItem } from "./ListItem";

interface Props {
  nodeMap: NodeMap | (NodeMap | null)[] | undefined;
  setFocusedNode: (node: FieldNode) => void;
  setDetailView: (node: FieldNode | null) => void;
  activeId?: string;
  depth?: number;
  index?: number;
}

const sortFields = (nodes: FieldNode[]) => {
  return nodes.sort((a, b) => {
    if (a.name === "id") {
      return -nodes.length;
    } else if (b.name === "id") {
      return nodes.length;
    }

    return a.name.localeCompare(b.name);
  });
};

export function Tree({
  nodeMap,
  setFocusedNode,
  setDetailView,
  activeId,
  depth = 0,
  index
}: Props) {
  if (Array.isArray(nodeMap)) {
    if (nodeMap.length === 0) {
      return null;
    }

    const children = nodeMap.map((childMap, childIndex) =>
      childMap ? (
        <Tree
          nodeMap={childMap}
          setFocusedNode={setFocusedNode}
          setDetailView={setDetailView}
          activeId={activeId}
          depth={depth}
          index={childIndex}
        />
      ) : null
    );

    return <>{children}</>;
  } else if (!nodeMap) {
    return null;
  }

  const mapNode = useCallback(
    (node: FieldNode) => (
      <ListItem
        key={node.key}
        node={node}
        setFocusedNode={setFocusedNode}
        setDetailView={setDetailView}
        activeId={activeId}
        depth={depth}
      />
    ),
    []
  );

  const fields = Object.values(nodeMap);
  const typenameField = fields.find(x => x.name === "__typename");

  const childrenFields = sortFields(
    fields.filter(x => x.children !== undefined)
  );

  const scalarFields = sortFields(
    fields.filter(x => x.children === undefined && x.name !== "__typename")
  );

  return (
    <List role={depth === 0 ? "tree" : "group"}>
      {typenameField ? (
        <SystemListItem node={typenameField} index={index} />
      ) : null}

      {scalarFields.map(mapNode)}
      {childrenFields.map(mapNode)}
    </List>
  );
}

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
