jest.mock("../util/Connection");
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { createConnection } from "../util";
import { DevtoolsProvider, useDevtoolsContext } from "./Devtools";

const connection = {
  onMessage: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  },
  postMessage: jest.fn(),
};
(createConnection as jest.Mocked<any>).mockReturnValue(connection);

let state: ReturnType<typeof useDevtoolsContext>;

const chrome = {
  devtools: {
    inspectedWindow: {
      tabId: 1234,
    },
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

beforeAll(() => {
  jest.useFakeTimers();
});

beforeEach(jest.clearAllMocks);

describe("on mount", () => {
  beforeEach(() => {
    mount(<Fixture />);
  });

  it("sends an init message w/ tabId", () => {
    expect(connection.postMessage).toBeCalledTimes(1);
    expect(connection.postMessage).toBeCalledWith({
      type: "connection-init",
      tabId: chrome.devtools.inspectedWindow.tabId,
      source: "devtools",
      version: process.env.PKG_VERSION,
    });
  });

  describe("state", () => {
    it("client is not connected", () => {
      expect(state).toHaveProperty("client", { connected: false });
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
    const message = { type: "connection-init", source: "exchange" };
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

  describe("on exchange init", () => {
    it("sets clientConnected to true", () => {
      act(() => {
        sendMessage({
          type: "connection-init",
          source: "exchange",
          version: "0.0.0",
        });
      });

      expect(state.client).toHaveProperty("connected", true);
    });

    describe("on exchange version is newer", () => {
      const version = "100.0.1";

      it("updates version state", async () => {
        act(() => {
          sendMessage({ type: "connection-init", source: "exchange", version });
        });

        expect(state.client).toEqual({
          connected: true,
          version: {
            actual: version,
            mismatch: false,
            required: expect.any(String),
          },
        });
      });
    });

    describe("on exchange version is older", () => {
      const version = "0.0.1";

      it("updates version state", async () => {
        act(() => {
          sendMessage({ type: "connection-init", source: "exchange", version });
        });

        expect(state.client).toEqual({
          connected: true,
          version: {
            actual: version,
            mismatch: true,
            required: expect.any(String),
          },
        });
      });
    });
  });

  describe("on exchange acknowledge", () => {
    it("sets clientConnected to true", () => {
      act(() => {
        sendMessage({
          type: "connection-acknowledge",
          source: "exchange",
          version: "0.0.0",
        });
      });

      expect(state.client).toHaveProperty("connected", true);
    });

    describe("on exchange version is newer", () => {
      const version = "100.0.1";

      it("updates version state", async () => {
        act(() => {
          sendMessage({
            type: "connection-acknowledge",
            source: "exchange",
            version,
          });
        });

        expect(state.client).toEqual({
          connected: true,
          version: {
            actual: version,
            mismatch: false,
            required: expect.any(String),
          },
        });
      });
    });

    describe("on exchange version is older", () => {
      const version = "0.0.1";

      it("updates version state", async () => {
        act(() => {
          sendMessage({
            type: "connection-acknowledge",
            source: "exchange",
            version,
          });
        });

        expect(state.client).toEqual({
          connected: true,
          version: {
            actual: version,
            mismatch: true,
            required: expect.any(String),
          },
        });
      });
    });
  });

  describe("on disconnect", () => {
    beforeEach(async () => {
      act(() => {
        sendMessage({
          type: "connection-init",
          source: "exchange",
          version: "200.0.0",
        });
      });
      act(() => {
        sendMessage({ type: "connection-disconnect", source: "exchange" });
      });
    });

    it("sets client to disconnected", () => {
      expect(state.client).toEqual({ connected: false });
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
