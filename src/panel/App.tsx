import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Operations } from "./operations/Operations";
import { Provider } from "./Context";
import "./App.css";
import { Navigation } from "./Navigation";

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
        <HashRouter>
          <Background>
            <Switch>
              <Route path={"/operations"} component={Operations} />
              <Route path={"/request"} component={() => <div>Hello</div>} />
            </Switch>
          </Background>
          <Navigation />
        </HashRouter>
      </Provider>
    </ThemeProvider>
  </>
);

const Background = styled.div`
  display: flex;
  background-color: ${(props: any) => props.theme.bg};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
