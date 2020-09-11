import React from "react";
import styled from "styled-components";
import { print } from "graphql";
import gql from "graphql-tag";
import { CodeHighlight, InlineCodeHighlight } from "./CodeHighlight";

const query = gql`
  query Todos {
    todos {
      id
      name
      __typename
    }
  }
`;

const Wrapper = styled.div`
  padding: 20px;

  p {
    color: ${(p) => p.theme.light["0"]};
  }
`;

export default {
  "Block - GraphQL": (
    <Wrapper>
      <p data-snapshot>
        value: <CodeHighlight code={print(query)} language="graphql" />
      </p>
    </Wrapper>
  ),
  "Block - JSON": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <CodeHighlight
          code={JSON.stringify({ number: 1234, string: "Hello" }, null, 2)}
          language="javascript"
        />
      </p>
    </Wrapper>
  ),
  "Inline - string": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <InlineCodeHighlight code={'"Hello world"'} language="javascript" />
      </p>
    </Wrapper>
  ),
  "Inline - string (large)": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <InlineCodeHighlight
          code={'"Hello world this string is very long"'}
          language="javascript"
        />
      </p>
    </Wrapper>
  ),
  "Inline - object": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <InlineCodeHighlight
          code={JSON.stringify({ prop: 123 })}
          language="javascript"
        />
      </p>
    </Wrapper>
  ),
  "Inline - object (large)": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <InlineCodeHighlight
          code={JSON.stringify({
            prop: 123,
            otherProp: "some string",
          })}
          language="javascript"
        />
      </p>
    </Wrapper>
  ),
  "Inline - array": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <InlineCodeHighlight
          code={JSON.stringify([1, "two"])}
          language="javascript"
        />
      </p>
    </Wrapper>
  ),
  "Inline - array (large)": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <InlineCodeHighlight
          code={JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])}
          language="javascript"
        />
      </p>
    </Wrapper>
  ),
};
