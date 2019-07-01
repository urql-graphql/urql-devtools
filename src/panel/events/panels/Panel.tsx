import React, { FC, useState, useMemo, useLayoutEffect } from "react";
import styled from "styled-components";
import { Tabs } from "../../components/Tabs";
import { EventPanel, ParsedEvent } from "../../types";
import { QueryPanel } from "./QueryPanel";
import { JsonCode } from "./JsonCode";

/** Pane shows additional information about a selected operation event. */
export const Panel: FC<{ event: ParsedEvent }> = ({ event }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  useLayoutEffect(() => {
    return () => setActiveTab(0);
  }, [event]);

  // Type cast panels
  const panels = useMemo(() => event.panels as EventPanel[], [event]);

  const tabOptions = useMemo(
    () =>
      panels.map((p, i) => ({
        label: p.name,
        value: i
      })),
    [panels]
  );

  const selectedTab = activeTab < tabOptions.length ? activeTab : 0;

  const panelContent = useMemo(() => {
    const activePanel = panels[selectedTab];

    switch (activePanel.name) {
      case "query":
        return <QueryPanel query={activePanel.data} />;

      default:
        return <JsonCode json={activePanel.data || {}} />;
    }
  }, [panels, selectedTab]);

  return (
    <Container>
      <Tabs
        active={selectedTab}
        options={tabOptions}
        setActive={setActiveTab}
      />
      {panelContent}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.dark["-2"]};
  width: 100%;
  height: 400px;
  max-height: 400px;
  overflow: scroll;
  font-size: 12px;

  .react-codemirror2 {
    display: flex;
    flex-grow: 1;

    .CodeMirror {
      height: auto;
      width: 100%;
    }
  }
`;
