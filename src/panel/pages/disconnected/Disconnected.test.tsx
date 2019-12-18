import React from "react";
import { shallow } from "enzyme";
import { Disconnected } from "./Disconnected";

describe("on mount", () => {
  it("matches snapshot", () => {
    expect(shallow(<Disconnected />)).toMatchSnapshot();
  });
});
