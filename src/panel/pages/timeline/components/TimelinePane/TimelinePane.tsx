import React, { FC, ComponentProps } from "react";
import styled from "styled-components";
import { DebugEvent, Operation } from "@urql/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRss,
  faQuoteLeft,
  faStopwatch,
  faKey,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { print } from "graphql";
import { Pane, CodeHighlight } from "../../../../components";

/** Pane shows additional information about a selected timeline item. */
// TODO: update data structure
export const TimelinePane: FC<
  { event: DebugEvent } & ComponentProps<typeof Container>
> = ({ event, ...props }) => {
  return (
    <Container {...props}>
      <Body>
        <EventSection event={event} />
        <SourceSection operation={event.operation} />
      </Body>
    </Container>
  );
};

/** Info about the event clicked by the user. */
const EventSection: FC<{ event: DebugEvent }> = ({ event }) => (
  <PaneSection>
    <h1>Event</h1>
    <p>
      <Icon icon={faRss} />
      <b style={{ fontFamily: '"IBM Plex Mono", monospace' }}>{event.type}</b>
    </p>
    <p>
      <Icon icon={faQuoteLeft} />
      {event.message}
    </p>
    <p>
      <Icon icon={faStopwatch} />
      {event.timestamp}
    </p>
    {event.data && (
      <>
        <h2>Metadata</h2>
        <CodeHighlight
          language={"javascript"}
          code={JSON.stringify(event.data, null, 2)}
        />
      </>
    )}
  </PaneSection>
);

/** Info about the source operation for the given event. */
const SourceSection: FC<{ operation: Operation }> = ({ operation }) => (
  <PaneSection>
    <h1>Source</h1>
    <p>
      <Icon icon={faKey} /> {operation.key}
    </p>
    <p>
      <Icon icon={faVenusMars} />
      {operation.operationName}
    </p>
    {console.log(
      print(operation.query).substring(
        0,
        print(operation.query).lastIndexOf("\n")
      )
    )}

    <h2>Query</h2>
    <CodeHighlight
      language={"graphql"}
      code={removeTrailingNewline(print(operation.query))}
    />
    <h2>Variables</h2>
    <CodeHighlight
      language={"javascript"}
      code={JSON.stringify(operation.variables || {}, null, 2)}
    />
  </PaneSection>
);

const Container = styled(Pane)`
  background-color: ${(p) => p.theme.dark["-3"]};
`;

const Body = styled(Pane.Body)`
  display: flex;
  flex-direction: row;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: column;
  }
`;

const PaneSection = styled.section`
  color: #fff;
  background: ${(props) => props.theme.dark[0]};
  padding: 10px;
  margin: 10px;
  flex-grow: 1;

  h1 {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 20px;
  }

  h2 {
    margin-top: 20px;
    font-size: 14px;
  }

  p {
    font-size: 12px;
    margin: 20px 10px;
  }

  @media (max-aspect-ratio: 1/1) {
    flex-basis: 0;
    max-height: 100%;
    overflow: scroll;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 1em;
`;

const removeTrailingNewline = (s: string) =>
  s.substring(0, s.lastIndexOf("\n"));
