import "styled-components";

declare module "styled-components" {
  interface Breakpoint {
    min: string;
    max: string;
  }

  type ColorRange = {
    "-3": string;
    "-2": string;
    "-1": string;
    "0": string;
    "+1": string;
    "+2": string;
    "+3": string;
  };

  export interface DefaultTheme {
    grey: Omit<ColorRange, "-3" | "-2" | "-1" | "+1" | "+2" | "+3">;
    dark: Omit<ColorRange, "+2" | "+3">;
    blue: Omit<ColorRange, "-3" | "-2" | "-1" | "+1" | "+2" | "+3">;
    green: Omit<ColorRange, "-3" | "-2" | "-1" | "+1" | "+2" | "+3">;
    red: Omit<ColorRange, "-3" | "-2" | "-1" | "+1" | "+2" | "+3">;
    orange: Omit<ColorRange, "-3" | "-2" | "-1" | "+1" | "+2" | "+3">;
    purple: Omit<ColorRange, "-3" | "-2" | "-1" | "+1" | "+2" | "+3">;
  }
}
