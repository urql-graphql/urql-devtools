import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { OperationEventCard } from "./OperationEventCard";
import { OperationEventPanel } from "./OperationEventPanel";
import { OperationContext } from "../context";
import { Background } from "../components/Background";

export const Operations = () => {
  console.log(useContext(OperationContext));
  const { operations } = useContext(OperationContext);

  console.log(operations);

  return (
    <Container>
      <OperationsList>
        {operations.map((op: any, i: any) => (
          <OperationEventCard key={i} operation={op} />
        ))}
      </OperationsList>
      <OperationEventPanel />
    </Container>
  );
};

const Container = styled(Background)`
  @media (min-aspect-ratio: 1/1) {
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
  flex-direction: column-reverse;
  justify-content: flex-end;
  flex-basis: 0;
  flex-grow: 1;
`;
