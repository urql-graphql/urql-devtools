import "./App.css";
import React, { FC } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Events } from "./events";
import { Explorer } from "./explorer";
import { Disconnected } from "./disconnected";
import { Navigation } from "./Navigation";
import { Request } from "./request/Request";
import { theme } from "./theme";

import {
  DevtoolsProvider,
  EventsProvider,
  RequestProvider,
  ExplorerContextProvider,
  useDevtoolsContext
} from "./context";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <DevtoolsProvider>
        <AppRoutes />
      </DevtoolsProvider>
    </ThemeProvider>
  );
};

export const AppRoutes: FC = () => {
  const { clientConnected } = useDevtoolsContext();

  if (!clientConnected) {
    return <Disconnected />;
  }

  return (
    <HashRouter>
      <EventsProvider>
        <Route path="/events" component={Events} />
      </EventsProvider>
      <RequestProvider>
        <Route path="/request" component={Request} />
      </RequestProvider>
      <ExplorerContextProvider>
        <Route path="/explorer" exact component={Explorer} />
      </ExplorerContextProvider>
      <Route path="/" exact component={() => <Redirect to="/explorer" />} />
      <Navigation />
    </HashRouter>
  );
};
