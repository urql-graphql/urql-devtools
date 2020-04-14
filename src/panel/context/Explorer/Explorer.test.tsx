jest.mock("../Devtools");
jest.mock("./ast");
import React, { useContext } from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { mocked } from "ts-jest/utils";
import { useDevtoolsContext } from "../Devtools";
import { ExplorerProvider, ExplorerContext } from "../Explorer";
import { defaultEvents } from "../../pages/explorer/Explorer.fixture";
import { handleResponse } from "./ast";
const sendMessage = jest.fn();
const addMessageHandler = jest.fn();

beforeEach(() => {
  mocked(useDevtoolsContext).mockReturnValue({
    clientConnected: true,
    sendMessage,
    addMessageHandler,
  });
});

beforeEach(jest.clearAllMocks);

let state: any;

const Fixture = () => {
  state = useContext(ExplorerContext);
  return null;
};

describe("on mount", () => {
  beforeEach(() => {
    mount(
      <ExplorerProvider>
        <Fixture />
      </ExplorerProvider>
    );
  });

  it("listens for events", () => {
    expect(addMessageHandler).toBeCalledTimes(1);
  });

  describe("state", () => {
    it("matches snapshot", () => {
      expect(state).toMatchInlineSnapshot(`
        Object {
          "expandedNodes": Array [],
          "focusedNode": undefined,
          "operations": Object {},
          "setExpandedNodes": [Function],
          "setFocusedNode": [Function],
        }
      `);
    });
  });
});

describe("DebugMessage", () => {
  beforeEach(async () => {
    addMessageHandler.mockImplementationOnce((cb) => cb(defaultEvents[0]));
    await act(async () => {
      mount(
        <ExplorerProvider>
          <Fixture />
        </ExplorerProvider>
      );
    });
  });
  it("calls handleResponse with the correct message ", () => {
    expect(addMessageHandler).toHaveBeenCalledTimes(1);
    expect(handleResponse).toHaveBeenCalledTimes(1);
    expect(handleResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: defaultEvents[0].data.operation,
        data: defaultEvents[0].data.data.value,
      })
    );
  });
});

describe("unknown message", () => {
  beforeEach(() => {
    addMessageHandler.mockImplementationOnce((cb) => cb({ type: "unknown" }));
  });
  it("doesn't call handleResponse", async (done) => {
    await act(async () => {
      mount(
        <ExplorerProvider>
          <Fixture />
        </ExplorerProvider>
      );
    });
    expect(addMessageHandler).toHaveBeenCalledTimes(1);
    expect(handleResponse).toHaveBeenCalledTimes(0);
    done();
  });
});

describe("disconnect message", () => {
  beforeEach(async () => {
    addMessageHandler.mockImplementationOnce((cb) => cb(defaultEvents[0]));
    await act(async () => {
      mount(
        <ExplorerProvider>
          <Fixture />
        </ExplorerProvider>
      );
    });
    addMessageHandler.mockImplementationOnce((cb) =>
      cb({ type: "disconnect" })
    );
    await act(async () => {
      mount(
        <ExplorerProvider>
          <Fixture />
        </ExplorerProvider>
      );
    });
  });
  it("doesn't call handleResponse and resets the operations", () => {
    expect(addMessageHandler).toHaveBeenCalledTimes(2);
    // * once for initial DebugMessage
    expect(handleResponse).toHaveBeenCalledTimes(1);

    expect(state).toEqual(
      expect.objectContaining({
        operations: {},
      })
    );
  });
});
