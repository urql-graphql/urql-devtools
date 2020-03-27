import React from "react";
import { shallow } from "enzyme";
import { Tabs } from "./Tabs";

beforeEach(jest.clearAllMocks);

const props = {
  active: "a",
  options: [
    { label: "first", value: "a" },
    { label: "second", value: "b" },
  ],
  setActive: jest.fn(),
};

describe("on mount", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(<Tabs {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("on tab click", () => {
  it("calls setActive", () => {
    const wrapper = shallow(<Tabs {...props} />);
    wrapper.find("Tab:last-child").simulate("click");
    expect(props.setActive).toBeCalledWith("b");
  });
});
