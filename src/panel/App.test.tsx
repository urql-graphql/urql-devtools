jest.mock("./context/Devtools.tsx", () => {
  return {
    ...(jest.requireActual("./context/Devtools.tsx") as Record<
      string,
      unknown
    >),
    useDevtoolsContext: jest.fn(),
  };
});
import React from "react";
import { shallow } from "enzyme";
import { mocked } from "ts-jest/utils";
import { App, AppRoutes } from "./App";
import { useDevtoolsContext } from "./context";

describe("App", () => {
  describe("on mount", () => {
    it("matches snapshot", () => {
      expect(shallow(<App />)).toMatchSnapshot();
    });
  });

  describe("in dark mode", () => {
    const origThemeName = chrome.devtools.panels.themeName;

    beforeAll(() => {
      chrome.devtools.panels.themeName = "dark";
    });

    afterAll(() => {
      chrome.devtools.panels.themeName = origThemeName;
    });

    it("has a GlobalStyle component but no LightModeStyle component", () => {
      const wrapper = shallow(<App />);

      expect(wrapper.find("GlobalStyle").exists()).toBe(true);
      expect(wrapper.find("LightModeStyle").exists()).toBe(false);
    });
  });

  describe("in light mode", () => {
    const origThemeName = chrome.devtools.panels.themeName;

    beforeAll(() => {
      chrome.devtools.panels.themeName = "default";
    });

    afterAll(() => {
      chrome.devtools.panels.themeName = origThemeName;
    });

    it("has a GlobalStyle component and a LightModeStyle component", () => {
      const wrapper = shallow(<App />);

      expect(wrapper.find("GlobalStyle").exists()).toBe(true);
      expect(wrapper.find("LightModeStyle").exists()).toBe(true);
    });
  });
});

describe("App routes", () => {
  describe("on mount", () => {
    describe("on connected", () => {
      beforeEach(() => {
        mocked(useDevtoolsContext).mockReturnValue({
          client: {
            connected: true,
            version: {
              mismatch: false,
            },
          },
        } as any);
      });

      it("matches snapshot", () => {
        expect(shallow(<AppRoutes />)).toMatchSnapshot();
      });
    });

    describe("on version mismatch", () => {
      beforeEach(() => {
        mocked(useDevtoolsContext).mockReturnValue({
          client: {
            connected: true,
            version: {
              required: "9.9.9",
              actual: "0.0.1",
              mismatch: true,
            },
          },
        } as any);
      });

      it("matches snapshot", () => {
        expect(shallow(<AppRoutes />)).toMatchSnapshot();
      });
    });

    describe("on disconnected", () => {
      beforeEach(() => {
        mocked(useDevtoolsContext).mockReturnValue({
          client: {
            connected: false,
          },
        } as any);
      });

      it("matches snapshot", () => {
        expect(shallow(<AppRoutes />)).toMatchSnapshot();
      });
    });
  });
});
