import React from "react";
import styled from "styled-components";
import { smMax, mdMin } from "./constants";

export const Headers = () => (
  <Container>
    <OperationName>Operation type</OperationName>
    <OperationTime>Time</OperationTime>
    <OperationAddInfo>Component</OperationAddInfo>
    <OperationKey>Key</OperationKey>
  </Container>
);

const BaseTitle = styled.h3`
  color: rgba(255, 255, 255);
  margin: 0;
  width: 50%;

  @media (min-width: ${mdMin}) {
    font-size: 13px;
  }
`;

const OperationName = styled(BaseTitle)`
  @media (max-width: ${smMax}) {
    margin-bottom: 10px;
  }

  @media (min-width: ${mdMin}) {
    flex-basis: 4;
    order: 1;
    width: 20%;
  }
`;

const OperationTime = styled(BaseTitle)`
  text-align: right;

  @media (min-width: ${mdMin}) {
    font-size: 13px;
    order: 4;
    width: 20%;
  }
`;

const OperationAddInfo = styled(BaseTitle)`
  @media (min-width: ${mdMin}) {
    font-size: 13px;
    order: 2;
    width: 25%;
  }
`;

const OperationKey = styled(BaseTitle)`
  text-align: right;

  @media (max-width: ${smMax}) {
    width: 50%;
  }

  @media (min-width: ${mdMin}) {
    font-size: 13px;
    order: 3;
    text-align: left;
    width: 25%;
  }
`;

const Container = styled.div`
  position: relative;
  background-color: ${props => props.theme.dark[0]};
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;

  @media (max-width: ${smMax}) {
    flex-wrap: wrap;
    align-items: baseline;
  }

  @media (min-width: ${mdMin}) {
    align-items: center;
    justify-content: space-between;
  }
`;
