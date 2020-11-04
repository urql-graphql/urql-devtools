import React, { useContext, useState, useCallback, ComponentProps } from "react";
import { GraphQLNamedType } from "graphql";
import styled from "styled-components";
import { RequestContext } from "../../../context";
import { Stack } from "./Stack";
import { Fields } from "./Fields";
import { Search } from "./Search";
import { TopBar } from "./TopBar";
import { Collapsible } from "./Collapsible";

type ActiveIds = 1 | 2 | 3;

export const Schema: React.FC<ComponentProps<typeof FlexContainer>> = (props) => {
  const [activeIds, setActiveIds] = useState<ActiveIds[]>([1]);
  const [stack, setStack] = useState<GraphQLNamedType[]>([]);
  const { schema } = useContext(RequestContext);

  const isActiveId = useCallback((id) => activeIds.includes(id), [activeIds]);

  const handleHeaderClick = useCallback(
    (id) => {
      if (isActiveId(id)) {
        setActiveIds((current) => current.filter((cur) => cur !== id));
      } else {
        setActiveIds((current) => [id, ...current]);
      }
    },
    [setActiveIds, activeIds, isActiveId]
  );

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
    <FlexContainer {...props}>
      <TopBar setStack={setStack} stack={stack}>
        <Search typeMap={schemaTypes} setType={setType} />
      </TopBar>
      <Container>
        {stack.length > 0 ? (
          <Stack
            currentType={stack[stack.length - 1]}
            setType={setType}
            setStack={setStack}
          />
        ) : (
          <Wrapper>
            {schemaTypes.Query ? (
              <Collapsible
                title="Query"
                isActive={isActiveId(1)}
                onClick={() => handleHeaderClick(1)}
              >
                <Fields node={schemaTypes?.Query} setType={setType} />
              </Collapsible>
            ) : null}
            {schemaTypes.Mutation ? (
              <Collapsible
                title="Mutation"
                isActive={isActiveId(2)}
                onClick={() => handleHeaderClick(2)}
              >
                <Fields node={schemaTypes?.Mutation} setType={setType} />
              </Collapsible>
            ) : null}
            {schemaTypes.Subscription ? (
              <Collapsible
                title="Subscription"
                isActive={isActiveId(3)}
                onClick={() => handleHeaderClick(3)}
              >
                <Fields node={schemaTypes?.Subscription} setType={setType} />
              </Collapsible>
            ) : null}
          </Wrapper>
        )}
      </Container>
    </FlexContainer>
  );
};

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Container = styled.div`
  position: relative;
`;

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
  background-color: ${(p) => p.theme.dark["+1"]};
`;
