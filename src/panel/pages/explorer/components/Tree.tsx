import React, { FC } from "react";
import styled from "styled-components";
import { ParsedNodeMap, ParsedFieldNode } from "../../../context/Explorer/ast";
import { ListItem, SystemListItem } from "./ListItem";

interface TreeProps {
  nodeMap: ParsedNodeMap | (ParsedNodeMap | null)[] | undefined;
  depth?: number;
  index?: number;
}

export const Tree: FC<TreeProps> = ({ nodeMap, depth = 0, index }) => {
  if (!nodeMap || (Array.isArray(nodeMap) && nodeMap.length === 0)) {
    return null;
  }

  if (Array.isArray(nodeMap)) {
    return (
      <>
        {nodeMap.map(
          (map, index) =>
            map && (
              <Tree key={index} nodeMap={map} depth={depth} index={index} />
            )
        )}
      </>
    );
  }

  const fields = Object.values(nodeMap);
  const typenameField = fields.find((x) => x.name === "__typename");
  const childrenFields = sortFields(
    fields.filter((x) => x.children !== undefined)
  );
  const scalarFields = sortFields(
    fields.filter((x) => x.children === undefined && x.name !== "__typename")
  );
  const role = depth === 0 ? "tree" : "group";

  return (
    <List role={role}>
      {typenameField && <SystemListItem node={typenameField} index={index} />}
      {[...scalarFields, ...childrenFields].map((node) => (
        <ListItem key={node._id} node={node} depth={depth} />
      ))}
    </List>
  );
};

const sortFields = (nodes: ParsedFieldNode[]) => {
  return nodes.sort((a, b) => {
    if (a.name === "id") {
      return -nodes.length;
    }

    if (b.name === "id") {
      return nodes.length;
    }

    return a.name.localeCompare(b.name);
  });
};

const List = styled.ul`
  margin: 0;
  padding-bottom: 0.3rem;
  padding-top: 0.3rem;
  padding-left: 0.5rem;
  margin-left: 5px;
  border-left: 3px solid ${(p) => p.theme.dark["+3"]};
  list-style: none;
  font-size: 14px;
  color: ${(p) => p.theme.grey["+2"]};

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
