import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Background } from "../components/Background";
import { ExplorerContext } from "../context";

export function Explorer() {
  const { data } = useContext(ExplorerContext);

  const renderRoot = data => {
    return data.map(el => {
      const keys = Object.keys(el);
      return keys.map(key => (
        <li>
          {el[key].displayName} {el[key].value ? `: ${el[key].value}` : null}
          {el[key].children ? <ul>{renderRoot(el[key].children)}</ul> : null}
        </li>
      ));
    });
  };

  return (
    <Container>
      <List>{renderRoot(data)}</List>
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

const List = styled.ul`
  color: white;
  font-size: 18px;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
