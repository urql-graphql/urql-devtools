import React, { useContext } from "react";
import styled from "styled-components";
import { EventCard } from "./EventCard";
import { Panel } from "./panels";
import { OperationContext } from "../context";
import { Background } from "../components/Background";

export const Events = () => {
  const { operations } = useContext(OperationContext);

  return (
    <Container>
      <EventsList>
        {operations.map((op: any, i: any) => (
          <EventCard key={i} operation={op} />
        ))}
      </EventsList>
      <Panel />
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

const EventsList = styled.div`
  overflow: scroll;
  margin: 10px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  flex-basis: 0;
  flex-grow: 1;
`;
