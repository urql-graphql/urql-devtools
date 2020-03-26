import React, { useEffect, useRef, useMemo, FC } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { ParsedFieldNode } from "../../../context/Explorer/ast";
import { useFlash } from "../hooks";

export const Value: FC<{
  value: ParsedFieldNode["value"];
  expand?: boolean;
  isRoot?: boolean;
}> = ({ value, expand = false, isRoot = true }) => {
  const previousValue = useRef(value);
  const [flashProps, flash] = useFlash();

  // Flash on value change
  useEffect(() => {
    if (isRoot && value !== previousValue.current) {
      flash();
    }

    previousValue.current = value;
  }, [value, flash, isRoot]);

  const content = useMemo(() => {
    const props = { value, expand };

    if (value instanceof Array) {
      return <ArrayValue {...props} value={value as any[]} />;
    }

    if (typeof value === "object" && !!value) {
      return <ObjectValue {...props} value={value as object} />;
    }

    if (typeof value === "string") {
      return <DescribedValue>{`"${value}"`}</DescribedValue>;
    }

    return <DescribedValue>{`${value}`}</DescribedValue>;
  }, [value, expand, isRoot]);

  if (!isRoot) {
    return content;
  }

  return <animated.span style={flashProps}>{content}</animated.span>;
};

const ArrayValue: FC<{ value: any[]; expand: boolean }> = ({
  value,
  expand,
}) => {
  if (value.length === 0) {
    return <>{"[]"}</>;
  }

  if (expand) {
    return (
      <>
        [
        {value.map((v, i) => (
          <span key={i}>
            <Value isRoot={false} value={v} expand={expand} />
            {i === value.length - 1 ? "" : ", "}
          </span>
        ))}
        ]
      </>
    );
  }

  return <DescribedValue>{`Array (${value.length})`}</DescribedValue>;
};

const ObjectValue: FC<{ value: object; expand: boolean }> = ({
  value,
  expand,
}) => {
  const entries = Object.entries(value);

  if (entries.length === 0) {
    return <>{"{}"}</>;
  }

  if (expand) {
    return (
      <Wrapper>
        {"{"}
        {entries.map(([k, v]) => (
          <Container key={k}>
            <Key>{k}</Key>
            <Symbol>:</Symbol>
            <Value isRoot={false} value={v} expand={expand} />
          </Container>
        ))}
        {"}"}
      </Wrapper>
    );
  }

  return <DescribedValue>{`Object`}</DescribedValue>;
};

export const Key = styled.span`
  color: ${(p) => p.theme.pink["0"]};
`;

export const Symbol = styled.span`
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

const DescribedValue = styled.span`
  color: ${(p) => p.theme.grey["+2"]};
`;
