import React from "react";
import { render } from "react-dom";
import * as wonka from "wonka";
import { Operations } from "./operations/Operations";

(window as any).wonka = wonka;

render(
  <div>
    <p>Hello from react</p>
    <Operations />
  </div>,
  document.getElementById("root")
);
