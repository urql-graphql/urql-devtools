import React, { useMemo, FC } from "react";
import styled from "styled-components";
import { ParsedFieldNode } from "../../../context/Explorer/ast";
import { Key, Value } from "./Value";
import { SeeMoreIcon } from "./Icons";

export const Arguments: FC<{
  args: ParsedFieldNode["args"];
  displayAll: boolean;
}> = ({ args, displayAll }) => {
  if (!args) {
    return null;
  }

  const content = useMemo(() => {
    const entries = Object.entries(args);

    const argElements = entries.map(([key, value], index) => (
      <ArgWrapper key={key}>
        <GraphQLArgument argument={{ key, value }} />
        {index === entries.length && ","}
      </ArgWrapper>
    ));

    if (displayAll || argElements.length <= 3) {
      return argElements;
    }

    return (
      <>
        {argElements.slice(0, 3)}
        <ExpandContainer key="last">
          <SeeMore />
        </ExpandContainer>
      </>
    );
  }, [args]);

  return <ArgsContainer>({content})</ArgsContainer>;
};

const GraphQLArgument: FC<{ argument: { key: string; value: any } }> = ({
  argument: { key, value },
}) => {
  if (Array.isArray(value)) {
    return (
      <>
        <ArgKey>{key}</ArgKey>
        <Symbol>{`:`}</Symbol>
        <IconContainer>
          {"["}
          <SeeMore />
          {"]"}
        </IconContainer>
      </>
    );
  }

  if (value && typeof value === "object") {
    return (
      <>
        <ArgKey>{key}</ArgKey>
        <Symbol>{`:`}</Symbol>
        <IconContainer>
          {"{"}
          <SeeMore />
          {"}"}
        </IconContainer>
      </>
    );
  }

  // todo
  return (
    <>
      <Key>{key}</Key>
      <Symbol>{`:`}</Symbol>
      <Value value={value} expand={false} />
    </>
  );
};

const ArgsContainer = styled.div`
  display: inline-flex;
  max-width: 400px;
  flex-wrap: wrap;
`;

const ArgKey = styled.span`
  color: ${(p) => p.theme.grey["+2"]};
`;

const ArgWrapper = styled.span`
  margin-right: 5px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const IconContainer = styled.div`
  display: inline-flex;
  align-items: flex-end;
  color: ${(p) => p.theme.grey["-1"]};
  font-size: 14px;
  cursor: pointer;
`;

const ExpandContainer = styled(IconContainer)`
  margin: 5px 5px 0;
`;

const SeeMore = styled(SeeMoreIcon)`
  margin: 3px;
`;

const Symbol = styled.span`
  color: ${(p) => p.theme.grey["-1"]};
  margin-right: 5px;
`;
