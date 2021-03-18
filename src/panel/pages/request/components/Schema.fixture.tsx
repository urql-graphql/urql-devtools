import React, { FC, ContextType, useState, useMemo } from "react";
import { buildSchema } from "graphql";
import { RequestContext } from "../../../context";
import { Schema } from "./Schema";

export const schema = buildSchema(`
directive @cacheControl(maxAge: Int, scope: CacheControlScope) on FIELD_DEFINITION | OBJECT | INTERFACE

directive @populate on FIELD

enum CacheControlScope {
  PUBLIC
  PRIVATE
}

"""
A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
'date-time' format outlined in section 5.6 of the RFC 3339 profile of the ISO
8601 standard for representation of dates and times using the Gregorian calendar.
"""
scalar DateTime

type Like {
  id: ID!
  createdBy: User!
  createdAt: DateTime!
}

type Mutation {
  createThread(input: ThreadInput!): Thread!
  """
  Reply to a Post
  """
  reply(
    "Reply to a comment!"
    input: ReplyInput!
  ): Reply!
  likeThread(threadId: ID!): Thread!
  likeReply(replyId: ID!): Reply!
  signup(username: String!, password: String!): SigninResult!
  signin(username: String!, password: String!): SigninResult! @deprecated(reason: "Test")
}

type Query {
  """
  This is an awesome query!
  """
  threads(sortBy: SortBy!, skip: Int = 0, limit: Int): [Thread!]!
  thread(id: ID!): Thread
  me: User
  """
  Test with object for default args
  """
  specificThread(thread: ThreadInput! = { title: "Test", text: "Hello" }): [Thread!]!
}

"Reply to a post, this is a little longer description"
type Reply {
  id: ID!
  text: String!
  thread: Thread!
  createdBy: User!
  createdAt: DateTime!
  likesNumber: Int!
  likes(skip: Int, limit: Int): [Like!]!
  hasUserLiked: Boolean
}

input ReplyInput {
  threadId: ID!
  text: String!
}

type SigninResult {
  user: User!
  token: String!
}

enum SortBy {
  LATEST
  OLDEST
}

interface Test {
  foo: String!
  bar: SortBy!
}

union Action = Like | Reply

type Subscription {
  newThread: Thread!
  newReply(threadId: ID!): Reply!
  newThreadLike(threadId: ID!): Like!
  newReplyLike(replyId: ID!): Like!
}

type Thread {
  id: ID!
  title: String!
  text: String
  createdBy: User!
  createdAt: DateTime!
  repliesNumber: Int
  replies(skip: Int, limit: Int): [Reply!]
  likesNumber: Int
  likes(skip: Int, limit: Int): [Like!]
  hasUserLiked: Boolean
  test: Test
}

input ThreadInput {
  title: String! = "Title!"
  text: String
}

"""The 'Upload' scalar type represents a file upload."""
scalar Upload

type User {
  id: ID!
  username: String!
  avatar: String
  createdAt: DateTime
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
      schema,
      ...value,
    }),
    [value]
  );

  return <RequestContext.Provider children={children} value={state} />;
};

export default {
  basic: (
    <RequestProviderMock>
      <Schema data-snapshot />
    </RequestProviderMock>
  ),
};
