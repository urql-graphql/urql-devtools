import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { print } from "graphql/language/printer";
import { Operation } from "urql";
import { Pane } from "../../../components";
import { ReceivedDebugEvent } from "../../../types";
import { TimelinePaneSection, TimelineQueryInfo } from "./TimelinePaneSection";

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

const getEventSubSections = (e: ReceivedDebugEvent) =>
  Object.entries(e)
    .filter(([key]) => !["operation", "data"].includes(key))
    .map(([key, val]) => ({ info: [key, val] as [string, string] }));

/** Pane shows additional information about a selected timeline item. */
// TODO: update data structure
export const TimelinePane: FC<{ event: ReceivedDebugEvent }> = ({ event }) => (
  <Container>
    <Pane.Body>
      {/** Todo: Add event section here */}
      <TimelineQueryInfo
        query={event.operation.query}
        variables={event.operation.variables}
      />
      {/** Todo: Add response section here */}
    </Pane.Body>
  </Container>
);

const Container = styled(Pane)`
  && {
    background-color: ${p => p.theme.dark["-3"]};
  }
`;
