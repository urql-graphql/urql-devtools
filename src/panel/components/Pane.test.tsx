jest.mock("../hooks", () => ({
  useOrientationWatcher: jest.fn(),
}));

import React from "react";
import { shallow } from "enzyme";
import { useOrientationWatcher } from "../hooks";
import { Pane } from "./Pane";

const useOrientation = (useOrientationWatcher as jest.Mocked<any>);
const addEventListener = jest.spyOn(window, "addEventListener");

beforeEach(jest.clearAllMocks);

describe("on mount", () => {
  describe("on portrait orientation", () => {
    beforeEach(() => {
      useOrientation.mockReturnValue({ isPortrait: true, isLandscape: false });
    });

    it("matches snapshot", () => {
      const wrapper = shallow(<Pane />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("on landscape orientation", () => {
    beforeEach(() => {
      useOrientation.mockReturnValue({
        isPortrait: false,
        isLandscape: true,
      });
    });

    it("matches snapshot", () => {
      const wrapper = shallow(<Pane />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe("on mouse down", () => {
  beforeEach(() => {
    const wrapper = shallow(<Pane />);
    wrapper
      .find("DraggingEdge")
      .simulate("mouseDown", { button: 0, preventDefault: jest.fn() });
  });
  it("listens for mouse up events", () => {
    expect(addEventListener).toBeCalledWith("mouseup", expect.any(Function));
  });

  it("listens for mouse move events", () => {
    expect(addEventListener).toBeCalledWith("mousemove", expect.any(Function));
  });
});
