import React, { FC, ComponentProps, useMemo } from "react";
import styled from "styled-components";
import { DebugEvent, Operation } from "@urql/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faStopwatch,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { print } from "graphql";
import { Pane, CodeHighlight } from "../../../../components";
import { useTimelineContext } from "../../../../context";

/** Pane shows additional information about a selected timeline item. */
// TODO: update data structure
export const TimelinePane: FC<
  ({ event: DebugEvent & { duration?: number } } | { source?: Operation }) &
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
const EventSection: FC<{ event: DebugEvent & { duration?: number } }> = ({
  event,
}) => {
  const { startTime } = useTimelineContext();

  const timestamp = useMemo(() => `${event.timestamp - startTime} ms`, [
    startTime,
  ]);

  const metadata = useMemo(
    () => event.data && JSONtoJavascriptString(event.data),
    [event.data]
  );

  return (
    <PaneSection>
      <Pane.Header>Event</Pane.Header>
      <Pane.Body>
        <Pane.Item>
          <Pane.ItemTitle>Event</Pane.ItemTitle>
          <p>{event.type}</p>
        </Pane.Item>
        <Pane.Item>
          <Pane.ItemTitle>Message</Pane.ItemTitle>
          <p>
            <Icon icon={faQuoteLeft} />
            {event.message}
          </p>
        </Pane.Item>
        <Pane.Item>
          <Pane.ItemTitle>Timestamp</Pane.ItemTitle>
          <p>
            <Icon icon={faStopwatch} />
            {timestamp}
          </p>
        </Pane.Item>
        {event.duration && (
          <Pane.Item>
            <Pane.ItemTitle>Duration</Pane.ItemTitle>
            <p>
              <Icon icon={faClock} />
              {(event.duration / 1000).toFixed(2)} seconds
            </p>
          </Pane.Item>
        )}
        {event.data && (
          <Pane.Item>
            <Pane.ItemTitle>Metadata</Pane.ItemTitle>
            <CodeHighlight language={"javascript"} code={metadata} />
          </Pane.Item>
        )}
      </Pane.Body>
    </PaneSection>
  );
};
/** Info about the source operation for the given event. */
const SourceSection: FC<{ operation: Operation }> = ({ operation }) => (
  <PaneSection>
    <Pane.Header>Operation</Pane.Header>
    <Pane.Body>
      <Pane.Item>
        <Pane.ItemTitle>Key</Pane.ItemTitle>
        <p>{operation.key}</p>
      </Pane.Item>
      <Pane.Item>
        <Pane.ItemTitle>Operation type</Pane.ItemTitle>
        <p>{operation.kind}</p>
      </Pane.Item>
      <Pane.Item>
        <Pane.ItemTitle>Query</Pane.ItemTitle>
        <CodeHighlight
          language={"graphql"}
          code={removeTrailingNewline(print(operation.query))}
        />
      </Pane.Item>
      <Pane.Item>
        <Pane.ItemTitle>Variables</Pane.ItemTitle>
        <CodeHighlight
          language={"javascript"}
          code={JSONtoJavascriptString(
            (operation.variables || {}) as Record<string, unknown>
          )}
        />
      </Pane.Item>
    </Pane.Body>
  </PaneSection>
);

const Container = styled(Pane)`
  background-color: ${(p) => p.theme.colors.canvas.base};
`;

const Body = styled(Pane.Body)`
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: column;
  }
`;

const PaneSection = styled.section`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: ${(p) => p.theme.colors.textDimmed.base};
  box-sizing: border-box;
  background: ${(p) => p.theme.colors.canvas.base};

  p {
    font-size: ${(p) => p.theme.fontSizes.body.m};
    line-height: ${(p) => p.theme.lineHeights.body.m};
    margin: 0;
  }

  @media (max-aspect-ratio: 1/1) {
    flex-basis: 50%;
    flex-grow: 1;

    & + & {
      max-height: 100%;
      min-width: 50%;
      border-left: solid 1px ${(p) => p.theme.colors.divider.base};
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
      border-top: solid 1px ${(p) => p.theme.colors.divider.base};
    }
  }
`;

const GetStartedSection = styled(PaneSection)`
  flex-grow: 1;
  padding: ${(p) => p.theme.space[6]};
  text-align: center;
  color: ${(p) => p.theme.colors.textDimmed.base};
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: ${(p) => p.theme.space[2]};
`;

const removeTrailingNewline = (s: string) =>
  s.substring(0, s.lastIndexOf("\n"));

const JSONtoJavascriptString = (o: Record<string, unknown>) =>
  JSON.stringify(o, null, 2).replace(/"([^"]+)":/g, "$1:");
