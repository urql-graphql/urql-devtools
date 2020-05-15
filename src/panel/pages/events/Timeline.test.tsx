import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import Decorator from "../../cosmos.decorator";
import fixtures from "./Timeline.fixture";
jest.mock("../../hooks", () => ({
  useOrientationWatcher: () => ({ isPortrait: true, isLandscape: false }),
}));

beforeAll(() => {
  jest.useFakeTimers();
});

describe("after all events have been dispatched", () => {
  it("matches snapshot", () => {
    const wrapper = mount(<Decorator>{fixtures.dynamic}</Decorator>);
    act(() => {
      jest.runTimersToTime(500);
    });

    expect(wrapper.find("TimelineProvider")).toMatchSnapshot();
  });
});
