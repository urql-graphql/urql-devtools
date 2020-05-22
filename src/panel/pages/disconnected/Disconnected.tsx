import React, { FC, ComponentProps } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { usePageTelemetry } from "../../context";
import Icon from "../../../assets/icon.svg";

export const Disconnected: FC<ComponentProps<typeof Container>> = (props) => {
  usePageTelemetry("disconnected");

  return (
    <>
      <GlobalStyle />
      <Container {...props}>
        <Logo />
        <Header>Waiting for exchange</Header>
        <Hint>Make sure {"you're"} using the Urql Devtools exchange!</Hint>
      </Container>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.dark["0"]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  color: ${(p) => p.theme.light["0"]};
  font-weight: 400;
  margin: 0;
`;

const Hint = styled.p`
  color: ${(p) => p.theme.grey["+4"]};
`;

const Logo = styled(Icon)`
  width: 150px;

  > * {
    fill: ${(p) => p.theme.light["0"]};
  }
`;
