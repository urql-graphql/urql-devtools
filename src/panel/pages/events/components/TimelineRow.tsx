import React, { FC, useMemo, ComponentProps, cloneElement } from "react";
import styled from "styled-components";
import { DebugEvent } from "@urql/core";
import { useTimelineContext } from "../../../context";
import { TimelineEvent, TimelineEventGroup } from "./TimelineEvent";
import {
  TimelineAliveDuration,
  TimelineNetworkDuration,
} from "./TimelineDuration";

export const TimelineRow: FC<
  { events: DebugEvent[] } & ComponentProps<typeof Container>
> = ({ events, ...props }) => {
  const { container, scale, setSelectedEvent, filter } = useTimelineContext();

  const eventElements = useMemo(
    () =>
      events
        .reduce<{ key: number; event: DebugEvent }[][]>((groups, event, i) => {
          if (!filter.source.includes(event.source)) {
            return groups;
          }

          const entry = { key: i, event };

          if (groups.length === 0) {
            return [[entry]];
          }

          const previousIndex = groups.length - 1;
          if (
            scale(event.timestamp) -
              scale(groups[previousIndex][0].event.timestamp) <
            5
          ) {
            return [
              ...groups.slice(0, previousIndex),
              [...groups[previousIndex], entry],
            ];
          }

          return [...groups, [entry]];
        }, [])
        .map((group) => {
          if (group.length === 1) {
            const { event, key } = group[0];
            return (
              <TimelineEvent
                key={`e-${key}`}
                event={event}
                onClick={() =>
                  setSelectedEvent((s) => (s === event ? undefined : event))
                }
                style={{
                  position: "absolute",
                  left: scale(event.timestamp),
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              />
            );
          }

          const groupKey = group.reduce((p, c) => `${p} ${c.key}`, "");

          return (
            <TimelineEventGroup
              key={`group-${groupKey}`}
              style={{
                position: "absolute",
                left: scale(group[0].event.timestamp),
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              {group.map(({ event, key }) => (
                <TimelineEvent
                  key={`e-${key}`}
                  event={event}
                  onClick={() =>
                    setSelectedEvent((s) => (s === event ? undefined : event))
                  }
                />
              ))}
            </TimelineEventGroup>
          );
        }),
    [events, scale]
  );

  const durationElements = useMemo(() => {
    type ReduceState = {
      elements: JSX.Element[];
      start: DebugEvent | undefined;
    };

    // Network durations
    const reduceNetwork = <T extends string>(
      p: ReduceState,
      e: DebugEvent<T>
    ) => {
      const handleClick = () =>
        setSelectedEvent((event) => (event === e ? undefined : e));

      // Request started
      if (p.start === undefined && e.type === "fetchRequest") {
        return {
          ...p,
          start: e,
        };
      }

      // Safety condition - shouldn't occur
      if (!p.start) {
        return p;
      }

      // Response
      if (e.type === "fetchSuccess") {
        return {
          start: undefined,
          elements: [
            ...p.elements,
            <TimelineNetworkDuration
              key={`n-${p.elements.length}`}
              state="success"
              style={{
                position: "absolute",
                left: scale(p.start.timestamp),
                right: container.clientWidth - scale(e.timestamp),
                bottom: 0,
              }}
              onClick={handleClick}
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
                left: scale(p.start.timestamp),
                right: container.clientWidth - scale(e.timestamp),
                bottom: 0,
              }}
              onClick={handleClick}
            />,
          ],
        };
      }

      return p;
    };

    /** Semaphore */
    let activeMutations = 0;

    // Alive durations
    const reduceAlive = <T extends string>(
      p: ReduceState,
      e: DebugEvent<T>
    ) => {
      // Semaphore addition
      if (e.operation.operationName === "mutation" && e.type === "execution") {
        activeMutations++;
      }

      // First event to start timeline duration
      if (p.start === undefined && e.type !== "teardown") {
        return {
          ...p,
          start: e,
        };
      }

      if (p.start === undefined) {
        return p;
      }

      const isMutationResponse =
        e.operation.operationName === "mutation" &&
        (e.type === "update" || e.type === "error");

      // Semaphore removal
      if (isMutationResponse) {
        activeMutations = Math.max(0, activeMutations - 1);
      }

      // End of timeline duration
      if (
        e.type === "teardown" ||
        (isMutationResponse && activeMutations === 0)
      ) {
        return {
          start: undefined,
          elements: [
            ...p.elements,
            <TimelineAliveDuration
              key={`d-${p.elements.length}`}
              style={{
                position: "absolute",
                left: scale(p.start.timestamp),
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
          <TimelineAliveDuration
            key={`ad-${reducedDurations.alive.elements.length}`}
            style={{
              position: "absolute",
              left: scale(reducedDurations.alive.start.timestamp),
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
              left: scale(reducedDurations.network.start.timestamp),
              right: container.clientWidth - scale(Date.now()),
              bottom: 0,
            }}
            onClick={() => setSelectedEvent(reducedDurations.network.start)}
          />,
        ]
      : [];

    return [
      ...reducedDurations.alive.elements,
      ...finalAliveDuration,
      ...reducedDurations.network.elements,
      ...finalNetworkDuration,
    ];
  }, [events, scale, container.clientWidth, setSelectedEvent]);

  return (
    <Container {...props}>
      <>
        {durationElements
          .filter(
            (e) =>
              e.props.style.right < container.clientWidth &&
              e.props.style.left < container.clientWidth
          )
          .map((e) =>
            cloneElement(e, {
              ...e.props,
              style: {
                ...e.props.style,
                left: Math.max(0, e.props.style.left),
                right: Math.max(0, e.props.style.right),
              },
            })
          )}
      </>
      <>
        {eventElements.filter(
          (e) =>
            e.props.style.left > -20 &&
            e.props.style.left < container.clientWidth + 20
        )}
      </>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 20px;
  padding-top: 8px;

  & + & {
    margin-top: 8px;
  }
`;
