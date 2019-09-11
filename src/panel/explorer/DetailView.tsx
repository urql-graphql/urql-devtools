import React, { useState, useContext, useMemo } from "react";
import styled from "styled-components";
import { FieldNode } from "../context/explorer/ast";

interface Props {
  node: FieldNode | null;
}

export function DetailView({ node }: Props) {
  if (!node) {
    return (
      <TextContainer>
        <Text>Select a node to see more information...</Text>
      </TextContainer>
    );
  }

  return (
    <>
      <Title>Arguments</Title>
      <Code>{JSON.stringify(node.args, null, 2)}</Code>
      {node.value ? (
        <>
          <Title>Value</Title>
          <Code>{JSON.stringify(node.value, null, 2)}</Code>
        </>
      ) : null}
      {node.children ? (
        <>
          <Title>Children</Title>
          <Code>{JSON.stringify(node.children, null, 2)}</Code>
        </>
      ) : null}
    </>
  );
}

const Title = styled.h3`
  text-transform: uppercase;
  color: #b4bfd170;
  font-size: 12px;
  font-weight: normal;
`;

const Code = styled.code`
  color: #b4bfd1;
  white-space: pre;
`;

const TextContainer = styled.div`
  padding: 2rem 1rem;
`;

const Text = styled.p`
  text-align: center;
  color: #b4bfd170;
`;

const Name = styled.span`
  color: ${p => p.theme.grey["+2"]};
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
