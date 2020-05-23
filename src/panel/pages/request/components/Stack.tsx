import React, { FC, useMemo } from "react";
import {
  GraphQLNamedType,
  GraphQLScalarType,
  GraphQLInputObjectType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLInterfaceType,
} from "graphql";
import styled from "styled-components";
import { Fields } from "./Fields";

const getKind = (node: GraphQLNamedType) => {
  if (node instanceof GraphQLScalarType) return "scalar";
  if (node instanceof GraphQLInputObjectType) return "input";
  if (node instanceof GraphQLUnionType) return "union";
  if (node instanceof GraphQLEnumType) return "enum";
  if (node instanceof GraphQLInterfaceType) return "interface";

  return "type";
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

  const kind = useMemo(() => getKind(currentType), [currentType]);

  const hasFields = useMemo(() => {
    return Boolean(
      "getFields" in currentType ||
        "getTypes" in currentType ||
        "getValues" in currentType
    );
  }, [currentType]);

  return (
    <StackWrapper>
      <StackHeading>
        <BackButton onClick={() => setStack([...stack].slice(0, -1))}>
          {(prevType && prevType.name) || "Root"}
        </BackButton>
        <span>
          <TypeKind data-kind={kind}>{kind}</TypeKind>
          <span>{currentType.name}</span>
        </span>
        <div>
          {stack.length > 1 ? (
            <BackButton onClick={() => setStack([])}>Root</BackButton>
          ) : null}
        </div>
      </StackHeading>
      {currentType.description ? (
        <>
          <StackHeading>
            <Title>Description</Title>
          </StackHeading>
          <Description>{currentType.description}</Description>
        </>
      ) : null}
      {hasFields ? (
        <>
          <StackHeading>
            <Title>Fields</Title>
          </StackHeading>
          <Box>
            <Fields node={currentType} setType={setType} />
          </Box>
        </>
      ) : null}
    </StackWrapper>
  );
};

const StackHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(p) => p.theme.light["-5"]};
  background-color: ${(p) => p.theme.dark["+3"]};
  border-top: 1px solid ${(p) => p.theme.dark["+7"]};
  border-bottom: 1px solid ${(p) => p.theme.dark["+7"]};
  font-size: 13px;
  padding: 6px 12px;

  &:first-of-type {
    background-color: ${(p) => p.theme.dark["+5"]};
    border-bottom: none;
  }
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
  background-color: ${(p) => p.theme.dark["+1"]};
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
`;

const TypeKind = styled.code`
  color: ${(p) => p.theme.yellow["+3"]};
  margin-right: 6px;

  &[data-kind="interface"] {
    color: ${(p) => p.theme.red["+3"]};
  }

  &[data-kind="enum"] {
    color: ${(p) => p.theme.purple["+3"]};
  }

  &[data-kind="union"] {
    color: ${(p) => p.theme.blue["+3"]};
  }

  &[data-kind="scalar"] {
    color: ${(p) => p.theme.orange["+3"]};
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
  color: ${(p) => p.theme.light["-9"]};
  font-size: 12px;
  border-radius: 3px;
  margin-right: 6px;
  padding: 4px 6px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: ${(p) => p.theme.grey["-9"]};
    text-decoration: none;
  }
`;

const Title = styled.span`
  color: ${(p) => p.theme.light["-9"]};
  display: inline-block;
  padding: 4px 6px;
`;

const Description = styled.p`
  font-size: 13px;
  color: ${(p) => p.theme.light["-9"]};
  margin: 12px;
`;
