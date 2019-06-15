import React from "react";
import { render } from "react-dom";
import * as wonka from "wonka";
import { Operations } from "./operations/Operations";
import { Provider } from "./Context";

(window as any).wonka = wonka;

render(
  <Provider>
    <div>
      <p>Hello from react</p>
      <Operations />
    </div>
  </Provider>,
  document.getElementById("root")
);
