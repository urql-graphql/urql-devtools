import React, { FC } from "react";
import { Kind, TypeDefinitionNode, GraphQLNamedType } from "graphql";
import styled from "styled-components";
import { Fields } from "./Fields";

const getKind = (node: TypeDefinitionNode | null | undefined) => {
  if (!node) {
    return null;
  }

  switch (node.kind) {
    case Kind.INPUT_OBJECT_TYPE_DEFINITION: {
      return "input";
    }
    case Kind.INTERFACE_TYPE_DEFINITION: {
      return "interface";
    }
    case Kind.UNION_TYPE_DEFINITION: {
      return "union";
    }
    case Kind.ENUM_TYPE_DEFINITION: {
      return "enum";
    }

    default: {
      return "type";
    }
  }
};

interface StackProps {
  stack: GraphQLNamedType[] | [];
  setStack: (type: GraphQLNamedType[] | []) => void;
  setType: (type: GraphQLNamedType) => void;
}

export const Stack: FC<StackProps> = ({ stack, setStack, setType }) => {
  if (!stack.length) {
    return null;
  }

  const currentType = stack[stack.length - 1];
  const prevType = stack[stack.length - 2];

  if (!currentType) {
    return null;
  }

  const kind = getKind(currentType.astNode);

  return (
    <StackWrapper>
      <StackButtons>
        {stack.length > 1 ? (
          <BackButton onClick={() => setStack([])}>Root</BackButton>
        ) : null}
        <BackButton onClick={() => setStack([...stack].slice(0, -1))}>
          {(prevType && prevType.name) || "Root"}
        </BackButton>
      </StackButtons>
      <BorderBox>
        <Title>
          <TypeKind data-kind={kind}>{kind}</TypeKind>
          <span>{currentType.name}</span>
        </Title>
      </BorderBox>
      {currentType.description ? (
        <BorderBox>
          <h4>Description</h4>
          <p>{currentType.description}</p>
          <hr />
        </BorderBox>
      ) : null}
      <BorderBox>
        <Fields node={currentType} setType={setType} />
      </BorderBox>
    </StackWrapper>
  );
};

const Title = styled.h3`
  color: ${(p) => p.theme.light["0"]};
  font-size: 13px;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const StackWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: ${(p) => p.theme.dark["0"]};
`;

const BorderBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(p) => p.theme.dark["+2"]};
  margin-bottom: 12px;
  padding: 12px 0;
`;

const TypeKind = styled.span`
  color: ${(p) => p.theme.yellow["+5"]};
  margin-right: 6px;

  &[data-kind="interface"] {
    color: ${(p) => p.theme.red["+5"]};
  }

  &[data-kind="enum"] {
    color: ${(p) => p.theme.purple["+5"]};
  }

  &[data-kind="union"] {
    color: ${(p) => p.theme.blue["+5"]};
  }
`;

const TextButton = styled.button`
  display: inline-block;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme.orange["+3"]};
  font-size: inherit;
  text-align: left;
  padding: 0;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const BackButton = styled(TextButton)`
  width: max-content;
  color: ${(p) => p.theme.light["0"]};
  border: 1px solid ${(p) => p.theme.dark["+5"]};
  border-radius: 3px;
  margin-right: 6px;
  padding: 6px;
`;

const StackButtons = styled.menu`
  display: flex;
  padding: 0;
`;
