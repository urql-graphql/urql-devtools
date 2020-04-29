import { buildSchema, GraphQLSchema, printSchema } from "graphql";
import { appendPopulateDirective } from "./schema-transforms";

describe("#appendPopulateDirective", () => {
  let schema: GraphQLSchema;
  beforeEach(() => {
    schema = buildSchema(`
      type Post {
        id: ID
        title: String!
        content: String!
      }
      type Query {
        posts: [Post]
      }
      type Mutation {
        createPost(title: String!, content: String!): Post!
      }
    `);
  });

  it("should create an additional populate directive", () => {
    const modifiedSchema = appendPopulateDirective(schema);
    expect(printSchema(modifiedSchema)).toMatchInlineSnapshot(`
        "directive @populate on FIELD_DEFINITION

        type Mutation {
          createPost(title: String!, content: String!): Post!
        }

        type Post {
          id: ID
          title: String!
          content: String!
        }

        type Query {
          posts: [Post]
        }
        "
      `);
  });

  it("should be idempotent", () => {
    const modifiedSchema = appendPopulateDirective(
      appendPopulateDirective(schema)
    );
    expect(printSchema(modifiedSchema)).toMatchInlineSnapshot(`
        "directive @populate on FIELD_DEFINITION

        type Mutation {
          createPost(title: String!, content: String!): Post!
        }

        type Post {
          id: ID
          title: String!
          content: String!
        }

        type Query {
          posts: [Post]
        }
        "
      `);
  });
});
