import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Background } from "../components/Background";
import { ExplorerContext } from "../context";

export function Explorer() {
  const {} = useContext(ExplorerContext);

  return (
    <Container>
      <h1>Explorer goes here</h1>
    </Container>
  );
}

const Container = styled(Background)`
  @media (min-aspect-ratio: 1/1) {
    & > * {
      width: 50%;
    }

    & > *:nth-child(2) {
      height: unset;
      max-height: unset;
    }
  }
`;
