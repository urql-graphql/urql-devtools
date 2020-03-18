import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { useTimelineContext } from "../../context";
import { TimelineRow, Tick } from "./components";

export const Timeline: FC = () => {
  const {
    setContainer,
    scale,
    events,
    startTime,
    container
  } = useTimelineContext();

  const ticks = useMemo(
    () =>
      scale &&
      scale.ticks(getTickCount(container.current.clientWidth)).map(t => ({
        label: `${t - startTime}ms`,
        position: scale(t)
      })),
    [scale]
  );

  // We lie about the types to save having to do this check
  // in every component. This guard is needed.
  if (!scale) return <Container ref={setContainer} />;

  return (
    <Container ref={setContainer}>
      {ticks.map(t => (
        <Tick
          key={`p-${t.position}`}
          label={t.label}
          style={{ left: t.position }}
        />
      ))}
      {Object.entries(events).map(([key, eventList]) => (
        <TimelineRow key={key} events={eventList} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
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
