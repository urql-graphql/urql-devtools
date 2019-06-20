import React, { useContext } from "react";
import styled from "styled-components";
import { DevtoolsContext } from "../Context";
import { OperationEventCard } from "./OperationEventCard";
import { OperationEventPanel } from "./OperationEventPanel";
import { OperationProvider } from "./OperationContext";

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
  flex-grow: 1;
  margin-bottom: 50px;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;
    margin-bottom: 0;
    margin-left: 40px;

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
