import React, { useState, useEffect, useContext } from "react";
import { Operation as OperationType } from "urql";
import { Operation } from "./Operation";
import { DevtoolsContext } from "../Context";
import styled from "styled-components";

export const Operations = () => {
  const { operations } = useContext(DevtoolsContext);

  return (
    <Container>
      {operations.map((op: any, i: any) => (
        <Operation key={i} operation={op} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin: 10px;
`;
