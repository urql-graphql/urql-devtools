import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { ReceivedDebugEvent } from "../../../types";
import { useTimelineContext } from "../../../context";
import { TimelineEvent } from "./TimelineEvent";
import { TimelineDuration } from "./TimelineDuration";

export const TimelineRow: FC<{ events: ReceivedDebugEvent[] }> = ({
  events
}) => {
  const { container, scale, setSelectedEvent } = useTimelineContext();

  const eventElements = useMemo(
    () =>
      events.reduce<JSX.Element[]>((p, e) => {
        return [
          ...p,
          <TimelineEvent
            key={`e-${e.key}`}
            event={e}
            selectEvent={() => setSelectedEvent(e)}
            style={{
              position: "absolute",
              left: scale(e.timestamp),
              transform: "translateX(-50%) translateY(-50%)"
            }}
          />
        ];
      }, []),
    [events, scale]
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
            key={`d-${p.length}`}
            style={{
              position: "absolute",
              left: scale(eventStart),
              right: container.clientWidth - scale(e.timestamp)
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
            left: scale(eventStart),
            right: container.clientWidth - scale(Date.now())
          }}
        />
      ];
    }

    return mostEvents;
  }, [events, scale, container.clientWidth]);

  return (
    <Container>
      <>{durationElements}</>
      <>{eventElements}</>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 20px;
  padding-top: 8px;
  margin-top: 30px;

  & + & {
    margin-top: 8px;
  }
`;
