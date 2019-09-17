import styled from "styled-components";
import { darken, lighten, opacify } from "polished";

export const theme = {
  grey: {
    "-1": "#607e8f",
    "0": "#AAADB1",
    "+1": "#A5B0B7",
    "+2": "#b4bfd1"
  },
  dark: {
    "-3": "#0F151E",
    "-2": "#151D29",
    "-1": "#1C2535",
    "0": "#212D40",
    "+1": "#495362"
  },
  blue: {
    "-2": "#0067A3",
    "-1": "#0084D1",
    "0": "#00A1FF"
  },
  green: {
    "0": "#2DAF7E"
  },
  red: {
    "0": "#EE6352",
    "+1": "#EC8275"
  },
  orange: {
    "0": "#EB9028"
  },
  purple: {
    "0": "#7776d2"
  },
  bgPrimary: "#1C1E26",
  bgSecondary: "rgba(0, 0, 0, 0.26)",
  heading: "#8899E3",
  value: "#b4bfd1",
  key: "#B877DB",
  symbol: "#607E90",
  border: "#CAE3F212",
  active: "#EC3E66"
};
