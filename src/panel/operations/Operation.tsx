import React, { FC, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Tag } from "../components";
import { OperationEvent } from "../../types";

export const Operation: FC<{ operation: OperationEvent }> = ({ operation }) => {
  const theme = useContext(ThemeContext);

  const colors = {
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
      <Row>
        <OperationName>
          {capitalize(operation.data.operationName)}
        </OperationName>
        <OperationTime>{formatDate(operation.timestamp)}</OperationTime>
      </Row>
      <Row>
        <OperationAddInfo>{operation.source}</OperationAddInfo>
        <OperationKey>{operation.data.key}</OperationKey>
      </Row>
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
`;

const OperationTime = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin: 0;
`;

const OperationAddInfo = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

const OperationKey = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
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
  flex-direction: column;
  padding: 5px 10px;
  margin: 10px 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;
