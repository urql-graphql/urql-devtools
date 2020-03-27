import React, { FC, useState, useMemo, useLayoutEffect } from "react";
import { EventPanel, ParsedEvent } from "../../../types";
import { Tabs, Pane, CodeHighlight } from "../../../components";

/** Pane shows additional information about a selected operation event. */
export const EventPane: FC<{ event: ParsedEvent }> = ({ event }) => {
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
        value: i,
      })),
    [panels]
  );

  const selectedTab = activeTab < tabOptions.length ? activeTab : 0;

  const panelContent = useMemo(() => {
    const activePanel = panels[selectedTab];

    if (activePanel.name === "query") {
      return <CodeHighlight code={activePanel.data} language="graphql" />;
    }

    return (
      <CodeHighlight
        code={JSON.stringify(activePanel.data || {}, null, 2)}
        language="json"
      />
    );
  }, [panels, selectedTab]);

  return (
    <Pane>
      <Tabs
        active={selectedTab}
        options={tabOptions}
        setActive={setActiveTab}
      />
      <Pane.Body key={selectedTab}>{panelContent}</Pane.Body>
    </Pane>
  );
};
