import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { print } from "graphql/language/printer";
import { Operation } from "urql";
import { Pane } from "../../../components";
import { TimelinePaneSection } from "./TimelinePaneSection";

export interface DebugEvent {
  type: string;
  message: string;
  operation: Operation;
  data: any;
}

const genGraphQlCodeHiglight = (str: string) => ({
  code: { language: "graphql", code: str }
});

const parseOperation = (op: Operation) => [
  // * Convert the DocumentNode to presentable string
  genGraphQlCodeHiglight(print(op.query)),
  ...(op.variables
    ? [
        {
          title: "Variables",
          ...genGraphQlCodeHiglight(JSON.stringify(op.variables, null, "  "))
        }
      ]
    : [])
];

const getEventSubSections = (e: DebugEvent) =>
  Object.entries(e)
    .filter(([key]) => !["operation", "data"].includes(key))
    .map(([key, val]) => ({ info: [key, val] as [string, string] }));

/** Pane shows additional information about a selected timeline item. */
// TODO: update data structure
export const TimelinePane: FC<{ event: DebugEvent }> = ({ event }) => {
  const eventSubSections = useMemo(() => getEventSubSections(event), [event]);
  const querySubSections = useMemo(() => parseOperation(event.operation), [
    event.operation
  ]);
  const responseSubSections = useMemo(
    () => [genGraphQlCodeHiglight(JSON.stringify(event.data, null, "  "))],
    [event.data]
  );

  return (
    <Container>
      <Pane.Body>
        {event && (
          <>
            <TimelinePaneSection
              title="Event"
              startOpen
              subSections={eventSubSections}
            />
            <TimelinePaneSection title="Query" subSections={querySubSections} />
            <TimelinePaneSection
              title="Response"
              subSections={responseSubSections}
            />
          </>
        )}
      </Pane.Body>
    </Container>
  );
};

const Container = styled(Pane)`
  && {
    background-color: ${p => p.theme.dark["-3"]};
  }
`;
