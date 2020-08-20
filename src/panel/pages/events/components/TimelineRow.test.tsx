jest.mock("./TimelineEvent", () => ({
  TimelineEvent: () => <>TimelineEvent</> /* eslint-disable-line */,
}));
import React from "react";
import { mount } from "enzyme";
import { ThemeDecorator } from "../../../cosmos.decorator";

const dateNow = jest.spyOn(Date, "now");

beforeAll(() => {
  dateNow.mockReturnValue(3000);
});

// This fixture is variable (dependent on Date.now) so we need to snapshot it in jest
describe("on fetching", () => {
  describe("network duration", () => {
    it("is fetching", async () => {
      const { default: fixtures } = await import("./TimelineRow.fixture");
      dateNow.mockReturnValue(5000);
      const wrapper = mount(
        <ThemeDecorator>{fixtures["network fetching"]}</ThemeDecorator>
      );

      const duration = wrapper.find("NetworkDuration");
      expect(duration.props()).toHaveProperty("data-state", "fetching");
    });

    it("grows to current time", async () => {
      const { default: fixtures } = await import("./TimelineRow.fixture");
      const wrapper = mount(
        <ThemeDecorator>{fixtures["network fetching"]}</ThemeDecorator>
      );

      const duration = wrapper.find("NetworkDuration");
      expect(duration.props().style).toMatchInlineSnapshot(`
        Object {
          "bottom": 0,
          "left": 0,
          "position": "absolute",
          "right": 280,
        }
      `);
    });
  });
});
