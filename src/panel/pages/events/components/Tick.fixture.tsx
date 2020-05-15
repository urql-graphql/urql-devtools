import React from "react";
import styled from "styled-components";
import { Tick } from "./Tick";

const Wrapper = styled.div`
  margin-left: 20px;
  min-width: 100px;
  position: relative;
`;

export default {
  basic: (
    <Wrapper data-snapshot>
      <Tick data-snapshot style={{ left: 20 }} label={"200ms"} />
    </Wrapper>
  ),
};
