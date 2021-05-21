import React, { FC, useMemo, useCallback, useState } from "react";
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
import { Collapsible } from "./Collapsible";

const getKind = (node: GraphQLNamedType) => {
  if (node instanceof GraphQLScalarType) return "scalar";
  if (node instanceof GraphQLInputObjectType) return "input";
  if (node instanceof GraphQLUnionType) return "union";
  if (node instanceof GraphQLEnumType) return "enum";
  if (node instanceof GraphQLInterfaceType) return "interface";

  return "type";
};

interface StackProps {
  currentType?: GraphQLNamedType;
  setStack: (type: GraphQLNamedType[] | []) => void;
  setType: (type: GraphQLNamedType) => void;
}

type ActiveIds = 1 | 2;

export const Stack: FC<StackProps> = ({ currentType, setType }) => {
  const [activeIds, setActiveIds] = useState<ActiveIds[]>([1, 2]);

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

  const isActiveId = useCallback((id) => activeIds.includes(id), [activeIds]);

  const handleOnClick = useCallback(
    (id) => {
      if (isActiveId(id)) {
        setActiveIds((current) => current.filter((cur) => cur !== id));
      } else {
        setActiveIds((current) => [id, ...current]);
      }
    },
    [setActiveIds, activeIds, isActiveId]
  );

  return (
    <StackWrapper>
      <TypeNameWrapper>
        <TypeKind data-kind={kind}>{kind}</TypeKind>
        <span>{currentType.name}</span>
      </TypeNameWrapper>
      {currentType.description ? (
        <Collapsible
          title="Description"
          onClick={() => handleOnClick(1)}
          isActive={isActiveId(1)}
        >
          <Description>{currentType.description}</Description>
        </Collapsible>
      ) : null}
      {hasFields ? (
        <Collapsible
          title="Fields"
          onClick={() => handleOnClick(2)}
          isActive={isActiveId(2)}
        >
          <Box>
            <Fields node={currentType} setType={setType} />
          </Box>
        </Collapsible>
      ) : null}
    </StackWrapper>
  );
};

const StackWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const TypeKind = styled.code`
  color: ${(p) => p.theme.colors.syntax.base};
  margin-right: ${(p) => p.theme.space[2]};

  &[data-kind="interface"] {
    color: ${(p) => p.theme.colors.syntax.interface};
  }

  &[data-kind="enum"] {
    color: ${(p) => p.theme.colors.syntax.enum};
  }

  &[data-kind="union"] {
    color: ${(p) => p.theme.colors.syntax.union};
  }

  &[data-kind="scalar"] {
    color: ${(p) => p.theme.colors.syntax.scalar};
  }

  &[data-kind="input"] {
    color: ${(p) => p.theme.colors.syntax.input};
  }

  &[data-kind="type"] {
    color: ${(p) => p.theme.colors.syntax.type};
  }
`;

const Description = styled.p`
  font-size: ${(p) => p.theme.fontSizes.body.l};
  line-height: ${(p) => p.theme.lineHeights.body.l};
  color: ${(p) => p.theme.colors.textDimmed.base};
  padding: ${(p) => p.theme.space[3]};
  margin: 0;
`;

const TypeNameWrapper = styled.div`
  font-size: ${(p) => p.theme.fontSizes.body.l};
  line-height: ${(p) => p.theme.lineHeights.body.l};
  color: ${(p) => p.theme.colors.text.base};
  padding: ${(p) => p.theme.space[3]};
`;
