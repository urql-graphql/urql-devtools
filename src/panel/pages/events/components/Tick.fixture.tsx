import React from "react";
import styled from "styled-components";
import { Tick } from "./Tick";

const Wrapper = styled.div`
  display: flex;
  background: ${(props) => props.theme.dark["+2"]};
  flex-grow: 1;
  padding: 40px;
`;

export default {
  basic: (
    <Wrapper data-snapshot>
      <Tick data-snapshot style={{ left: 20 }} label={"200ms"} />
    </Wrapper>
  ),
};
