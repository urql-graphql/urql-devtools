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
    startTime,
    container,
    selectedEvent,
    setSelectedEvent,
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
      Object.values(events).map((eventList) => {
        const source = eventList.find(
          (e) => e.operation.operationName !== "teardown"
        );

        // Only events for given source is teardown
        // Unknown source type
        // TODO: infer type from operation.query
        if (source === undefined) {
          return eventList[0].operation;
        }

        return source.operation;
      }),
    [events]
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
    return undefined;
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
          {Object.entries(events).map(([key, eventList]) => (
            <TimelineRow key={key} events={eventList} />
          ))}
        </>
      ),
    [container, events, ticks]
  );

  return (
    <Page>
      <PageContent>
        <Settings />
        <TimelineContainer>
          <TimelineIcons>
            {sources.map((s) => (
              <TimelineSourceIcon
                key={s.key}
                kind={
                  s.operationName === "teardown" ? "query" : s.operationName
                }
                onClick={handleSourceClick(s)}
              />
            ))}
          </TimelineIcons>
          <TimelineList ref={setContainer} draggable="true" key="TimelineList">
            {content}
          </TimelineList>
        </TimelineContainer>
      </PageContent>
      {paneProps && <TimelinePane {...paneProps} />}
    </Page>
  );
};

const SPACING = 40;
const ROW_PADDING = 8;

const Page = styled(Background)`
  background-color: ${(p) => p.theme.dark["0"]};
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const TimelineIcons = styled.div`
  background-color: ${(p) => p.theme.dark["-3"]};
  display: grid;
  justify-content: center;
  grid-template-rows: 20px;
  grid-row-gap: ${ROW_PADDING * 2}px;
  /* TimelineList outer margin + inner margin + padding */
  padding: ${SPACING + ROW_PADDING + 30}px 0;
  position: relative;
  width: ${SPACING}px;
  z-index: 1;
`;

const TimelineList = styled.div`
  cursor: grab;
  display: flex;
  width: calc(100% - ${SPACING}px);
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  margin: ${SPACING}px 0;
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
