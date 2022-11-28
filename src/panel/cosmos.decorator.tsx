import "./App.css";
import "./prism";
import React, { FC } from "react";
import { MemoryRouter } from "react-router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useSelect } from "react-cosmos/fixture";
import { lightTheme, darkTheme, GlobalStyle } from "./theme";
import { DevtoolsContext } from "./context";

const FixtureStyle = createGlobalStyle`
  body, html, #root {
    height: 100%;
    margin: 0;
    background: ${(p) => p.theme.colors.canvas.base};
    font-family: "Roboto", "Arial", sans-serif;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-synthesis: none;
  }

  #root {
    display: flex;
  }

  #root > * {
    top: 0;
  }
`;

export const ThemeDecorator: FC = ({ children, ...props }) => {
  const [theme] = useSelect("theme", {
    options: ["dark", "light"],
  });

  return (
    <ThemeProvider {...props} theme={theme === "dark" ? darkTheme : lightTheme}>
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
