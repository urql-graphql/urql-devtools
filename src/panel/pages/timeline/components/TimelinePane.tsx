import React, { FC } from "react";
import styled from "styled-components";
import { Pane } from "../../../components";
import { TimelinePaneSection } from "./TimelinePaneSection";

/** Pane shows additional information about a selected timeline item. */
// TODO: update data structure
export const TimelinePane: FC<{ event: any; sections: any }> = ({
  // event,
  sections
}) => (
  <Container>
    <Pane.Body>
      {sections &&
        sections.map(section => (
          <TimelinePaneSection
            key={section.title}
            title={section.title}
            timestamp={section.timestamp}
            startOpen={section.startOpen}
            subSections={section.subSections}
          />
        ))}
    </Pane.Body>
  </Container>
);

const Container = styled(Pane)`
  && {
    background-color: ${p => p.theme.dark["-3"]};
  }
`;
