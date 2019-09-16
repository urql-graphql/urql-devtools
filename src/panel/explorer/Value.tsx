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
          <>{`Array (${value.length})`}</>
        );
      }
    } else if (typeof value === "object" && !!value) {
      const entries = Object.entries(value);
      if (entries.length === 0) {
        return <>{"{}"}</>;
      } else {
        return expandValues ? (
          <Code>
            {"{"}
            {entries.map(([key, value]) => {
              return (
                <>
                  <span>{`${key}: `}</span>
                  <Value value={value} expandValues={expandValues} />
                </>
              );
            })}
            {"}"}
          </Code>
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
      {renderValue(value)}
    </HighlightUpdate>
  );
}

const Code = styled.code`
  white-space: pre;
`;
