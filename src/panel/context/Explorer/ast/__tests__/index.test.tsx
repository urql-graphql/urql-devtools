import { DocumentNode } from "graphql";
import { Operation } from "urql";
import gql from "graphql-tag";
import { startQuery } from "../";

interface TestCase {
  query: DocumentNode;
  variables?: any;
  data: any;
}

const expectCorrectOutput = (testcase: TestCase) => {
  const request: Operation = {
    query: testcase.query,
    variables: testcase.variables,
    operationName: "query"
  } as any;

  return expect(startQuery(request, testcase.data, {}));
};

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
        "_id": "NcTnpyxuTNanDo3GMY32V",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "int": Object {
        "_id": "b6ACAP1lU08SRC8CNpQ7H",
        "args": null,
        "key": "int",
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
        "_id": "Dj9UneOH0BIL2KxCCEKCq",
        "args": Object {
          "first": 10,
          "orderBy": "DESC",
          "skip": 1,
        },
        "children": Object {
          "__typename": Object {
            "_id": "fnFTNm1C09xtpgUuIaBDc",
            "args": null,
            "key": "__typename",
            "name": "__typename",
            "owner": Object {},
            "value": "Feed",
          },
          "count": Object {
            "_id": "3nrWVoATVAJjBkkL-jd16",
            "args": null,
            "key": "count",
            "name": "count",
            "owner": Object {},
            "value": 5,
          },
          "links": Object {
            "_id": "kwTL5hZ4CKco_VfI6eBt_",
            "args": null,
            "children": Array [
              Object {
                "__typename": Object {
                  "_id": "7oGKFpRqQIoAyyToKrVP-",
                  "args": null,
                  "key": "__typename",
                  "name": "__typename",
                  "owner": Object {},
                  "value": "Link",
                },
                "createdAt": Object {
                  "_id": "pboGXaOW46IacP4HQAxOm",
                  "args": null,
                  "key": "createdAt",
                  "name": "createdAt",
                  "owner": Object {},
                  "value": "2019-09-03T15:28:04.052Z",
                },
                "description": Object {
                  "_id": "VIOqrADtuZzIs1Gym8noG",
                  "args": null,
                  "key": "description",
                  "name": "description",
                  "owner": Object {},
                  "value": "Prisma turns your database into a GraphQL API 😎",
                },
                "id": Object {
                  "_id": "kdXwcKj2rzPqNReIfcx5t",
                  "args": null,
                  "key": "id",
                  "name": "id",
                  "owner": Object {},
                  "value": "ck03zlsr8qg4o0b53x2z7drw8",
                },
                "postedBy": Object {
                  "_id": "FVPjZ__B4fncGrGxcnrUp",
                  "args": null,
                  "key": "postedBy",
                  "name": "postedBy",
                  "owner": Object {},
                  "value": null,
                },
                "url": Object {
                  "_id": "Ws9u0OiL01lHM-kBriPuE",
                  "args": null,
                  "key": "url",
                  "name": "url",
                  "owner": Object {},
                  "value": "https://www.prismagraphql.com",
                },
                "votes": Object {
                  "_id": "-PGWE2MHxOD_7XxL_gE7D",
                  "args": null,
                  "children": Array [
                    Object {
                      "__typename": Object {
                        "_id": "K5Hg2E_A1aKDrgaDwF30D",
                        "args": null,
                        "key": "__typename",
                        "name": "__typename",
                        "owner": Object {},
                        "value": "Vote",
                      },
                      "id": Object {
                        "_id": "4wTnCrNoF8Y1Z--MMCDHG",
                        "args": null,
                        "key": "id",
                        "name": "id",
                        "owner": Object {},
                        "value": "ck06q9uikf5iw0b53dyjb0fbf",
                      },
                      "user": Object {
                        "_id": "lnSjpb1V6hPz7VzYgLoVo",
                        "args": null,
                        "children": Object {
                          "__typename": Object {
                            "_id": "j_VQqk4o2KtVzMhZti775",
                            "args": null,
                            "key": "__typename",
                            "name": "__typename",
                            "owner": Object {},
                            "value": "User",
                          },
                          "id": Object {
                            "_id": "xPSPU555ZCjnILtnYJhBX",
                            "args": null,
                            "key": "id",
                            "name": "id",
                            "owner": Object {},
                            "value": "ck06q5r9ef4cb0b53xl6mzlo4",
                          },
                        },
                        "key": "user",
                        "name": "user",
                        "owner": Object {},
                      },
                    },
                  ],
                  "key": "votes",
                  "name": "votes",
                  "owner": Object {},
                },
              },
            ],
            "key": "links",
            "name": "links",
            "owner": Object {},
          },
        },
        "key": "feed({\\"first\\":10,\\"orderBy\\":\\"DESC\\",\\"skip\\":1})",
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
        "_id": "mAdSPVrN3nn9U4hvDjcuQ",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "int": Object {
        "_id": "OL_yb21gXFB6TTylFCd4w",
        "args": null,
        "key": "int",
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
        "_id": "EqRx5hbuNnyLslWuFbXR8",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "json": Object {
        "_id": "mUUTGYg5CT0dJt3EManQA",
        "args": null,
        "key": "json",
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
        "_id": "mhbFimnWUvA_vQU3gnSSR",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "missing": Object {
        "_id": "LAyKz_EO2btQhsI1vih8C",
        "args": null,
        "key": "missing",
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
        "_id": "GKUMsOBL7-pzTzD4ZLvpH",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "int({\\"test\\":true})": Object {
        "_id": "G9bOSl9RSnbHWhntDrqBc",
        "args": Object {
          "test": true,
        },
        "key": "int({\\"test\\":true})",
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
        "_id": "NPCLhGSYcrsxHT50IbU57",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "_id": "QF0PZJ-8x7EXWKZgEnHG5",
        "args": null,
        "children": Object {
          "__typename": Object {
            "_id": "WCNsStMfXNjR5OgHqdjPq",
            "args": null,
            "key": "__typename",
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "name": Object {
            "_id": "pYa-lulZF9OCA5wTckgkv",
            "args": null,
            "key": "name",
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "key": "item",
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
        "_id": "uyMqu4hNaYsDwnIoDPzxi",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "_id": "nsOWnTFGNo_okVyuaV3-M",
        "args": null,
        "children": Object {
          "__typename": Object {
            "_id": "fpby_0J3sBvTP-nrtCaCX",
            "args": null,
            "key": "__typename",
            "name": "__typename",
            "owner": Object {},
            "value": null,
          },
          "id": Object {
            "_id": "JO-JHCZ3nEJBTO4oPv9OT",
            "args": null,
            "key": "id",
            "name": "id",
            "owner": Object {},
            "value": "123",
          },
          "name": Object {
            "_id": "IWb39rxEYlCOroUfy303F",
            "args": null,
            "key": "name",
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "key": "item",
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
        "_id": "Gpe1NEVDzizbIW6Y1wJhl",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "_id": "2JqMAFFEtp4e4SBSfEs1p",
        "args": null,
        "children": Object {
          "__typename": Object {
            "_id": "Jvl5UjRabXjNRRCe7baxI",
            "args": null,
            "key": "__typename",
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "name": Object {
            "_id": "f1Kh_34FoKWbHOlYmjbTK",
            "args": null,
            "key": "name",
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "key": "item",
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
        "_id": "5aqlJwfREcHsuhjGs9EID",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "_id": "V-7ggRAWgGVRyhlusyIxV",
        "args": null,
        "children": Object {
          "__typename": Object {
            "_id": "GgYlkLAoiKnr_aVbztnMI",
            "args": null,
            "key": "__typename",
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "id": Object {
            "_id": "bxsMMIKAto_n526RT0BbE",
            "args": null,
            "key": "id",
            "name": "id",
            "owner": Object {},
            "value": "1",
          },
          "name": Object {
            "_id": "3P-DY6yjJPYxyYcZnO9D5",
            "args": null,
            "key": "name",
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "key": "item",
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
        "_id": "t-TZ6Jt9YISlfMgdgLcXf",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "_id": "gLYVoHZBSvNq-w1iMzEFk",
        "args": null,
        "children": Object {
          "__typename": Object {
            "_id": "cTp637lQM9sS7YiRpYBds",
            "args": null,
            "key": "__typename",
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "id": Object {
            "_id": "aWJisSbIdY1H9JpqrRH6V",
            "args": null,
            "key": "id",
            "name": "id",
            "owner": Object {},
            "value": "1",
          },
          "name": Object {
            "_id": "784OKQMI_gRegibC95m_a",
            "args": null,
            "key": "name",
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "key": "item",
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
        "_id": "sfIVqkr_6TsPUvwg9iEun",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item({\\"test\\":true})": Object {
        "_id": "1R-umKncfHlN8-Z6luwLe",
        "args": Object {
          "test": true,
        },
        "children": Object {
          "__typename": Object {
            "_id": "YTb79Fpp9TW_ulzn1DkFB",
            "args": null,
            "key": "__typename",
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "id": Object {
            "_id": "Wr-uI976Un2Q2e9QYDotE",
            "args": null,
            "key": "id",
            "name": "id",
            "owner": Object {},
            "value": "1",
          },
          "name": Object {
            "_id": "FSGLhgssSwWNaszCtv6Jv",
            "args": null,
            "key": "name",
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "key": "item({\\"test\\":true})",
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
        "_id": "eucWXeS250TlbWkWl14mR",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "_id": "yxNffjopVayHQLI2rdgXW",
        "args": null,
        "children": Object {
          "__typename": Object {
            "_id": "SFkr5FH4pwbQm_vRUtej2",
            "args": null,
            "key": "__typename",
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "id": Object {
            "_id": "4FcWpjEeh6YLzZfkBGzAS",
            "args": null,
            "key": "id",
            "name": "id",
            "owner": Object {},
            "value": 1,
          },
          "name": Object {
            "_id": "l6NS_Nc6KuTfpEtqCvNWG",
            "args": null,
            "key": "name",
            "name": "name",
            "owner": Object {},
            "value": "Test",
          },
        },
        "key": "item",
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
        "_id": "KJg5SgMOGuvKNpgs3m1Nn",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "items": Object {
        "_id": "RP6iEcCpYp_inV2LSyS7g",
        "args": null,
        "children": Array [
          Object {
            "__typename": Object {
              "_id": "sQSObj46A9RWDh0usTZRL",
              "args": null,
              "key": "__typename",
              "name": "__typename",
              "owner": Object {},
              "value": "Item",
            },
            "id": Object {
              "_id": "OUKYoiX7ZKs_kgN1J5WrH",
              "args": null,
              "key": "id",
              "name": "id",
              "owner": Object {},
              "value": 1,
            },
          },
          Object {
            "__typename": Object {
              "_id": "jgGXDgx92gu-XHh3jAvmr",
              "args": null,
              "key": "__typename",
              "name": "__typename",
              "owner": Object {},
              "value": "Item",
            },
            "id": Object {
              "_id": "rReyXmzZOHt6xXmtRKgyy",
              "args": null,
              "key": "id",
              "name": "id",
              "owner": Object {},
              "value": 2,
            },
          },
        ],
        "key": "items",
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
        "_id": "AFuy51sxRjaR2oyEtfRht",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "items": Object {
        "_id": "vOOfYODcPm5kM0aLmIXK3",
        "args": null,
        "children": Array [
          Object {
            "__typename": Object {
              "_id": "flNtsxz8UFfAPt_oygFuL",
              "args": null,
              "key": "__typename",
              "name": "__typename",
              "owner": Object {},
              "value": "Item",
            },
            "id": Object {
              "_id": "ZZ63Iqmz8ZCLi6O_OH_Zf",
              "args": null,
              "key": "id",
              "name": "id",
              "owner": Object {},
              "value": 1,
            },
            "test": Object {
              "_id": "wtu2XDdf_2LAQsZznm5uE",
              "args": null,
              "key": "test",
              "name": "test",
              "owner": Object {},
              "value": true,
            },
          },
          null,
        ],
        "key": "items",
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
        "_id": "LNj5r9NAdIaGMp0Y1LHqu",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "items": Object {
        "_id": "G7FoJqbReyj04df8TnQiM",
        "args": null,
        "children": Array [
          Object {
            "__typename": Object {
              "_id": "BLe0IJCQAkCt1L8Tes5EH",
              "args": null,
              "key": "__typename",
              "name": "__typename",
              "owner": Object {},
              "value": "Item",
            },
            "id": Object {
              "_id": "JViyBE0skjZ3tIY8cEfn4",
              "args": null,
              "key": "id",
              "name": "id",
              "owner": Object {},
              "value": 1,
            },
            "test": Object {
              "_id": "FPbNaI6rF4wgLTQDfXiWo",
              "args": null,
              "key": "test",
              "name": "test",
              "owner": Object {},
              "value": true,
            },
          },
          null,
        ],
        "key": "items",
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
        "_id": "3KplKCzplbuHJCq8kXopS",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "_id": "U-saooeaUBPLi6MBejBPc",
        "args": null,
        "children": Object {
          "__typename": Object {
            "_id": "NngQqTlWDXK6gqLddJU67",
            "args": null,
            "key": "__typename",
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "author": Object {
            "_id": "pCp-QrMKUXpbtGW2gXWE0",
            "args": null,
            "children": Object {
              "__typename": Object {
                "_id": "NjYINgpuZa31klvPagpT1",
                "args": null,
                "key": "__typename",
                "name": "__typename",
                "owner": Object {},
                "value": "Author",
              },
              "name": Object {
                "_id": "H478Qtv3LXquZzD1zoocW",
                "args": null,
                "key": "name",
                "name": "name",
                "owner": Object {},
                "value": "Stanley",
              },
            },
            "key": "author",
            "name": "author",
            "owner": Object {},
          },
          "id": Object {
            "_id": "RBOw1bsITE8uSCFa4a5af",
            "args": null,
            "key": "id",
            "name": "id",
            "owner": Object {},
            "value": 1,
          },
        },
        "key": "item",
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
        "_id": "wXE-kX32ZtpoJMoq5qZhM",
        "args": null,
        "key": "__typename",
        "name": "__typename",
        "owner": Object {},
        "value": "Query",
      },
      "item": Object {
        "_id": "2u4XoZkki1AheUwA-Wo_k",
        "args": null,
        "children": Object {
          "__typename": Object {
            "_id": "7xu5Wh6uJBMZ4a-fK4tzo",
            "args": null,
            "key": "__typename",
            "name": "__typename",
            "owner": Object {},
            "value": "Item",
          },
          "author": Object {
            "_id": "8AUX3lB45rwoSCbb4qgAf",
            "args": null,
            "children": Object {
              "__typename": Object {
                "_id": "rXhoRqn81l9QohMpnUTak",
                "args": null,
                "key": "__typename",
                "name": "__typename",
                "owner": Object {},
                "value": "Author",
              },
              "id": Object {
                "_id": "GIGjUClShUJ16A16Rrt8Q",
                "args": null,
                "key": "id",
                "name": "id",
                "owner": Object {},
                "value": 1,
              },
              "name": Object {
                "_id": "FlryLcP803WPCzZGsQdfN",
                "args": null,
                "key": "name",
                "name": "name",
                "owner": Object {},
                "value": "Stanley",
              },
            },
            "key": "author",
            "name": "author",
            "owner": Object {},
          },
          "id": Object {
            "_id": "_CzgiKdbtGK-O3isu3dAX",
            "args": null,
            "key": "id",
            "name": "id",
            "owner": Object {},
            "value": 1,
          },
        },
        "key": "item",
        "name": "item",
        "owner": Object {},
      },
    }
  `);
});
