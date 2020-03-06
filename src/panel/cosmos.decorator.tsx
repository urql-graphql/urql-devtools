import React, { FC } from "react";
import { MemoryRouter } from "react-router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import "./App.css";
import { DevtoolsContext } from "./context";

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    height: 100%;
    margin: 0;
  }

  #root {
    display: flex;
  }
  
  #root > * {
    top: 0;
  }
`;

const ThemeDecorator: FC = props => <ThemeProvider {...props} theme={theme} />;

const DevtoolsDecorator: FC = props => (
  <DevtoolsContext.Provider
    {...props}
    value={{
      addMessageHandler: () => () => false,
      clientConnected: true,
      sendMessage: () => false
    }}
  />
);

const Decorator: FC = ({ children }) => (
  <ThemeDecorator>
    <MemoryRouter>
      <DevtoolsDecorator>{children}</DevtoolsDecorator>
    </MemoryRouter>
    <GlobalStyle />
  </ThemeDecorator>
);

export default Decorator;
