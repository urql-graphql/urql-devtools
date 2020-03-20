import React, { FC, ComponentProps } from "react";
import styled from "styled-components";
import { Pane } from "../../../../components";
import { ReceivedDebugEvent } from "../../../../types";
import { TimelineQuerySection } from "./PaneSection";

/** Pane shows additional information about a selected timeline item. */
// TODO: update data structure
export const TimelinePane: FC<{ event: ReceivedDebugEvent } & ComponentProps<
  typeof Container
>> = ({ event, ...props }) => (
  <Container {...props}>
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
