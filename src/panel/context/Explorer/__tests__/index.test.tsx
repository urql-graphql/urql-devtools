import {
  operation,
  mutationOperation,
  queryResult,
  request
} from "./__mocks__";
import { startQuery, parseNode } from "..";

describe("data explorer", () => {
  describe("startQuery parsing", () => {
    it("matches expected format", () => {
      expect(startQuery(operation)).toEqual({
        'todos({"initValue":false})': {
          name: "todos",
          args: {
            initValue: false
          },
          children: {
            'id({"isNumber":true})': {
              name: "id",
              args: {
                isNumber: true
              },
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

  describe("combineResults", () => {
    it("returns result in correct format", () => {
      expect(parseNode(request, queryResult)).toEqual({
        'todos({"initValue":false})': {
          children: [
            {
              'id({"isNumber":true})': {
                children: [{ number: 0 }]
              },
              complete: false,
              text: "Go to the shops",
              __typename: "Todo"
            }
          ]
        }
      });
    });
  });
});
