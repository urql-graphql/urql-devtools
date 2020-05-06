import React from "react";
import styled from "styled-components";
import { Arguments } from "./Arguments";

const Wrapper = styled.div``;

export default {
  empty: (
    <Wrapper>
      <Arguments />
    </Wrapper>
  ),
  basic: (
    <Wrapper>
      <Arguments
        data-snapshot
        args={{
          string: "string",
          number: 1234,
          object: { test: "test" },
          undef: undefined,
          null: null,
        }}
      />
    </Wrapper>
  ),
};
