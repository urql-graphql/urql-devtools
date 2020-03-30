jest.mock("./TimelineEvent", () => ({
  TimelineEvent: () => <>TimelineEvent</> /* eslint-disable-line */,
}));
import React from "react";
import { mount } from "enzyme";
import { ThemeDecorator } from "../../../cosmos.decorator";
// import fixtures from "./TimelineRow.fixture";

const dateNow = jest.spyOn(Date, "now");

beforeAll(() => {
  dateNow.mockReturnValue(3000);
});

// This fixture is variable (dependent on Date.now) so we need to snapshot it in jest
describe("on fetching", () => {
  it("matches snapshot", () => {
    const fixtures = require("./TimelineRow.fixture").default;
    const wrapper = mount(
      <ThemeDecorator>{fixtures["network fetching"]}</ThemeDecorator>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
