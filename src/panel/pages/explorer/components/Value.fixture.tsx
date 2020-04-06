import React from "react";
import styled from "styled-components";
import { Value } from "./Value";

const Wrapper = styled.div`
  background: ${(props) => props.theme.dark[0]};
  padding: 20px;
  flex-grow: 1;
`;

export default {
  "array - empty": (
    <Wrapper>
      <Value data-snapshot value={[]} />
    </Wrapper>
  ),
  "array - colllapsed": (
    <Wrapper>
      <Value data-snapshot value={["item 1", "item 2"]} />
    </Wrapper>
  ),
  "array - expanded": (
    <Wrapper>
      <Value data-snapshot expand value={["item 1", "item 2"]} />
    </Wrapper>
  ),
  "object - empty": (
    <Wrapper>
      <Value data-snapshot value={{}} />
    </Wrapper>
  ),
  "object - collapsed": (
    <Wrapper>
      <Value data-snapshot value={{ name: "Carla", age: 20 }} />
    </Wrapper>
  ),
  "object - expanded": (
    <Wrapper>
      <Value
        data-snapshot
        expand
        style={{ display: "block" }}
        value={{ name: "Carla", age: 20 }}
      />
    </Wrapper>
  ),
  string: (
    <Wrapper>
      <Value data-snapshot value="hello" />
    </Wrapper>
  ),
  null: (
    <Wrapper>
      <Value data-snapshot value={null} />
    </Wrapper>
  ),
};
