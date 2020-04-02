import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { ThemeDecorator } from "../../../cosmos.decorator";
import fixtures from "./Settings.fixture";

beforeEach(jest.clearAllMocks);

describe("on icon click", () => {
  it("expands content", () => {
    const wrapper = mount(<ThemeDecorator>{fixtures.settings}</ThemeDecorator>);
    wrapper.find("svg").simulate("click");
    wrapper.update();
    expect(wrapper.find("Content").props()).toHaveProperty("collapsed", false);
  });
});

describe("on filter click", () => {
  it("enables filters", () => {
    const wrapper = mount(<ThemeDecorator>{fixtures.filter}</ThemeDecorator>);
    act(() => {
      wrapper
        .find("FilterButton[aria-selected=false]")
        .forEach((b) => b.simulate("click"));
    });

    act(() => {
      wrapper.update();
    });

    wrapper
      .find("FilterButton")
      .forEach((b) => expect(b.props()).toHaveProperty("aria-selected", true));
  });

  it("disables filters", () => {
    const wrapper = mount(<ThemeDecorator>{fixtures.filter}</ThemeDecorator>);
    act(() => {
      wrapper
        .find("FilterButton[aria-selected=true]")
        .forEach((b) => b.simulate("click"));
    });

    act(() => {
      wrapper.update();
    });

    wrapper
      .find("FilterButton")
      .forEach((b) => expect(b.props()).toHaveProperty("aria-selected", false));
  });
});
