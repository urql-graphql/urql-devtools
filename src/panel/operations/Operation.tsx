import React, { FC } from "react";
import styled from "styled-components";
import { Operation as OperationType } from "urql";
import { Tag } from "../components";

export const Operation: FC<{ operation: OperationType }> = ({ operation }) => {
  return (
    <Container>
      <OperationKey>{operation.key}</OperationKey>
      <Tag color={"red"}>{operation.operationName}</Tag>
    </Container>
  );
};

const Container = styled.div`
  background: teal;
  width: auto;
  height: auto;
  display: flex;
`;

const OperationKey = styled.p`
  color: #fff;
  opacity: 0.4;
`;
