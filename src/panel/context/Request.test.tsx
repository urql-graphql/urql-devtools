jest.mock("./Devtools");
import React, { useContext } from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { mocked } from "ts-jest/utils";
import { useDevtoolsContext } from "./Devtools";
import { RequestProvider, RequestContext } from "./Request";

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
  state = useContext(RequestContext);
  return null;
};

describe("on mount", () => {
  beforeEach(() => {
    mount(
      <RequestProvider>
        <Fixture />
      </RequestProvider>
    );
  });

  it("listens for events", () => {
    expect(addMessageHandler).toBeCalledTimes(1);
  });

  describe("state", () => {
    it("matches snapshot", () => {
      expect(state).toMatchInlineSnapshot(`
        Object {
          "error": undefined,
          "execute": [Function],
          "fetching": false,
          "query": undefined,
          "response": undefined,
          "schema": undefined,
          "setQuery": [Function],
        }
      `);
    });
  });
});

describe("on setQuery", () => {
  const query = "stub query";

  beforeEach(() => {
    mount(
      <RequestProvider>
        <Fixture />
      </RequestProvider>
    );
    act(() => {
      state.setQuery(query);
    });
  });

  describe("state", () => {
    it("contains new query value", () => {
      expect(state.query).toEqual(query);
    });
  });
});

describe("on execute", () => {
  const query = "stub query";

  beforeEach(() => {
    mount(
      <RequestProvider>
        <Fixture />
      </RequestProvider>
    );
    act(() => {
      state.setQuery(query);
    });
    act(() => {
      state.execute();
    });
  });

  describe("state", () => {
    it("is fetching", () => {
      expect(state).toHaveProperty("fetching", true);
    });
  });

  describe("send message", () => {
    it("is called", () => {
      expect(sendMessage).toBeCalledTimes(1);
      expect(sendMessage).toBeCalledWith({ type: "request", query });
    });
  });
});

describe("on debug message", () => {
  beforeEach(() => {
    mount(
      <RequestProvider>
        <Fixture />
      </RequestProvider>
    );
    act(() => {
      state.execute();
    });
  });

  describe("on response", () => {
    const response = { test: "response" };

    beforeEach(() => {
      const handler = addMessageHandler.mock.calls[0][0];

      act(() => {
        handler({
          type: "debug",
          data: {
            type: "response",
            operation: {
              context: {
                meta: {
                  source: "Devtools",
                },
              },
            },
            data: {
              value: response,
            },
          },
        });
      });
    });

    describe("state", () => {
      it("matches snapshot", () => {
        expect(state).toMatchInlineSnapshot(`
          Object {
            "execute": [Function],
            "fetching": false,
            "query": undefined,
            "response": Object {
              "test": "response",
            },
            "schema": undefined,
            "setQuery": [Function],
          }
        `);
      });
    });
  });

  describe("on error", () => {
    const error = { test: "error" };

    beforeEach(() => {
      const handler = addMessageHandler.mock.calls[0][0];

      act(() => {
        handler({
          type: "debug",
          data: {
            type: "error",
            operation: {
              context: {
                meta: {
                  source: "Devtools",
                },
              },
            },
            data: {
              value: error,
            },
          },
        });
      });
    });

    describe("state", () => {
      it("matches snapshot", () => {
        expect(state).toMatchInlineSnapshot(`
          Object {
            "error": Object {
              "test": "error",
            },
            "execute": [Function],
            "fetching": false,
            "query": undefined,
            "schema": undefined,
            "setQuery": [Function],
          }
        `);
      });
    });
  });
});
