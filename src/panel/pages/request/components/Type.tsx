import React, { FC } from "react";
import {
  GraphQLType,
  GraphQLNamedType,
  isNonNullType,
  isListType,
} from "graphql";
import styled from "styled-components";

interface TypeProps {
  type?: GraphQLType;
  setType: (type: GraphQLNamedType) => void;
}

export const Type: FC<TypeProps> = ({ setType, type }) => {
  if (!type) return null;

  if (isNonNullType(type)) {
    return (
      <>
        <Type type={type.ofType} setType={setType} />!
      </>
    );
  }

  if (isListType(type)) {
    return (
      <>
        {"["}
        <Type type={type.ofType} setType={setType} />
        {"]"}
      </>
    );
  }

  return (
    <TextButton onClick={() => setType(type)}>
      <span>{type.name}</span>
    </TextButton>
  );
};

const TextButton = styled.button`
  display: inline-block;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme.colors.syntax.base};
  font-size: inherit;
  text-align: left;
  padding: 0;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }
`;
