import React, { FC, useContext, useCallback } from "react";
import styled, { ThemeContext } from "styled-components";
import { OperationEvent } from "../../types";
import { OperationContext } from "../context";

/** Shows basic information about an operation. */
export const EventCard: FC<{ operation: OperationEvent }> = ({ operation }) => {
  const theme = useContext(ThemeContext);
  const {
    selectedOperation,
    selectOperation,
    clearSelectedOperation
  } = useContext(OperationContext);

  const handleContainerClick = useCallback(() => {
    selectedOperation === operation
      ? clearSelectedOperation()
      : selectOperation(operation);
  }, [operation, selectedOperation, selectOperation]);

  const colors = {
    subscription: theme.orange,
    teardown: theme.grey,
    mutation: theme.purple,
    query: theme.lightBlue,
    response: theme.green,
    error: theme.red
  };

  const name =
    operation.type === "operation"
      ? operation.data.operationName
      : operation.type;
  const date = formatDate(operation.timestamp);
  const info =
    operation.type === "operation"
      ? operation.data.context.devtools.source
      : operation.data.operation.context.devtools.source;
  const key =
    operation.type === "operation"
      ? operation.data.key
      : operation.data.operation.key;

  return (
    <Container onClick={handleContainerClick}>
      <Indicator style={{ backgroundColor: colors[name] }} />
      <OperationName>{capitalize(name)}</OperationName>
      <OperationTime>{date}</OperationTime>
      <OperationAddInfo>{info || "Unknown"}</OperationAddInfo>
      <OperationKey>{key}</OperationKey>
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
  width: 50%;

  @media (max-width: ${props => props.theme.breakpoints.sm.max}) {
    margin-bottom: 10px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md.min}) {
    color: rgba(255, 255, 255, 0.8);
    order: 1;
    font-size: 13px;
    width: auto;
    flex-basis: 4;
    width: 20%;
  }
`;

const OperationTime = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin: 0;
  width: 50%;
  text-align: right;

  @media (min-width: ${props => props.theme.breakpoints.md.min}) {
    order: 4;
    font-size: 13px;
    width: 20%;
  }
`;

const OperationAddInfo = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  width: 50%;

  @media (min-width: ${props => props.theme.breakpoints.md.min}) {
    color: rgba(255, 255, 255, 0.8);
    order: 2;
    font-size: 13px;
    width: 25%;
  }
`;

const OperationKey = styled.p`
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm.max}) {
    color: rgba(255, 255, 255, 0.7);
    width: 50%;
    text-align: right;
  }

  @media (min-width: ${props => props.theme.breakpoints.md.min}) {
    color: rgba(255, 255, 255, 0.8);
    order: 3;
    font-size: 13px;
    width: 25%;
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
  background-color: ${props => props.theme.cardBg};
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  margin: 10px 0;

  @media (max-width: ${props => props.theme.breakpoints.sm.max}) {
    flex-wrap: wrap;
    align-items: baseline;
  }

  @media (min-width: ${props => props.theme.breakpoints.md.min}) {
    align-items: center;
    justify-content: space-between;
  }
`;
