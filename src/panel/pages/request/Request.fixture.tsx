import React, { FC, ContextType, useState, useMemo } from "react";
import { buildSchema } from "graphql";
import { RequestContext } from "../../context";
import { appendPopulateDirective } from "../../context/schema-transforms";
import { Request } from "./Request";

export const schema = buildSchema(`
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

const RequestProviderMock: FC<Partial<ContextType<typeof RequestContext>>> = ({
  children,
  ...value
}) => {
  const [query, setQuery] = useState("");

  const state = useMemo(
    () => ({
      query,
      setQuery,
      error: undefined,
      execute: () => null as any,
      fetching: false,
      response: undefined,
      schema: appendPopulateDirective(schema),
      ...value,
    }),
    [value]
  );

  return <RequestContext.Provider children={children} value={state} />;
};

export default {
  basic: (
    <RequestProviderMock>
      <Request data-snapshot />
    </RequestProviderMock>
  ),
  fetching: (
    <RequestProviderMock fetching={true}>
      <Request data-snapshot />
    </RequestProviderMock>
  ),
  error: (
    <RequestProviderMock error={{ test: 1234 }}>
      <Request data-snapshot />
    </RequestProviderMock>
  ),
  response: (
    <RequestProviderMock response={{ example: 1234 }}>
      <Request data-snapshot />
    </RequestProviderMock>
  ),
};
