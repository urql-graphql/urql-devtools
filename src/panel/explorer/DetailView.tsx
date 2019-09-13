import React from "react";
import styled from "styled-components";
import { FieldNode } from "../context/explorer/ast";
import { Value } from "./Value";

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

  const renderValues = (values: { [key: string]: any }) => {
    if (!values) {
      return null;
    }

    return Object.entries(values).map(node => {
      const [key, value] = node;

      if (!!value && typeof value === "object") {
        if (value["value"]) {
          return (
            <Code>
              <span>{`${key}: `}</span>
              <Value value={value["value"]} expandValues />
            </Code>
          );
        } else if (Array.isArray(value["children"])) {
          return (
            <Code>
              <span>{`${key}: `}</span>
              <Value value={value["value"]} expandValues />
            </Code>
          );
        }
      } else {
        return (
          <Code>
            <span>{`${key}: `}</span>
            <Value value={value} expandValues />
          </Code>
        );
      }
    });
  };

  const renderChildren = (node: FieldNode) => {
    if (Array.isArray(node.children)) {
      return (
        <Code>
          <Value value={node.children} expandValues={false} />
        </Code>
      );
    } else if (node.children) {
      return (
        <>
          <Code>{"{"}</Code>
          <Code>{renderValues(node.children)}</Code>
          <Code>{"}"}</Code>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Title>Name</Title>
      <Code>{node.name}</Code>
      {node.args ? (
        <>
          <Title>Arguments</Title>
          <Code>{JSON.stringify(node.args, null, 2)}</Code>
        </>
      ) : null}
      {node.value ? (
        <>
          <Title>Value</Title>
          <Code>{renderValues(node)}</Code>
        </>
      ) : null}
      {node.children ? (
        <>
          <Title>Children</Title>
          {renderChildren(node)}
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
  display: block;
  color: #b4bfd1;
  white-space: pre;

  & > code {
    padding-left: 1rem;
  }
`;

const TextContainer = styled.div`
  padding: 2rem 1rem;
`;

const Text = styled.p`
  text-align: center;
  color: #b4bfd170;
`;
