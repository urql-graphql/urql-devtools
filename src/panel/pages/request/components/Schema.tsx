import React, { useContext, useState, useCallback } from "react";
import { GraphQLNamedType } from "graphql";
import styled from "styled-components";
import { RequestContext } from "../../../context";
import { Arrow } from "../../../components";
import { Stack } from "./Stack";
import { Fields } from "./Fields";

type ActiveIds = 1 | 2 | 3;

export const Schema = () => {
  const [activeIds, setActiveIds] = useState<ActiveIds[]>([1]);
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

  const schemaTypes = schema.getTypeMap();

  const setType = (type: GraphQLNamedType) => {
    setStack((stack) => [...stack, type]);
  };

  return (
    <>
      {stack.length > 0 ? (
        <Stack stack={stack} setType={setType} setStack={setStack} />
      ) : (
        <Wrapper>
          {schemaTypes.Query ? (
            <>
              <CollapsibleHeader
                onClick={() => handleHeaderClick(1)}
                aria-expanded={isActiveId(1)}
              >
                <Arrow data-active={isActiveId(1)} />
                <span>Query</span>
              </CollapsibleHeader>
              {isActiveId(1) && (
                <Fields node={schemaTypes?.Query} setType={setType} />
              )}
            </>
          ) : null}
          {schemaTypes.Mutation ? (
            <>
              <CollapsibleHeader
                onClick={() => handleHeaderClick(2)}
                aria-expanded={isActiveId(2)}
              >
                <Arrow data-active={isActiveId(2)} />
                <span>Mutation</span>
              </CollapsibleHeader>
              {isActiveId(2) && (
                <Fields node={schemaTypes?.Mutation} setType={setType} />
              )}
            </>
          ) : null}
          {schemaTypes.Subscription ? (
            <>
              <CollapsibleHeader
                onClick={() => handleHeaderClick(3)}
                aria-expanded={isActiveId(3)}
              >
                <Arrow data-active={isActiveId(3)} />
                <span>Subscription</span>
              </CollapsibleHeader>
              {isActiveId(3) && (
                <Fields node={schemaTypes?.Subscription} setType={setType} />
              )}
            </>
          ) : null}
        </Wrapper>
      )}
    </>
  );
};

const CollapsibleHeader = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${(p) => p.theme.light["-5"]};
  background-color: ${(p) => p.theme.dark["+3"]};
  border: 1px solid ${(p) => p.theme.dark["+7"]};
  font-size: 13px;
  padding: 6px;

  &:hover {
    background-color: ${(p) => p.theme.dark["+5"]};
  }
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
