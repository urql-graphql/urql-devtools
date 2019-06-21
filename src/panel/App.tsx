import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Events } from "./events";
import "./App.css";
import { Navigation } from "./Navigation";
import { Request } from "./request/Request";
import {
  DevtoolsProvider,
  OperationProvider,
  RequestProvider
} from "./context";

const theme = {
  bg: "#121212",
  cardBg: "#1e1e1e",
  purple: "#8F629F",
  green: "#649F62",
  grey: "#3E3F3E",
  lightBlue: "#448BB4",
  orange: "orange",
  red: "#b44444",
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

export const App = () => {
  return (
    <DevtoolsProvider>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <OperationProvider>
            <Route path="/events" component={Events} />
          </OperationProvider>
          <RequestProvider>
            <Route path="/request" component={Request} />
          </RequestProvider>
          <Navigation />
        </HashRouter>
      </ThemeProvider>
    </DevtoolsProvider>
  );
};
