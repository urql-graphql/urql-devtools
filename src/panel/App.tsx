import "./App.css";
import React, { FC } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Disconnected, Explorer, Request, Timeline } from "./pages";
import { Navigation } from "./Navigation";
import { theme, GlobalStyle } from "./theme";
import {
  DevtoolsProvider,
  RequestProvider,
  ExplorerProvider,
  useDevtoolsContext,
  TimelineProvider,
} from "./context";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <DevtoolsProvider>
        <AppRoutes />
      </DevtoolsProvider>
      <GlobalStyle />
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
      <TimelineProvider>
        <Route path="/events" component={Timeline} />
      </TimelineProvider>
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
