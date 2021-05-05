import "./App.css";
import "./prism";
import React, { FC, useState } from "react";
import { MemoryRouter } from "react-router";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./theme";
import { DevtoolsContext } from "./context";

const FixtureStyle = createGlobalStyle`
  body, html, #root {
    height: 100%;
    margin: 0;
    font-size: 12px;
    background: ${(p) => p.theme.canvas.base};
  }

  #root {
    display: flex;
  }

  #root > * {
    top: 0;
  }
`;

const ThemeToggle = styled.button`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  right: 0;
  top: initial !important;
  background: #202020;
  color: #fff;
  padding: 10px;
`;

export const ThemeDecorator: FC = ({ children, ...props }) => {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeProvider {...props} theme={theme === "dark" ? darkTheme : lightTheme}>
      <ThemeToggle
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Toggle theme
      </ThemeToggle>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

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
