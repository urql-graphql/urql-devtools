import React, { useContext, useState } from "react";
import { GraphQLNamedType } from "graphql";
import styled from "styled-components";
import { RequestContext } from "../../../context";
import { Stack } from "./Stack";
import { Fields } from "./Fields";

export const Schema = () => {
  const [stack, setStack] = useState<GraphQLNamedType[]>([]);
  const { schema } = useContext(RequestContext);

  if (schema === undefined) {
    return (
      <Wrapper>
        <Title>Loading...</Title>
      </Wrapper>
    );
  }

  if (schema === null) {
    return (
      <Wrapper>
        <Title>
          Something went wrong while fetching your schema, make sure
          introspection is enabled in your settings
        </Title>
      </Wrapper>
    );
  }

  const schemaTypes = schema.getTypeMap();

  const setType = (type: GraphQLNamedType) => {
    setStack((stack) => [...stack, type]);
  };

  return (
    <Wrapper>
      {schemaTypes.Query ? (
        <>
          <Title>Query</Title>
          <FieldsContainer>
            <Fields node={schemaTypes?.Query} setType={setType} />
          </FieldsContainer>
        </>
      ) : null}
      {schemaTypes.Mutation ? (
        <>
          <Title>Mutation</Title>
          <FieldsContainer>
            <Fields node={schemaTypes?.Mutation} setType={setType} />
          </FieldsContainer>
        </>
      ) : null}
      {schemaTypes.Subscription ? (
        <>
          <Title>Subscription</Title>
          <FieldsContainer>
            <Fields node={schemaTypes?.Subscription} setType={setType} />
          </FieldsContainer>
        </>
      ) : null}
      <Stack stack={stack} setType={setType} setStack={setStack} />
    </Wrapper>
  );
};

const Title = styled.h3`
  color: ${(p) => p.theme.light["0"]};
  font-size: 13px;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  color: ${(p) => p.theme.light["-3"]};
  padding: 30px;
`;

const FieldsContainer = styled.div`
  padding: 8px;
`;
