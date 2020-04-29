jest.mock("./Devtools");
import React, { useContext } from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { mocked } from "ts-jest/utils";
import {
  getIntrospectionQuery,
  parse,
  buildSchema,
  introspectionFromSchema,
} from "graphql";
import { useDevtoolsContext } from "./Devtools";
import { RequestProvider, RequestContext } from "./Request";

const sendMessage = jest.fn();
const addMessageHandler = jest.fn();

beforeEach(() => {
  mocked(useDevtoolsContext).mockReturnValue({
    clientConnected: true,
    version: {
      required: "9.9.9",
      mismatch: false,
    },
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

  it("triggers schema request", () => {
    expect(sendMessage).toBeCalledTimes(1);
    expect(sendMessage).toBeCalledWith({
      type: "request",
      query: getIntrospectionQuery(),
    });
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
    sendMessage.mockClear();
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

  describe("on schema update", () => {
    const schema = `
      schema {
        query: Simple
      }
      
      type Simple {
        string: String
      }
    `;
    beforeEach(() => {
      const handler = addMessageHandler.mock.calls[0][0];

      act(() => {
        handler({
          type: "debug",
          data: {
            type: "update",
            operation: {
              query: parse(getIntrospectionQuery()),
              context: {
                meta: {
                  source: "Devtools",
                },
              },
            },
            data: {
              value: introspectionFromSchema(buildSchema(schema)),
            },
          },
        });
      });
    });

    describe("state", () => {
      it("matches snapshot", () => {
        expect(state).toMatchInlineSnapshot(`
          Object {
            "error": undefined,
            "execute": [Function],
            "fetching": true,
            "query": undefined,
            "response": undefined,
            "schema": GraphQLSchema {
              "__allowedLegacyNames": Array [],
              "__validationErrors": undefined,
              "_directives": Array [
                "@skip",
                "@include",
                "@deprecated",
                "@populate",
              ],
              "_implementations": Object {},
              "_mutationType": null,
              "_possibleTypeMap": Object {},
              "_queryType": "Simple",
              "_subscriptionType": null,
              "_typeMap": Object {
                "Boolean": "Boolean",
                "Simple": "Simple",
                "String": "String",
                "__Directive": "__Directive",
                "__DirectiveLocation": "__DirectiveLocation",
                "__EnumValue": "__EnumValue",
                "__Field": "__Field",
                "__InputValue": "__InputValue",
                "__Schema": "__Schema",
                "__Type": "__Type",
                "__TypeKind": "__TypeKind",
              },
              "astNode": undefined,
              "extensionASTNodes": Array [],
              "extensions": undefined,
            },
            "setQuery": [Function],
          }
        `);
      });
    });
  });

  describe("on update", () => {
    const response = { test: "response" };

    beforeEach(() => {
      const handler = addMessageHandler.mock.calls[0][0];

      act(() => {
        handler({
          type: "debug",
          data: {
            type: "update",
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
