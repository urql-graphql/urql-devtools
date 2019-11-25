import React, { FC } from "react";
import styled, { createGlobalStyle } from "styled-components";
import image from "../../assets/icon.svg";

export const Disconnected: FC = () => (
  <>
    <GlobalStyle />
    <Container>
      <Logo alt={"Urql Eagle"} src={image} />
      <Header>Waiting for exchange</Header>
      <Hint>Make sure {"you're"} using the Urql Devtools exchange!</Hint>
    </Container>
  </>
);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${p => p.theme.dark["0"]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  color: ${p => p.theme.grey["+2"]};
  font-weight: 400;
  margin: 0;
`;

const Hint = styled.p`
  color: ${p => p.theme.grey["-1"]};
`;

const Logo = styled.img`
  width: 150px;
`;
