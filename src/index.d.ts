import styled, { ThemedStyledInterface } from "styled-components"; //  eslint-disable-line

declare module "styled-components" {
  interface Breakpoint {
    min: string;
    max: string;
  }

  export interface DefaultTheme {
    bg: string;
    cardBg: string;
    purple: string;
    green: string;
    grey: string;
    lightBlue: string;
    orange: string;
    red: string;
    breakpoints: {
      sm: Breakpoint;
      md: Breakpoint;
    };
  }

  // @ts-ignore
  export type StyledInterface = ThemedStyledInterface<DefaultTheme>;
}
