import React, { FC } from "react";
import styled from "styled-components";
import { Pane } from "../../../components";
import { ReceivedDebugEvent } from "../../../types";
import { TimelineQuerySection } from "./TimelinePaneSection";

/** Pane shows additional information about a selected timeline item. */
// TODO: update data structure
export const TimelinePane: FC<{ event: ReceivedDebugEvent }> = ({ event }) => (
  <Container>
    <Pane.Body>
      {/** Todo: Add event section here */}
      <TimelineQuerySection
        query={event.operation.query}
        variables={event.operation.variables}
      />
      {/** Todo: Add response section here */}
    </Pane.Body>
  </Container>
);

const Container = styled(Pane)`
  background-color: ${p => p.theme.dark["-3"]};
`;
