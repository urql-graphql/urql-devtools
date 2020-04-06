import "styled-components";
import { theme } from "./panel/theme";

type Theme = typeof theme;

declare module "styled-components" {
  /* eslint-disable-next-line */
  // export interface DefaultTheme extends Theme {}
  export interface DefaultTheme {
    [key: string]: {
      [key: string]: string;
    };
  }
}
