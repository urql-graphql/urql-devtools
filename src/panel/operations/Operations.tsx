import React, { useState, useEffect, useContext } from "react";
import { Operation } from "./Operation";
import { OperationDetails } from "./OperationDetails";
import { DevtoolsContext } from "../Context";
import { OperationProvider } from "./OperationContext";
import styled from "styled-components";

export const Operations = () => {
  const { operations } = useContext(DevtoolsContext);

  return (
    <OperationProvider>
      <Container>
        <OperationsList>
          {operations.map((op: any, i: any) => (
            <Operation key={i} operation={op} />
          ))}
        </OperationsList>
        <OperationDetails />
      </Container>
    </OperationProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-width: ${props => props.theme.breakpoints.md.max}) {
    flex-direction: row;
  }
`;

const OperationsList = styled.div`
  overflow: scroll;
  margin: 10px;
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  flex-grow: 1;
`;
