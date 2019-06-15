import React, { FC } from "react";
import styled from "styled-components";
import { Operation as OperationType } from "urql";
import { Tag } from "../components";
import { OperationEvent } from "../../types";

export const Operation: FC<{ operation: OperationEvent }> = ({ operation }) => {
  return (
    <Container>
      <OperationKey>{operation.data.key}</OperationKey>
      <Tag color={operation.data.operationName}>
        {operation.data.operationName}
      </Tag>
    </Container>
  );
};

const Container = styled.div`
  background: #13252b;
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const OperationKey = styled.p`
  color: #fff;
  opacity: 0.4;
`;
