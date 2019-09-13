import React from "react";
import styled from "styled-components";
import { FieldNode } from "../context/explorer/ast";
import { SeeMoreIcon } from "./Icons";
import { Value } from "./Value";

interface Props {
  args: FieldNode["args"];
  displayAll: boolean;
}

export function Arguments({ args, displayAll }: Props) {
  if (!args) {
    return null;
  }

  let content = [];
  const entries = Object.entries(args);

  for (const [key, val] of entries) {
    if (Array.isArray(val)) {
      content.push(
        <ArgWrapper key={key}>
          <ArgKey>{key}: </ArgKey>
          <IconContainer>
            {"["}
            <SeeMore />
            {"]"}
          </IconContainer>
          {content.length === entries.length - 1 ? "" : ","}
        </ArgWrapper>
      );
    } else if (val && typeof val === "object") {
      content.push(
        <ArgWrapper>
          <ArgKey>{key}: </ArgKey>
          <IconContainer>
            {"{"}
            <SeeMore />
            {"}"}
          </IconContainer>
          {content.length === entries.length - 1 ? "" : ","}
        </ArgWrapper>
      );
    } else {
      content.push(
        <ArgWrapper key={key}>
          <ArgKey>{key}: </ArgKey>
          <Value value={val} expandValues={false} />
          {content.length === entries.length - 1 ? "" : ","}
        </ArgWrapper>
      );
    }
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

const ExpandContainer = styled(IconContainer)`
  margin: 5px 5px 0;
`;

const SeeMore = styled(SeeMoreIcon)`
  margin: 3px;
`;
