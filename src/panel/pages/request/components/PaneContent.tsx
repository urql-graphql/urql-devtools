import React, { useState } from "react";
import styled from "styled-components";
import { Pane } from "../../../components";
import { Response } from "./Response";
import { Schema } from "./Schema";

export const PaneContent = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Pane>
      <Tabs>
        <Tab data-active={`${activeTab === 0}`} onClick={() => setActiveTab(0)}>
          Response
        </Tab>
        <Tab data-active={`${activeTab === 1}`} onClick={() => setActiveTab(1)}>
          Schema
        </Tab>
      </Tabs>
      <PaneBody>
        <PaneSection>
          {activeTab === 0 && <Response />}
          {activeTab === 1 && <Schema />}
        </PaneSection>
      </PaneBody>
    </Pane>
  );
};

const Tabs = styled.menu`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 12px;
`;

const Tab = styled.button`
  padding: 3px 5px;
  border: 1px solid ${(p) => `${p.theme.grey["-1"]}`};
  border-radius: 2px;
  background-color: ${(p) => p.theme.dark["+1"]};
  color: ${(p) => p.theme.grey["+2"]};
  font-size: 11px;
  line-height: 1rem;

  &:first-of-type {
    margin-right: 5px;
  }

  &[data-active="true"] {
    color: ${(p) => p.theme.grey["+4"]};
    background-color: ${(p) => p.theme.dark["+5"]};
  }
`;

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
