import React from "react";
import styled from "styled-components";
import { FieldNode } from "../context/Explorer/ast";
import { useHighlight, HighlightUpdate } from "./Highlight";

interface Props {
  value: FieldNode["value"];
  expandValues: boolean;
  className?: string;
}

export function Value({ value, expandValues }: Props) {
  const [isAnimating, onAnimationEnd] = useHighlight([value]);

  const renderValue = (value: FieldNode["value"]) => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <>{"[]"}</>;
      } else {
        return expandValues ? (
          <>
            [
            {value.map((val, index) => (
              <span key={index}>
                {renderValue(val)}
                {index === value.length - 1 ? "" : ", "}
              </span>
            ))}
            ]
          </>
        ) : (
          <Val>{`Array (${value.length})`}</Val>
        );
      }
    } else if (typeof value === "object" && !!value) {
      const entries = Object.entries(value);
      if (entries.length === 0) {
        return <>{"{}"}</>;
      } else {
        return expandValues ? (
          <Wrapper>
            {"{"}
            {entries.map(([key, value], i) => {
              return (
                <Container key={i}>
                  <KeyValue
                    keyName={key}
                    value={value}
                    expandValues={expandValues}
                  />
                </Container>
              );
            })}
            {"}"}
          </Wrapper>
        ) : (
          <Val>{`Object`}</Val>
        );
      }
    } else if (typeof value === "string") {
      return <Val>{`"${value}"`}</Val>;
    } else {
      return <Val>{`${value}`}</Val>;
    }
  };

  return (
    <HighlightUpdate onAnimationEnd={onAnimationEnd} isAnimating={isAnimating}>
      {renderValue(value)}
    </HighlightUpdate>
  );
}

interface KeyValProps {
  keyName: string;
  value: FieldNode["value"];
  expandValues: boolean;
}

export function KeyValue({ keyName, value, expandValues }: KeyValProps) {
  return (
    <>
      <Key>{keyName}</Key>
      <Symbol>:</Symbol>
      <Value value={value} expandValues={expandValues} />
    </>
  );
}

const Key = styled.span`
  color: ${p => p.theme.pink["0"]};
`;

const Symbol = styled.span`
  margin-right: 5px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const Container = styled.span``;

const Wrapper = styled.div`
  & > ${Container} {
    display: block;
    padding-left: 1rem;
  }
`;

const Val = styled.span`
  color: ${p => p.theme.grey["+2"]};
`;
