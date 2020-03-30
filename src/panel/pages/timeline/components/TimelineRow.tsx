import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { DebugEvent } from "@urql/core";
import { useTimelineContext } from "../../../context";
import { TimelineEvent } from "./TimelineEvent";
import { TimelineDuration } from "./TimelineDuration";
import { TimelineNetworkDuration } from "./TimelineNetworkDuration";

export const TimelineRow: FC<{ events: DebugEvent<string>[] }> = ({
  events,
}) => {
  const { container, scale, setSelectedEvent } = useTimelineContext();

  const eventElements = useMemo(
    () =>
      events.reduce<JSX.Element[]>((p, e) => {
        // Temporary filter until filtering is added
        if (!["execution", "update", "teardown"].includes(e.type)) {
          return p;
        }

        return [
          ...p,
          <TimelineEvent
            key={`e-${p.length}`}
            event={e}
            onClick={() => setSelectedEvent(e)}
            style={{
              position: "absolute",
              left: scale(e.timestamp),
              transform: "translateX(-50%) translateY(-50%)",
            }}
          />,
        ];
      }, []),
    [events, scale]
  );

  const durationElements = useMemo(() => {
    type ReduceState = { elements: JSX.Element[]; start: number | undefined };

    // Network durations
    const reduceNetwork = <T extends string>(
      p: ReduceState,
      e: DebugEvent<T>
    ) => {
      // Request started
      if (p.start === undefined && e.type === "fetchRequest") {
        return {
          ...p,
          start: e.timestamp,
        };
      }

      // Safety condition - shouldn't occur
      if (!p.start) {
        return p;
      }

      // Response
      if (e.type === "fetchResponse") {
        return {
          start: undefined,
          elements: [
            ...p.elements,
            <TimelineNetworkDuration
              key={`n-${p.elements.length}`}
              state="success"
              style={{
                position: "absolute",
                left: scale(p.start),
                right: container.clientWidth - scale(e.timestamp),
                bottom: 0,
              }}
            />,
          ],
        };
      }

      if (e.type === "fetchError" || e.type === "teardown") {
        return {
          start: undefined,
          elements: [
            ...p.elements,
            <TimelineNetworkDuration
              key={`n-${p.elements.length}`}
              state="error"
              style={{
                position: "absolute",
                left: scale(p.start),
                right: container.clientWidth - scale(e.timestamp),
                bottom: 0,
              }}
            />,
          ],
        };
      }

      return p;
    };

    // Alive durations
    const reduceAlive = <T extends string>(
      p: ReduceState,
      e: DebugEvent<T>
    ) => {
      // First event to start timeline duration
      if (p.start === undefined && e.type !== "teardown") {
        return {
          ...p,
          start: e.timestamp,
        };
      }

      // End of timeline duration
      if (p.start && e.type === "teardown") {
        return {
          start: undefined,
          elements: [
            ...p.elements,
            <TimelineDuration
              key={`d-${p.elements.length}`}
              style={{
                position: "absolute",
                left: scale(p.start),
                right: container.clientWidth - scale(e.timestamp),
              }}
            />,
          ],
        };
      }

      return p;
    };

    const reducedDurations = events.reduce<{
      alive: ReduceState;
      network: ReduceState;
    }>(
      (p, e) => ({
        network: reduceNetwork(p.network, e),
        alive: reduceAlive(p.alive, e),
      }),
      {
        alive: { start: undefined, elements: [] },
        network: { start: undefined, elements: [] },
      }
    );

    const finalAliveDuration = reducedDurations.alive.start
      ? [
          <TimelineDuration
            key={`ad-${reducedDurations.alive.elements.length}`}
            style={{
              position: "absolute",
              left: scale(reducedDurations.alive.start),
              right: container.clientWidth - scale(Date.now()),
            }}
          />,
        ]
      : [];

    const finalNetworkDuration = reducedDurations.network.start
      ? [
          <TimelineNetworkDuration
            key={`nd-${reducedDurations.network.elements.length}`}
            state="fetching"
            style={{
              position: "absolute",
              left: scale(reducedDurations.network.start),
              right: container.clientWidth - scale(Date.now()),
              bottom: 0,
            }}
          />,
        ]
      : [];

    return [
      ...reducedDurations.alive.elements,
      ...finalAliveDuration,
      ...reducedDurations.network.elements,
      ...finalNetworkDuration,
    ];
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
