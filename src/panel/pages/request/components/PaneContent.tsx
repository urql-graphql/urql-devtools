import React, { useState } from "react";
import styled from "styled-components";
import { Pane } from "../../../components";
import { Response } from "./Response";
import { Schema } from "./Schema";

export const PaneContent = ({ children }) => {
  return (
    <Pane>
      <PaneBody>
        <PaneSection>{children}</PaneSection>
      </PaneBody>
    </Pane>
  );
};

const PaneBody = styled(Pane.Body)`
  display: flex;
  flex-grow: 1;
`;

const PaneSection = styled.section`
  color: #fff;
  background: ${(props) => props.theme.dark[0]};
  padding: 20px;
  overflow: auto;
  flex-grow: 1;
  flex-basis: 0;

  h1 {
    background-color: ${(p) => p.theme.dark["+3"]};
    position: sticky;
    top: -20px;
    margin: -20px;
    padding: 2px 10px;
    font-size: 13px;
    font-weight: 400;
    border-bottom: solid 1px ${(p) => p.theme.dark["+5"]};
    z-index: 1;
  }

  h1 + * {
    margin-top: 40px;
  }
`;
