import "./App.css";
import React, { FC } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Disconnected, Events, Explorer, Request } from "./pages";
import { Navigation } from "./Navigation";
import { theme } from "./theme";

import {
  DevtoolsProvider,
  EventsProvider,
  RequestProvider,
  ExplorerProvider,
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
      <ExplorerProvider>
        <Route path="/explorer" exact component={Explorer} />
      </ExplorerProvider>
      <Route path="/" exact component={() => <Redirect to="/explorer" />} />
      <Navigation />
    </HashRouter>
  );
};
