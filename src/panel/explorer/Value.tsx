import React from "react";
import styled from "styled-components";
import { FieldNode } from "../context/explorer/ast";
import { SeeMoreIcon } from "./Icons";

interface Props {
  node: FieldNode;
  value: FieldNode["value"];
}

export function Value({ node, value }: Props) {
  if (Array.isArray(value) || Array.isArray(node.children)) {
    if (node.children && node.children.length === 0) {
      return <>{"[]"}</>;
    } else {
      return (
        <IconContainer>
          {`[`}
          <SeeMore />
          {`]`}
        </IconContainer>
      );
    }
  } else if (typeof value === "object" && !!value) {
    if (Object.keys(value).length === 0) {
      return <>{"{}"}</>;
    } else {
      return (
        <IconContainer>
          {`{`}
          <SeeMore />
          {`}`}
        </IconContainer>
      );
    }
  } else if (typeof value === "string") {
    return <>{`"${value}"`}</>;
  } else {
    return <>{`${value}`}</>;
  }
}

const IconContainer = styled.div`
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

const SeeMore = styled(SeeMoreIcon)`
  margin: 3px;
`;
