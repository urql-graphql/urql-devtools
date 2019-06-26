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
  grey: {
    "0": "#AAADB1"
  },
  dark: {
    "-3": "#0F151E",
    "-2": "#151D29",
    "-1": "#1C2535",
    "0": "#212D40",
    "+1": "#495362"
  },
  blue: {
    "0": "#00A1FF"
  },
  green: {
    "0": "#2DAF7E"
  },
  red: {
    "0": "#EE6352"
  },
  orange: {
    "0": "#EB9028"
  },
  purple: {
    "0": "#7469F4"
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
