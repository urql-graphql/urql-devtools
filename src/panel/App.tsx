import "./App.css";
import React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Events } from "./events";
import { Explorer } from "./explorer";
import { Navigation } from "./Navigation";
import { Request } from "./request/Request";
import {
  DevtoolsProvider,
  EventsProvider,
  RequestProvider,
  ExplorerContextProvider
} from "./context";

const theme = {
  grey: {
    "-1": "#607e8f",
    "0": "#AAADB1",
    "+1": "#A5B0B7",
    "+2": "#b4bfd1"
  },
  dark: {
    "-3": "#0F151E",
    "-2": "#151D29",
    "-1": "#1C2535",
    "0": "#212D40",
    "+1": "#495362"
  },
  blue: {
    "-2": "#0067A3",
    "-1": "#0084D1",
    "0": "#00A1FF"
  },
  green: {
    "0": "#2DAF7E"
  },
  red: {
    "0": "#EE6352",
    "+1": "#EC8275"
  },
  orange: {
    "0": "#EB9028"
  },
  purple: {
    "0": "#7776d2"
  }
};

export const App = () => {
  return (
    <DevtoolsProvider>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <EventsProvider>
            <Route path="/events" component={Events} />
          </EventsProvider>
          <RequestProvider>
            <Route path="/request" component={Request} />
          </RequestProvider>
          <Route path="/" exact component={() => <Redirect to="/events" />} />
          <ExplorerContextProvider>
            <Route path="/explorer" exact component={Explorer} />
          </ExplorerContextProvider>
          <Navigation />
        </HashRouter>
      </ThemeProvider>
    </DevtoolsProvider>
  );
};
