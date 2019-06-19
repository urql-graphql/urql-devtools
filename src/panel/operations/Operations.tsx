import React, { useState, useEffect, useContext } from "react";
import { OperationEventCard } from "./OperationEventCard";
import { OperationEventPanel } from "./OperationEventPanel";
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
            <OperationEventCard key={i} operation={op} />
          ))}
        </OperationsList>
        <OperationEventPanel />
      </Container>
    </OperationProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;

    & > * {
      width: 50%;
    }

    & > *:nth-child(2) {
      margin: 10px;
      height: unset;
      max-height: unset;
    }
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
