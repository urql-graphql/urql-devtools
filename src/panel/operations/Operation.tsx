import React, { FC, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { OperationEvent } from "../../types";

export const Operation: FC<{ operation: OperationEvent }> = ({ operation }) => {
  const theme = useContext(ThemeContext) as Record<string, string>;

  const colors = {
    subscription: theme.orange,
    teardown: theme.grey,
    mutation: theme.purple,
    query: theme.lightBlue
  };

  console.log(operation);
  return (
    <Container>
      <Indicator
        style={{ backgroundColor: colors[operation.data.operationName] }}
      />
      <OperationName>{capitalize(operation.data.operationName)}</OperationName>
      <OperationTime>{formatDate(operation.timestamp)}</OperationTime>
      <OperationAddInfo>{operation.source || "Placeholder"}</OperationAddInfo>
      <OperationKey>{operation.data.key}</OperationKey>
    </Container>
  );
};

const formatDate = (date: number) => {
  const d = new Date(date);
  const padded = (n: number) => String(n).padStart(2, "0");

  return `${padded(d.getHours())}:${padded(d.getMinutes())}:${padded(
    d.getSeconds()
  )}`;
};

const capitalize = (s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

const OperationName = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  margin: 0;
  margin-bottom: 10px;
  width: 50%;

  @media (min-width: 400px) {
    color: rgba(255, 255, 255, 0.8);
    order: 1;
    font-size: 13px;
    width: auto;
    flex-basis: 4;
  }
`;

const OperationTime = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin: 0;
  width: 50%;

  @media (max-width: 399px) {
    text-align: right;
  }

  @media (min-width: 400px) {
    order: 4;
    font-size: 13px;
    width: auto;
    flex-basis: 4;
  }
`;

const OperationAddInfo = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  width: 50%;

  @media (min-width: 400px) {
    color: rgba(255, 255, 255, 0.8);
    order: 2;
    font-size: 13px;
    width: auto;
    flex-basis: 4;
  }
`;

const OperationKey = styled.p`
  margin: 0;

  @media (max-width: 399px) {
    color: rgba(255, 255, 255, 0.7);
    width: 50%;
    text-align: right;
  }

  @media (min-width: 400px) {
    color: rgba(255, 255, 255, 0.8);
    order: 3;
    font-size: 13px;
    width: auto;
    flex-basis: 1;
  }
`;

const Indicator = styled.div`
  position: absolute;
  left: 0;
  width: 5px;
  top: 0;
  bottom: 0;
`;

const Container = styled.div`
  position: relative;
  background-color: ${(props: any) => props.theme.cardBg};
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  margin: 10px 0;

  @media (max-width: 399px) {
    flex-wrap: wrap;
    align-items: baseline;
  }

  @media (min-width: 400px) {
    align-items: center;
    justify-content: space-between;
  }
`;
