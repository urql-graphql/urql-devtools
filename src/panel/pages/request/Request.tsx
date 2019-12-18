import React from "react";
import styled from "styled-components";
import { Background } from "../../components/Background";
import { Query } from "./Query";
import { Response } from "./Response";

export const Request = () => {
  return (
    <Container>
      <Query />
      <Response />
    </Container>
  );
};

const Container = styled(Background)`
  & > * {
    height: 50%;

    @media (min-aspect-ratio: 1/1) {
      height: auto;
      width: 50%;
    }
  }

  .react-codemirror2 {
    display: flex;
    flex-grow: 1;
  }

  .CodeMirror {
    font-size: 12px;
    height: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;
