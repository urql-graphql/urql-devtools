import { useContext } from "react";
import { ThemeContext } from "styled-components";

export const useThemeContext = () => useContext(ThemeContext);
