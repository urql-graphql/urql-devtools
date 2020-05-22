import "./App.css";
import React, { FC } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {
  Disconnected,
  Explorer,
  Request,
  Timeline,
  Mismatch,
  ErrorBoundary,
} from "./pages";
import { Navigation } from "./components/Navigation";
import { theme, GlobalStyle } from "./theme";
import {
  DevtoolsProvider,
  RequestProvider,
  ExplorerProvider,
  useDevtoolsContext,
  TimelineProvider,
  TelemetryProvider,
} from "./context";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <TelemetryProvider>
        <ErrorBoundary>
          <DevtoolsProvider>
            <AppRoutes />
          </DevtoolsProvider>
        </ErrorBoundary>
      </TelemetryProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export const AppRoutes: FC = () => {
  const { client } = useDevtoolsContext();

  if (!client.connected) {
    return <Disconnected />;
  }

  if (client.version.mismatch) {
    return <Mismatch />;
  }

  return (
    <HashRouter>
      <Navigation
        items={[
          { link: "/explorer", label: "Explorer" },
          { link: "/events", label: "Events" },
          { link: "/request", label: "Request" },
        ]}
      />
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
    </HashRouter>
  );
};
