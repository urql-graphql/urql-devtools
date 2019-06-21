import React from "react";
import styled from "styled-components";
import { Query } from "./Query";
import { Background } from "../components/Background";
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
  .react-codemirror2 {
    display: flex;
    flex-grow: 1;

    .CodeMirror {
      font-size: 12px;
      height: auto;
      width: 100%;
    }
  }
`;
