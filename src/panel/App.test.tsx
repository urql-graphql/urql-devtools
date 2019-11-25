jest.mock("./context/Devtools.tsx", () => {
  return {
    ...jest.requireActual("./context/Devtools.tsx"),
    useDevtoolsContext: jest.fn()
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
});

describe("App routes", () => {
  describe("on mount", () => {
    describe("on connected", () => {
      beforeEach(() => {
        mocked(useDevtoolsContext).mockReturnValue({
          clientConnected: true
        } as any);
      });

      it("matches snapshot", () => {
        expect(shallow(<AppRoutes />)).toMatchSnapshot();
      });
    });

    describe("on disconnected", () => {
      beforeEach(() => {
        mocked(useDevtoolsContext).mockReturnValue({
          clientConnected: false
        } as any);
      });

      it("matches snapshot", () => {
        expect(shallow(<AppRoutes />)).toMatchSnapshot();
      });
    });
  });
});
