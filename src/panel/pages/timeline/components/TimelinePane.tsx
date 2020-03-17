import React, { FC, useState, useMemo, useLayoutEffect } from "react";
import styled from "styled-components";
import { EventPanel, ParsedEvent } from "../../../types";
import { Tabs, Pane, CodeHighlight } from "../../../components";
import { TimelinePaneSection } from "./TimelinePaneSection";

/** Pane shows additional information about a selected operation event. */
export const TimelinePane = ({ event }) => {
  // Type cast panels
  //   const panels = useMemo(() => event.panels as EventPanel[], [event]);

  //   const panelContent = useMemo(() => {
  //     const activePanel = panels[selectedTab];

  //     if (activePanel.name === "query") {
  //       return <CodeHighlight code={activePanel.data} language="graphql" />;
  //     }

  //     return (
  //       <CodeHighlight
  //         code={JSON.stringify(activePanel.data || {}, null, 2)}
  //         language="json"
  //       />
  //     );
  //   }, [panels]);

  return (
    <Container>
      <Pane.Body>
        <TimelinePaneSection title="test" timestamp={3000} />
      </Pane.Body>
    </Container>
  );
};

const Container = styled(Pane)`
  && {
    background-color: ${p => p.theme.dark["-3"]};
  }
`;
