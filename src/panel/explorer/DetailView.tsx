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
          <Code>{node.value}</Code>
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
