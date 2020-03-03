import React from "react";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import "./App.css";

const ThemeDecorator = props => <ThemeProvider {...props} theme={theme} />;

const Decorator = ({ children }) => (
  <ThemeDecorator>
    <MemoryRouter>{children}</MemoryRouter>
  </ThemeDecorator>
);

export default Decorator;
