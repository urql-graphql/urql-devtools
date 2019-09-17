import React from "react";
import styled from "styled-components";
import { mdMin } from "./constants";

export const Headers = () => (
  <Container>
    <OperationName>Operation type</OperationName>
    <OperationTime>Time</OperationTime>
    <OperationAddInfo>Component</OperationAddInfo>
    <OperationKey>Key</OperationKey>
  </Container>
);

const BaseTitle = styled.h3`
  color: ${p => p.theme.grey["+2"]};
  font-size: 13px;
  margin: 0;
  width: 50%;
`;

const OperationName = styled(BaseTitle)`
  flex-basis: 4;
  order: 1;
  width: 20%;
`;

const OperationTime = styled(BaseTitle)`
  font-size: 13px;
  order: 4;
  text-align: right;
  width: 20%;
`;

const OperationAddInfo = styled(BaseTitle)`
  font-size: 13px;
  order: 2;
  width: 25%;
`;

const OperationKey = styled(BaseTitle)`
  font-size: 13px;
  order: 3;
  text-align: left;
  width: 25%;
`;

const Container = styled.div`
  position: relative;
  background-color: ${props => props.theme.dark[0]};
  width: auto;
  height: auto;
  padding: 10px 15px;
  display: none;

  @media (min-width: ${mdMin}) {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
