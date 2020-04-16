import React, { FC, useMemo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Operation } from "urql";
import { useTimelineContext } from "../../context";
import { Background } from "../../components/Background";
import { TimelineRow, TimelinePane, Tick } from "./components";
import { TimelineSourceIcon } from "./components/TimelineSourceIcon";
import { Settings } from "./components/Settings";

export const Timeline: FC = () => {
  const {
    setContainer,
    scale,
    events,
    eventOrder,
    startTime,
    container,
    selectedEvent,
    setSelectedEvent,
    setPosition,
    filter,
  } = useTimelineContext();
  const [selectedSource, setSelectedSource] = useState<Operation | undefined>();

  // Unmount source pane on event select
  useEffect(() => {
    if (selectedEvent) {
      setSelectedSource(undefined);
    }
  }, [selectedEvent]);

  // Unmount event pane on source select
  useEffect(() => {
    if (selectedSource) {
      setSelectedEvent(undefined);
    }
  }, [selectedSource]);

  // Add keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Back to beginning
      if (e.key === "Home") {
        setPosition(startTime);
      }

      // Skip to current time
      if (e.key === "End") {
        setPosition(Date.now());
      }
    };

    addEventListener("keydown", handleKeyDown, { passive: true });
    return () => removeEventListener("keydown", handleKeyDown);
  }, [setPosition, startTime]);

  const ticks = useMemo(
    () =>
      scale
        ? scale.ticks(getTickCount(container.clientWidth)).map((t) => {
            const delta = t - startTime;

            // Round up numbers (200ms, 300ms, etc)
            const time = Math.round(delta / 1000) * 1000;

            return {
              label: `${time}ms`,
              position: scale(time + startTime),
            };
          })
        : [],
    [scale]
  );

  const handleSourceClick = useCallback(
    (o: Operation) => () =>
      setSelectedSource((current) =>
        current && current.key === o.key ? undefined : o
      ),
    []
  );

  const sources = useMemo<Operation[]>(
    () =>
      eventOrder.map((key) => {
        const source = events[key].find(
          (e) => e.operation.operationName !== "teardown"
        );

        // Only events for given source is teardown
        // Unknown source type
        // TODO: infer type from operation.query
        if (source === undefined) {
          return events[key][0].operation;
        }

        return source.operation;
      }),
    [events, eventOrder]
  );

  const paneProps = useMemo(() => {
    if (selectedSource) {
      return {
        source: selectedSource,
      };
    }

    if (selectedEvent) {
      return {
        event: selectedEvent,
      };
    }
    return {};
  }, [selectedSource, selectedEvent]);

  const content = useMemo(
    () =>
      // We lie about the types to save having to do this check
      // in every child component. This guard is needed.
      !container ? null : (
        <>
          {ticks.map((t, i) => (
            <Tick key={`p-${i}`} label={t.label} style={{ left: t.position }} />
          ))}
          {eventOrder.map((key, i) => (
            <TimelineRow
              key={key}
              events={events[key]}
              style={{
                display: filter.graphqlType.includes(sources[i].operationName)
                  ? undefined
                  : "none",
              }}
            />
          ))}
        </>
      ),
    [container, events, eventOrder, ticks, sources]
  );

  return (
    <>
      <Page>
        <Settings />
        <PageContent>
          <TimelineContainer>
            <TimelineIcons>
              {sources.map((s) => (
                <TimelineSourceIcon
                  key={s.key}
                  title="Source operation"
                  kind={
                    s.operationName === "teardown" ? "query" : s.operationName
                  }
                  onClick={handleSourceClick(s)}
                  style={{
                    display: filter.graphqlType.includes(s.operationName)
                      ? undefined
                      : "none",
                  }}
                />
              ))}
            </TimelineIcons>
            <TimelineList
              ref={setContainer}
              draggable="true"
              key="TimelineList"
            >
              {content}
            </TimelineList>
          </TimelineContainer>
          <TimelinePane {...paneProps} />
        </PageContent>
      </Page>
    </>
  );
};

const Page = styled(Background)`
  background-color: ${(p) => p.theme.dark["0"]};
  @media (min-aspect-ratio: 1/1) {
    flex-direction: column;
  }
`;

const PageContent = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;
  }
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const TimelineIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
  padding-top: 78px;

  > * {
    margin-bottom: 16px;
  }

  > *:after {
    content: "";
    width: 200px;
    height: 200px;
  }
`;

const TimelineList = styled.div`
  cursor: grab;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  padding: 70px 0;
  overflow: hidden;
  &:active {
    cursor: grabbing;
  }
`;

const getTickCount = (width: number) => {
  if (width < 600) {
    return 2;
  }

  if (width < 1300) {
    return 5;
  }

  return 10;
};
