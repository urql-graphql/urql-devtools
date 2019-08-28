import { operation, mutationOperation } from "./__mocks__";
import { startQuery } from "..";

describe("startQuery parsing", () => {
  it("matches expected format", () => {
    expect(startQuery(operation)).toEqual({
      'todos({"initValue":false})': {
        name: "todos",
        args: {
          initValue: false
        },
        children: {
          id: {
            name: "id",
            args: null,
            children: {
              number: {
                name: "number",
                args: null
              }
            }
          },
          text: {
            name: "text",
            args: null
          },
          complete: {
            name: "complete",
            args: null
          },
          __typename: {
            name: "__typename",
            args: null
          }
        }
      }
    });
  });

  it("can handle mutations", () => {
    expect(startQuery(mutationOperation)).toEqual({
      'toggleTodo({"id":"2"})': {
        name: "toggleTodo",
        args: {
          id: "2"
        },
        children: {
          id: {
            name: "id",
            args: null
          },
          __typename: {
            name: "__typename",
            args: null
          }
        }
      }
    });
  });
});
