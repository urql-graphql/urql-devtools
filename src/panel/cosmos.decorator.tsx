import React, { FC } from "react";
import { MemoryRouter } from "react-router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import "./App.css";

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    height: 100%;
  }
`;

const ThemeDecorator: FC = props => <ThemeProvider {...props} theme={theme} />;

const Decorator: FC = ({ children }) => (
  <ThemeDecorator>
    <MemoryRouter>{children}</MemoryRouter>
    <GlobalStyle />
  </ThemeDecorator>
);

export default Decorator;
