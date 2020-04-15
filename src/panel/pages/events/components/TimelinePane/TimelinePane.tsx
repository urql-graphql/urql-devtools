import React, { FC, ComponentProps, useMemo } from "react";
import styled from "styled-components";
import { DebugEvent, Operation } from "@urql/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { print } from "graphql";
import { Pane, CodeHighlight } from "../../../../components";
import { useTimelineContext } from "../../../../context";

/** Pane shows additional information about a selected timeline item. */
// TODO: update data structure
export const TimelinePane: FC<
  ({ event: DebugEvent } | { source: Operation } | {}) &
    ComponentProps<typeof Container>
> = ({ event, source, ...props }) => {
  const content = useMemo(() => {
    if (source) {
      return (
        <>
          <SourceSection operation={source} />
        </>
      );
    }

    if (event) {
      return (
        <>
          <EventSection event={event} />
          <SourceSection operation={event.operation} />
        </>
      );
    }

    return (
      <GetStartedSection>
        Click around on the timeline to get started...
      </GetStartedSection>
    );
  }, [event, source]);

  return (
    <Container {...props}>
      <Body>{content}</Body>
    </Container>
  );
};

/** Info about the event clicked by the user. */
const EventSection: FC<{ event: DebugEvent }> = ({ event }) => {
  const { startTime } = useTimelineContext();

  const timestamp = useMemo(() => `${event.timestamp - startTime}ms`, [
    startTime,
  ]);

  const metadata = useMemo(() => JSONtoJavascriptString(event.data), [
    event.data,
  ]);

  return (
    <PaneSection>
      <Heading>Event</Heading>
      <p>{event.type}</p>
      <Heading>Message</Heading>
      <p>
        <Icon icon={faQuoteLeft} />
        {event.message}
      </p>
      <Heading>Timestamp</Heading>
      <p>
        <Icon icon={faStopwatch} />
        {timestamp}
      </p>
      {event.data && (
        <>
          <br />
          <Heading>Metadata</Heading>
          <CodeHighlight language={"javascript"} code={metadata} />
        </>
      )}
    </PaneSection>
  );
};
/** Info about the source operation for the given event. */
const SourceSection: FC<{ operation: Operation }> = ({ operation }) => (
  <PaneSection>
    <Heading>Key</Heading>
    <p>{operation.key}</p>
    <Heading>Operation type</Heading>
    <p>{operation.operationName}</p>
    <br />
    <Heading>Query</Heading>
    <CodeHighlight
      language={"graphql"}
      code={removeTrailingNewline(print(operation.query))}
    />
    <Heading>Variables</Heading>
    <CodeHighlight
      language={"javascript"}
      code={JSONtoJavascriptString(operation.variables || {})}
    />
  </PaneSection>
);

const Container = styled(Pane)`
  background-color: ${(p) => p.theme.dark["+3"]};
`;

const Body = styled(Pane.Body)`
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: column;
  }
`;

const Heading = styled.h3`
  color: #fff;
  font-size: 14px;
  font-weight: normal;
  margin-top: 14px;
  margin-bottom: 5px;

  &:first-child {
    margin-top: 0;
  }
`;

const PaneSection = styled.section`
  color: ${(p) => p.theme.grey["+5"]};
  box-sizing: border-box;
  background: ${(props) => props.theme.dark[0]};
  padding: 20px;
  overflow: scroll;

  p {
    font-size: 12px;
    margin: 10px 0;
  }

  @media (max-aspect-ratio: 1/1) {
    flex-basis: 50%;
    flex-grow: 1;

    & + & {
      max-height: 100%;
      min-width: 50%;
      border-left: solid 1px ${(p) => p.theme.dark["+3"]};
    }
  }

  @media (min-aspect-ratio: 1/1) {
    &:only-child {
      flex-grow: 1;
    }
    &:first-child:not(:only-child) {
      max-height: 50%;
      height: min-content;
    }

    & + & {
      flex-grow: 1;
      flex-basis: 0;
      border-top: solid 1px ${(p) => p.theme.dark["+3"]};
    }
  }
`;

const GetStartedSection = styled(PaneSection)`
  flex-grow: 1;
  padding: 50px 30px;
  text-align: center;
  color: ${(p) => p.theme.grey["0"]};
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`;

const removeTrailingNewline = (s: string) =>
  s.substring(0, s.lastIndexOf("\n"));

const JSONtoJavascriptString = (o: object) =>
  JSON.stringify(o, null, 2).replace(/"([^"]+)":/g, "$1:");
