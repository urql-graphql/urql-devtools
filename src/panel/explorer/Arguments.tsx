import React from "react";
import styled, { css } from "styled-components";
import { FieldNode } from "../context/explorer/ast";
import { SeeMoreIcon } from "./Icons";
import { Value } from "./Value";

interface Props {
  node: FieldNode;
  displayAll: boolean;
}

export function Arguments({ node, displayAll }: Props) {
  if (!node.args) {
    return null;
  }

  let content = [];
  const entries = Object.entries(node.args);

  for (const [key, val] of entries) {
    content.push(
      <ArgWrapper>
        <ArgKey>{key}: </ArgKey>
        <Value node={node} value={val} />
        {content.length === entries.length - 1 ? "" : ","}
      </ArgWrapper>
    );
  }

  if (!displayAll && !(content.length <= 3)) {
    content = [
      ...content.slice(0, 3),
      <ExpandContainer>
        <SeeMore />
      </ExpandContainer>
    ];
  }

  return content ? <ArgsContainer>({content})</ArgsContainer> : null;
}

const SeeMore = styled(SeeMoreIcon)`
  margin: 3px;
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
