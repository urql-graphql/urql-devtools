import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Operations } from "./operations/Operations";
import { Provider } from "./Context";
import "./App.css";
import { Navigation } from "./Navigation";
import { Request } from "./request/Request";
import { OperationProvider } from "./operations/OperationContext";
import { RequestProvider } from "./request/RequestContext";

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

export const App = () => {
  const routes = [
    {
      path: "/operations",
      component: () => (
        <OperationProvider>
          <Operations />
        </OperationProvider>
      )
    },
    {
      path: "/request",
      component: () => (
        <RequestProvider>
          <Request />
        </RequestProvider>
      )
    }
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider>
          <HashRouter>
            <Switch>
              {routes.map(r => (
                <Route key={r.path} {...r} />
              ))}
            </Switch>
            <Navigation />
          </HashRouter>
        </Provider>
      </ThemeProvider>
    </>
  );
};
