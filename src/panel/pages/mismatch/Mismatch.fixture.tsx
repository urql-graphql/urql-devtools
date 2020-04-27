import React, { FC } from "react";
import { DevtoolsContext } from "../../context";
import { Mismatch } from "./Mismatch";

const MockProvider: FC = (props) => (
  <DevtoolsContext.Provider
    {...props}
    value={
      {
        version: { required: "1.0.0", mismatch: true, actual: "0.1.0" },
      } as any
    }
  />
);

export default {
  basic: (
    <MockProvider>
      <Mismatch data-snapshot />
    </MockProvider>
  ),
};
