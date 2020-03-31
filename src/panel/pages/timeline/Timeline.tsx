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
        <TimelineContainer>
          {/* Key is needed to retain the order for the ref */}
          <TimelineList ref={setContainer} key="TimelineList" />
        </TimelineContainer>
      </Page>
    );

  return (
    <Page>
      <TimelineContainer>
        <TimelineIcons>
          {operations.map((op) => (
            <TimelineIcon key={op.key} operation={op.operationName} />
          ))}
        </TimelineIcons>
        <TimelineList ref={setContainer} draggable="true" key="TimelineList">
          {ticks.map((t, i) => (
            <Tick key={`p-${i}`} label={t.label} style={{ left: t.position }} />
          ))}
          {Object.entries(events).map(([key, eventList]) => (
            <TimelineRow key={key} events={eventList} />
          ))}
        </TimelineList>
      </TimelineContainer>
      {selectedEvent && <TimelinePane event={selectedEvent} />}
    </Page>
  );
};

const SPACING = 40;
const ROW_PADDING = 8;

const Page = styled(Background)`
  background-color: ${(p) => p.theme.dark["0"]};
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
