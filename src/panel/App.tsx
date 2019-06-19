import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Operations } from "./operations/Operations";
import { Provider } from "./Context";

const theme = {
  bg: "#121212",
  cardBg: "#1e1e1e",
  purple: "#8F629F",
  green: "#649F62",
  grey: "#3E3F3E",
  lightBlue: "#448BB4",
  orange: "orange",
  breakpoints: {
    sm: {
      max: "399px",
      min: "0px"
    },
    md: {
      max: "700px",
      min: "400px"
    }
  }
};

export const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <Provider>
        <Background>
          <Operations />
        </Background>
      </Provider>
    </ThemeProvider>
    {GlobalStyle}
  </>
);

const Background = styled.div`
  background-color: ${(props: any) => props.theme.bg};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const GlobalStyle = (
  <style
    children={`
@import 'codemirror/lib/codemirror.css';
@import 'codemirror/theme/material.css';
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');
body {
  font-family: 'Roboto Mono', monospace;
}
  `}
  />
);
