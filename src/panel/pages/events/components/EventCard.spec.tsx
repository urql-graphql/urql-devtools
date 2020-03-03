jest.mock("../../hooks", () => ({
  useThemeContext: jest.fn(),
  useEventsContext: jest.fn()
}));
jest.mock("react-spring");
import * as React from "react";
import { shallow } from "enzyme";
import { mocked } from "ts-jest/utils";
import { useThemeContext, useEventsContext } from "../../../hooks";
import { EventCard } from "./EventCard";

const theme = new Proxy({}, { get: (t, p) => [p] });
const events = {
  selectedEvent: undefined,
  selectEvent: jest.fn(),
  clearSelectedEvent: jest.fn(),
  addFilter: jest.fn()
};

mocked(useThemeContext).mockReturnValue(theme as any);
mocked(useEventsContext).mockReturnValue(events as any);

const event = {
  type: "mutation",
  key: 1234,
  source: "ComponentSource",
  timestamp: 123123,
  panels: [
    { name: "query", data: "data" },
    { name: "variables", data: {} },
    { name: "response", data: {} },
    { name: "meta", data: {} }
  ]
} as const;

describe("on mount", () => {
  describe("active event", () => {
    it("matches snapshot", () => {
      const wrapper = shallow(
        <EventCard event={event} active={true} canFilter={false} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("inactive event", () => {
    it("matches snapshot", () => {
      const wrapper = shallow(
        <EventCard event={event} active={false} canFilter={false} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe("on event click", () => {
  it("calls selectEvent", () => {
    const wrapper = shallow(
      <EventCard event={event} active={false} canFilter={false} />
    );
    wrapper.find("Container").simulate("click", {});
    expect(events.selectEvent).toBeCalledTimes(1);
    expect(events.selectEvent).toBeCalledWith(event);
  });
});
