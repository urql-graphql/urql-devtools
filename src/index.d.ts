import styled, { ThemedStyledInterface } from "styled-components";

declare module "styled-components" {
  type Breakpoint = { min: string; max: string };

  export interface DefaultTheme {
    bg: string;
    cardBg: string;
    purple: string;
    green: string;
    grey: string;
    lightBlue: string;
    orange: string;
    breakpoints: {
      sm: Breakpoint;
      md: Breakpoint;
    };
  }

  // @ts-ignore
  export type StyledInterface = ThemedStyledInterface<DefaultTheme>;
}
