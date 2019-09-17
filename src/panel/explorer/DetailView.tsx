import React from "react";
import styled from "styled-components";
import { FieldNode, NodeMap } from "../context/Explorer/ast";
import { Value, KeyValue } from "./Value";

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

  const gatherChildValues = (values: NodeMap | undefined) => {
    if (!values) {
      return null;
    }

    return Object.entries(values).reduce((acc, [key, value]) => {
      if (value && typeof value === "object") {
        acc[key] = value.value;
      }
      return acc;
    }, Object.create(null));
  };

  const renderChildren = (node: FieldNode) => {
    return (
      <Code>
        {Array.isArray(node.children) ? (
          <Value value={node.children} expandValues={false} />
        ) : (
          <Value value={gatherChildValues(node.children)} expandValues />
        )}
      </Code>
    );
  };

  return (
    <>
      <Title>Name</Title>
      <Name>{node.name}</Name>
      {node.args ? (
        <>
          <Title>Arguments</Title>
          <Code>
            <Value value={node.args} expandValues />
          </Code>
        </>
      ) : null}
      {node.value || node.children ? (
        <>
          <Title>Value</Title>
          {node.children ? (
            renderChildren(node)
          ) : (
            <Value value={node.value} expandValues={false} />
          )}
        </>
      ) : null}
    </>
  );
}

const Title = styled.h3`
  text-transform: uppercase;
  color: ${p => p.theme.heading};
  font-size: 12px;
  font-weight: normal;
`;

const Name = styled.span`
  color: ${p => p.theme.value};
`;

const Code = styled.code`
  display: block;
  color: ${p => p.theme.symbol};
  white-space: pre;

  & > code {
    padding-left: 1rem;
  }
  & > * {
    display: block;
  }
`;

const TextContainer = styled.div`
  padding: 2rem 1rem;
`;

const Text = styled.p`
  text-align: center;
  color: ${p => p.theme.symbol};
`;
