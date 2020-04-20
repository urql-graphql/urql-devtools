import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { DevtoolsProvider, useDevtoolsContext } from "./Devtools";

let state: ReturnType<typeof useDevtoolsContext>;

const connection = {
  onMessage: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  },
  postMessage: jest.fn(),
};
const chrome = {
  devtools: {
    inspectedWindow: {
      tabId: 1234,
      eval: jest.fn(),
    },
  },
  runtime: {
    connect: jest.fn(() => connection),
  },
};

(global as any).chrome = chrome;

const Child = () => {
  state = useDevtoolsContext();
  return null;
};
const Fixture = () => (
  <DevtoolsProvider>
    <Child />
  </DevtoolsProvider>
);

beforeEach(jest.clearAllMocks);

describe("on mount", () => {
  beforeEach(() => {
    mount(<Fixture />);
  });

  it("sends an init message w/ tabId", () => {
    expect(connection.postMessage).toBeCalledTimes(1);
    expect(connection.postMessage).toBeCalledWith({
      type: "init",
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  });

  describe("state", () => {
    it("client is not connected", () => {
      expect(state).toHaveProperty("clientConnected", false);
    });

    it("version is not mismatched", () => {
      expect(state.version).toHaveProperty("mismatch", false);
    });
  });
});

describe("on message", () => {
  let sendMessage: (msg: any) => void;

  beforeEach(() => {
    mount(<Fixture />);
    sendMessage = connection.onMessage.addListener.mock.calls[0][0];
  });

  it("sends to message handlers", () => {
    const message = { type: "init" };
    const handler = jest.fn();

    act(() => {
      state.addMessageHandler(handler);
    });
    act(() => {
      sendMessage(message);
    });

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith(message);
  });

  describe("on init", () => {
    it("sets clientConnected to true", () => {
      act(() => {
        sendMessage({ type: "init" });
      });

      expect(state).toHaveProperty("clientConnected", true);
    });

    it("checks for devtools version", () => {
      act(() => {
        sendMessage({ type: "init" });
      });

      expect(chrome.devtools.inspectedWindow.eval).toBeCalledTimes(1);
      expect(chrome.devtools.inspectedWindow.eval).toBeCalledWith(
        "window.__urql__",
        expect.any(Function)
      );
    });

    describe("on exchange version is newer", () => {
      const version = "100.0.1";

      it("updates version state", async () => {
        act(() => {
          sendMessage({ type: "init" });
        });

        await act(async () => {
          chrome.devtools.inspectedWindow.eval.mock.calls[0][1]({
            version,
          });
        });

        expect(state.version).toEqual(
          expect.objectContaining({
            mismatch: false,
            actual: version,
          })
        );
      });
    });

    describe("on exchange version is older", () => {
      const version = "0.0.1";

      it("updates version state", async () => {
        act(() => {
          sendMessage({ type: "init" });
        });

        await act(async () => {
          chrome.devtools.inspectedWindow.eval.mock.calls[0][1]({
            version,
          });
        });

        expect(state.version).toEqual(
          expect.objectContaining({
            mismatch: true,
            actual: version,
          })
        );
      });
    });

    describe("on exchange version is undefined", () => {
      it("updates version state", async () => {
        act(() => {
          sendMessage({ type: "init" });
        });

        await act(async () => {
          chrome.devtools.inspectedWindow.eval.mock.calls[0][1](undefined);
        });

        expect(state.version).toEqual(
          expect.objectContaining({
            mismatch: true,
            actual: undefined,
          })
        );
      });
    });
  });

  describe("on disconnect", () => {
    beforeEach(async () => {
      act(() => {
        sendMessage({ type: "init" });
      });
      await act(async () => {
        chrome.devtools.inspectedWindow.eval.mock.calls[0][1]({
          version: "0.0.1",
        });
      });
      act(() => {
        sendMessage({ type: "disconnect" });
      });
    });

    it("sets clientConnected to false", () => {
      expect(state).toHaveProperty("clientConnected", false);
    });

    it("resets version state", () => {
      expect(state.version).toHaveProperty("mismatch", false);
      expect(state.version).toHaveProperty("actual", undefined);
    });
  });
});

describe("on sendMessage", () => {
  beforeEach(() => {
    mount(<Fixture />);
  });

  it("calls postMessage", () => {
    const message = { type: "init" } as any;

    state.sendMessage(message);

    expect(connection.postMessage).toBeCalledWith(message);
  });
});
