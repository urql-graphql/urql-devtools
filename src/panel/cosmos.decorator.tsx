import React, { FC } from "react";
import { MemoryRouter } from "react-router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme, GlobalStyle } from "./theme";
import "./App.css";
import { DevtoolsContext } from "./context";

const FixtureStyle = createGlobalStyle`
  body, html, #root {
    height: 100%;
    margin: 0;
    font-size: 12px;
  }

  #root {
    display: flex;
  }
  
  #root > * {
    top: 0;
  }
`;

export const ThemeDecorator: FC = ({ children, ...props }) => (
  <ThemeProvider {...props} theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export const DevtoolsDecorator: FC = (props) => (
  <DevtoolsContext.Provider
    {...props}
    value={{
      addMessageHandler: () => () => false,
      client: {
        connected: true,
        version: {
          required: "8.8.8",
          mismatch: false,
          actual: "9.9.9",
        },
      },
      sendMessage: () => false,
    }}
  />
);

const Decorator: FC = ({ children }) => (
  <ThemeDecorator>
    <MemoryRouter>
      <DevtoolsDecorator>{children}</DevtoolsDecorator>
    </MemoryRouter>
    <FixtureStyle />
  </ThemeDecorator>
);

export default Decorator;
