import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { PresentedEvent } from "../../../types";
import { useTimelineContext } from "../../../context";
import { TimelineEvent } from "./TimelineEvent";
import { TimelineDuration } from "./TimelineDuration";

export const TimelineRow: FC<{ events: PresentedEvent[] }> = ({ events }) => {
  const {
    getTimePosition,
    timelineLength,
    setSelectedEvent
  } = useTimelineContext();

  const eventElements = useMemo(
    () =>
      events.reduce<JSX.Element[]>((p, e) => {
        return [
          ...p,
          <TimelineEvent
            key={e.key}
            event={e}
            selectEvent={() => setSelectedEvent(e)}
            style={{
              position: "absolute",
              left: getTimePosition(e.timestamp),
              transform: "translateX(-50%) translateY(-50%)"
            }}
          />
        ];
      }, []),
    [events, getTimePosition]
  );

  const durationElements = useMemo(() => {
    let eventStart: number | undefined;

    const mostEvents = events.reduce<JSX.Element[]>((p, e) => {
      // First event to start timeline duration
      if (eventStart === undefined && e.type !== "teardown") {
        eventStart = e.timestamp;
        return p;
      }

      // End of timeline duration
      if (eventStart && e.type === "teardown") {
        const newDuration = (
          <TimelineDuration
            key={p.length}
            style={{
              position: "absolute",
              left: getTimePosition(eventStart),
              right: timelineLength - getTimePosition(e.timestamp)
            }}
          />
        );
        eventStart = undefined;
        return [...p, newDuration];
      }

      return p;
    }, []);

    // Currently unclosed duration
    if (eventStart) {
      return [
        ...mostEvents,
        <TimelineDuration
          key={mostEvents.length}
          style={{
            position: "absolute",
            left: getTimePosition(eventStart),
            right: timelineLength - getTimePosition(Date.now())
          }}
        />
      ];
    }

    return mostEvents;
  }, [events, getTimePosition, timelineLength]);

  return (
    <Container>
      <>{durationElements}</>
      <>{eventElements}</>
    </Container>
  );
};

const Container = styled.div`
  flex-grow: 1;
  position: relative;
  padding: 20px 0;
`;
