import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { useTimelineContext } from "../../context";
import { Background } from "../../components/Background";
import { TimelineRow, TimelinePane, Tick } from "./components";
import { TimelineIcon } from "./components/TimelineIcon";

export const Timeline: FC = () => {
  const {
    setContainer,
    scale,
    events,
    startTime,
    container,
    selectedEvent,
  } = useTimelineContext();

  const ticks = useMemo(
    () =>
      scale
        ? scale.ticks(getTickCount(container.clientWidth)).map((t) => ({
            label: `${t - startTime}ms`,
            position: scale(t),
          }))
        : [],
    [scale]
  );

  const operations = useMemo(
    () =>
      Object.entries(events).map(([key, eventList]) => ({
        key,
        operationName: eventList[0].operation.operationName,
      })),
    [events]
  );

  // We lie about the types to save having to do this check
  // in every component. This guard is needed.
  if (!container)
    return (
      <Page>
        {/* Key is needed to retain the order for the ref */}
        <TimelineList ref={setContainer} key="TimelineList" />
      </Page>
    );

  return (
    <Page>
      <TimelineIcons>
        {operations.map((op) => (
          <TimelineIcon key={op.key} operation={op.operationName} />
        ))}
      </TimelineIcons>
      <TimelineList ref={setContainer} draggable="true" key="TimelineList">
        {ticks.map((t) => (
          <Tick
            key={`p-${t.position}`}
            label={t.label}
            style={{ left: t.position }}
          />
        ))}
        {Object.entries(events).map(([key, eventList]) => (
          <TimelineRow key={key} events={eventList} />
        ))}
      </TimelineList>
      {selectedEvent && <TimelinePane event={selectedEvent} />}
    </Page>
  );
};

const SPACING = 40;
const ROW_PADDING = 8;

const Page = styled(Background)`
  background-color: ${(p) => p.theme.dark["0"]};
`;

const TimelineIcons = styled.div`
  background-color: ${(p) => p.theme.dark["-3"]};
  display: grid;
  justify-content: center;
  grid-template-rows: 20px;
  grid-row-gap: ${ROW_PADDING * 2}px;
  width: ${SPACING}px;
  /* TimelineList outer margin + inner margin + padding */
  padding: ${SPACING + ROW_PADDING + 30}px 0;
  z-index: 1;
`;

const TimelineList = styled.div`
  cursor: grab;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
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
