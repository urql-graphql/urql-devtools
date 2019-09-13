import { DocumentNode } from "graphql";
import gql from "graphql-tag";
import { startQuery } from "../";

interface TestCase {
  query: DocumentNode;
  variables?: any;
  data: any;
}

const expectCorrectOutput = (testcase: TestCase) => {
  const request = {
    query: testcase.query,
    variables: testcase.variables
  };

  return expect(startQuery(request, testcase.data));
};

it("doesn't mutate existing structure if a key has changed", () => {
  const testcase: TestCase = {
    query: gql`
      {
        __typename
        int
      }
    `,
    data: { __typename: "Query", int: 42 }
  };

  const request = {
    query: testcase.query,
    variables: testcase.variables
  };

  const start = startQuery(request, testcase.data);
  testcase.data.int = testcase.data.int + 1;
  const end = startQuery(request, testcase.data);

  expect(start).not.toEqual(end);
});

it("int on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        int
      }
    `,
    data: { __typename: "Query", int: 42 }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "int": Object {
        "args": null,
        "name": "int",
        "owner": Object {},
        "value": 42,
      },
    }
  `);
});

it("complex query", () => {
  expectCorrectOutput({
    query: gql`
      {
        feed(first: 10, skip: 1, orderBy: "DESC") {
          links {
            id
            url
            description
            postedBy {
              id
              name
              __typename
            }
            votes {
              id
              user {
                id
                __typename
              }
              __typename
            }
            createdAt
            __typename
          }
          count
          __typename
        }
      }
    `,
    data: {
      feed: {
        links: [
          {
            id: "ck03zlsr8qg4o0b53x2z7drw8",
            url: "https://www.prismagraphql.com",
            description: "Prisma turns your database into a GraphQL API 😎",
            postedBy: null,
            votes: [
              {
                id: "ck06q9uikf5iw0b53dyjb0fbf",
                user: { id: "ck06q5r9ef4cb0b53xl6mzlo4", __typename: "User" },
                __typename: "Vote"
              }
            ],
            createdAt: "2019-09-03T15:28:04.052Z",
            __typename: "Link"
          }
        ],
        count: 5,
        __typename: "Feed"
      }
    }
  }).toMatchInlineSnapshot(`
    Object {
      "feed({\\"first\\":10,\\"orderBy\\":\\"DESC\\",\\"skip\\":1})": Object {
        "args": Object {
          "first": 10,
          "orderBy": "DESC",
          "skip": 1,
        },
        "children": Object {
          "__typename": Object {
            "args": null,
            "name": "__typename",
            "owner": Object {},
            "value": "Feed",
          },
          "count": Object {
            "args": null,
            "name": "count",
            "owner": Object {},
            "value": 5,
          },
          "links": Object {
            "args": null,
            "children": Array [
              Object {
                "__typename": Object {
                  "args": null,
                  "name": "__typename",
                  "owner": Object {},
                  "value": "Link",
                },
                "createdAt": Object {
                  "args": null,
                  "name": "createdAt",
                  "owner": Object {},
                  "value": "2019-09-03T15:28:04.052Z",
                },
                "description": Object {
                  "args": null,
                  "name": "description",
                  "owner": Object {},
                  "value": "Prisma turns your database into a GraphQL API 😎",
                },
                "id": Object {
                  "args": null,
                  "name": "id",
                  "owner": Object {},
                  "value": "ck03zlsr8qg4o0b53x2z7drw8",
                },
                "postedBy": Object {
                  "args": null,
                  "name": "postedBy",
                  "owner": Object {},
                  "value": null,
                },
                "url": Object {
                  "args": null,
                  "name": "url",
                  "owner": Object {},
                  "value": "https://www.prismagraphql.com",
                },
                "votes": Object {
                  "args": null,
                  "children": Array [
                    Object {
                      "__typename": Object {
                        "args": null,
                        "name": "__typename",
                        "owner": Object {},
                        "value": "Vote",
                      },
                      "id": Object {
                        "args": null,
                        "name": "id",
                        "owner": Object {},
                        "value": "ck06q9uikf5iw0b53dyjb0fbf",
                      },
                      "user": Object {
                        "args": null,
                        "children": Object {
                          "__typename": Object {
                            "args": null,
                            "name": "__typename",
                            "owner": Object {},
                            "value": "User",
                          },
                          "id": Object {
                            "args": null,
                            "name": "id",
                            "owner": Object {},
                            "value": "ck06q5r9ef4cb0b53xl6mzlo4",
                          },
                        },
                        "name": "user",
                        "owner": Object {},
                      },
                    },
                  ],
                  "name": "votes",
                  "owner": Object {},
                },
              },
            ],
            "name": "links",
            "owner": Object {},
          },
        },
        "name": "feed",
        "owner": Object {},
      },
    }
  `);
});

it("aliased field on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        anotherName: int
      }
    `,
    data: { __typename: "Query", anotherName: 42 }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "int": Object {
        "args": null,
        "name": "int",
        "owner": Object {},
        "value": 42,
      },
    }
  `);
});

it("json on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        json
      }
    `,
    // The `__typename` field should not mislead the cache
    data: {
      __typename: "Query",
      json: { __typename: "Misleading", test: true }
    }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "json": Object {
        "args": null,
        "name": "json",
        "owner": Object {},
        "value": Object {
          "__typename": "Misleading",
          "test": true,
        },
      },
    }
  `);
});

it("nullable field on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        missing
      }
    `,
    data: { __typename: "Query", missing: null }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "missing": Object {
        "args": null,
        "name": "missing",
        "owner": Object {},
        "value": null,
      },
    }
  `);
});

it("int field with arguments on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        int(test: true)
      }
    `,
    data: { __typename: "Query", int: 42 }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "int({\\"test\\":true})": Object {
        "args": Object {
          "test": true,
        },
        "name": "int",
        "owner": Object {},
        "value": 42,
      },
    }
  `);
});

it("non-keyable entity on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        item {
          __typename
          name
        }
      }
    `,
    // This entity has no `id` or `_id` field
    data: { __typename: "Query", item: { __typename: "Item", name: "Test" } }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "args": null,
        "children": Object {
          "__typename": Object {
            "args": null,
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "name": Object {
            "args": null,
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "name": "item",
        "owner": Object {},
      },
    }
  `);
});

it("invalid entity on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        item {
          __typename
          id
          name
        }
      }
    `,
    // This entity comes back with an invalid typename (for some reason or another)
    data: {
      __typename: "Query",
      item: { __typename: null, id: "123", name: "Test" }
    }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "args": null,
        "children": Object {
          "__typename": Object {
            "args": null,
            "name": "__typename",
            "owner": Object {},
            "value": null,
          },
          "id": Object {
            "args": null,
            "name": "id",
            "owner": Object {},
            "value": "123",
          },
          "name": Object {
            "args": null,
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "name": "item",
        "owner": Object {},
      },
    }
  `);
});

it("non-IDable entity on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        item {
          name
          __typename
        }
        __typename
      }
    `,
    // This entity has a `__typename` but no ID fields
    data: { __typename: "Query", item: { __typename: "Item", name: "Test" } }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "args": null,
        "children": Object {
          "__typename": Object {
            "args": null,
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "name": Object {
            "args": null,
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "name": "item",
        "owner": Object {},
      },
    }
  `);
});

it("entity on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        item {
          id
          name
          __typename
        }
        __typename
      }
    `,
    data: {
      __typename: "Query",
      item: { __typename: "Item", id: "1", name: "Test" }
    }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "args": null,
        "children": Object {
          "__typename": Object {
            "args": null,
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "id": Object {
            "args": null,
            "name": "id",
            "owner": Object {},
            "value": "1",
          },
          "name": Object {
            "args": null,
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "name": "item",
        "owner": Object {},
      },
    }
  `);
});

it("entity on aliased field on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        anotherName: item {
          __typename
          id
          name
        }
      }
    `,
    data: {
      __typename: "Query",
      anotherName: { __typename: "Item", id: "1", name: "Test" }
    }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "args": null,
        "children": Object {
          "__typename": Object {
            "args": null,
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "id": Object {
            "args": null,
            "name": "id",
            "owner": Object {},
            "value": "1",
          },
          "name": Object {
            "args": null,
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "name": "item",
        "owner": Object {},
      },
    }
  `);
});

it("entity with arguments on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        item(test: true) {
          __typename
          id
          name
        }
      }
    `,
    data: {
      __typename: "Query",
      item: { __typename: "Item", id: "1", name: "Test" }
    }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item({\\"test\\":true})": Object {
        "args": Object {
          "test": true,
        },
        "children": Object {
          "__typename": Object {
            "args": null,
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "id": Object {
            "args": null,
            "name": "id",
            "owner": Object {},
            "value": "1",
          },
          "name": Object {
            "args": null,
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "name": "item",
        "owner": Object {},
      },
    }
  `);
});

it("entity with Int-like ID on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        item {
          __typename
          id
          name
        }
      }
    `,
    // This is the same as above, but with a number on `id`
    data: {
      __typename: "Query",
      item: { __typename: "Item", id: 1, name: "Test" }
    }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "args": null,
        "children": Object {
          "__typename": Object {
            "args": null,
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "id": Object {
            "args": null,
            "name": "id",
            "owner": Object {},
            "value": 1,
          },
          "name": Object {
            "args": null,
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "name": "item",
        "owner": Object {},
      },
    }
  `);
});

it("entity list on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        items {
          __typename
          id
        }
      }
    `,
    data: {
      __typename: "Query",
      items: [{ __typename: "Item", id: 1 }, { __typename: "Item", id: 2 }]
    }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "items": Object {
        "args": null,
        "children": Array [
          Object {
            "__typename": Object {
              "args": null,
              "name": "__typename",
              "owner": Object {},
              "value": "Item",
            },
            "id": Object {
              "args": null,
              "name": "id",
              "owner": Object {},
              "value": 1,
            },
          },
          Object {
            "__typename": Object {
              "args": null,
              "name": "__typename",
              "owner": Object {},
              "value": "Item",
            },
            "id": Object {
              "args": null,
              "name": "id",
              "owner": Object {},
              "value": 2,
            },
          },
        ],
        "name": "items",
        "owner": Object {},
      },
    }
  `);
});

it("entity list on query and inline fragment", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        items {
          __typename
          id
        }
        ... on Query {
          items {
            test
          }
        }
      }
    `,
    data: {
      __typename: "Query",
      items: [{ __typename: "Item", id: 1, test: true }, null]
    }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "items": Object {
        "args": null,
        "children": Array [
          Object {
            "__typename": Object {
              "args": null,
              "name": "__typename",
              "owner": Object {},
              "value": "Item",
            },
            "id": Object {
              "args": null,
              "name": "id",
              "owner": Object {},
              "value": 1,
            },
            "test": Object {
              "args": null,
              "name": "test",
              "owner": Object {},
              "value": true,
            },
          },
          null,
        ],
        "name": "items",
        "owner": Object {},
      },
    }
  `);
});

it("entity list on query and spread fragment", () => {
  expectCorrectOutput({
    query: gql`
      query Test {
        __typename
        items {
          __typename
          id
        }
        ...TestFragment
      }

      fragment TestFragment on Query {
        items {
          test
        }
      }
    `,
    data: {
      __typename: "Query",
      items: [{ __typename: "Item", id: 1, test: true }, null]
    }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "items": Object {
        "args": null,
        "children": Array [
          Object {
            "__typename": Object {
              "args": null,
              "name": "__typename",
              "owner": Object {},
              "value": "Item",
            },
            "id": Object {
              "args": null,
              "name": "id",
              "owner": Object {},
              "value": 1,
            },
            "test": Object {
              "args": null,
              "name": "test",
              "owner": Object {},
              "value": true,
            },
          },
          null,
        ],
        "name": "items",
        "owner": Object {},
      },
    }
  `);
});

it("embedded invalid object on entity", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        item {
          __typename
          id
          author {
            __typename
            name
          }
        }
      }
    `,
    data: {
      __typename: "Query",
      item: {
        __typename: "Item",
        id: 1,
        author: {
          __typename: "Author",
          name: "Stanley"
        }
      }
    }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "args": null,
        "children": Object {
          "__typename": Object {
            "args": null,
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "author": Object {
            "args": null,
            "children": Object {
              "__typename": Object {
                "args": null,
                "name": "__typename",
                "owner": Object {},
                "value": "Author",
              },
              "name": Object {
                "args": null,
                "name": "name",
                "owner": Object {},
                "value": "Stanley",
              },
            },
            "name": "author",
            "owner": Object {},
          },
          "id": Object {
            "args": null,
            "name": "id",
            "owner": Object {},
            "value": 1,
          },
        },
        "name": "item",
        "owner": Object {},
      },
    }
  `);
});

it("embedded object on entity", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        item {
          __typename
          id
          author {
            __typename
            id
            name
          }
        }
      }
    `,
    data: {
      __typename: "Query",
      item: {
        __typename: "Item",
        id: 1,
        author: {
          __typename: "Author",
          id: 1,
          name: "Stanley"
        }
      }
    }
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "args": null,
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "args": null,
        "children": Object {
          "__typename": Object {
            "args": null,
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "author": Object {
            "args": null,
            "children": Object {
              "__typename": Object {
                "args": null,
                "name": "__typename",
                "owner": Object {},
                "value": "Author",
              },
              "id": Object {
                "args": null,
                "name": "id",
                "owner": Object {},
                "value": 1,
              },
              "name": Object {
                "args": null,
                "name": "name",
                "owner": Object {},
                "value": "Stanley",
              },
            },
            "name": "author",
            "owner": Object {},
          },
          "id": Object {
            "args": null,
            "name": "id",
            "owner": Object {},
            "value": 1,
          },
        },
        "name": "item",
        "owner": Object {},
      },
    }
  `);
});
