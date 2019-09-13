import React from "react";
import styled from "styled-components";
import { FieldNode } from "../context/explorer/ast";
import { useHighlight, HighlightUpdate } from "./Highlight";

interface Props {
  value: FieldNode["value"];
  expandValues: boolean;
}

export function Value({ value, expandValues }: Props) {
  const [isAnimating, onAnimationEnd] = useHighlight([value]);

  const renderValue = () => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <>{"[]"}</>;
      } else {
        return expandValues ? (
          <Code>{JSON.stringify(value, null, 2)}</Code>
        ) : (
          <>{`Array (${value.length})`}</>
        );
      }
    } else if (typeof value === "object" && !!value) {
      if (Object.keys(value).length === 0) {
        return <>{"{}"}</>;
      } else {
        return expandValues ? (
          <Code>{JSON.stringify(value, null, 2)}</Code>
        ) : (
          <>{`Object`}</>
        );
      }
    } else if (typeof value === "string") {
      return <>{`"${value}"`}</>;
    } else {
      return <>{`${value}`}</>;
    }
  };

  return (
    <HighlightUpdate onAnimationEnd={onAnimationEnd} isAnimating={isAnimating}>
      {renderValue()}
    </HighlightUpdate>
  );
}

const Code = styled.code`
  white-space: pre;
`;
