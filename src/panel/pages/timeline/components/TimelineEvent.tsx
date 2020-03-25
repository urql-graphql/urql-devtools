import React, { FC, useMemo } from "react";
import styled, {
  css,
  FlattenSimpleInterpolation,
  FlattenInterpolation,
  ThemeProps,
  DefaultTheme
} from "styled-components";
import { ReceivedDebugEvent } from "../../../types";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

const EVENT_SIZE = "10px";
const shapeMap: Record<
  string,
  | FlattenSimpleInterpolation
  | FlattenInterpolation<ThemeProps<DefaultTheme>>
  | undefined
> = {
  addition: css`
    border-radius: 50%;
  `,
  update: css`
    border-radius: 0%;
  `,
  teardown: css`
    position: relative;
    background-color: transparent;
    &:before,
    &:after {
      content: " ";
      position: absolute;
      height: 100%;
      width: calc(${EVENT_SIZE} / 3);
    }
    &:before {
      background-color: ${p => p.theme.grey["+3"]};
      transform: translateX(100%) rotate(45deg);
    }
    &:after {
      background-color: ${p => p.theme.grey["+3"]};
      transform: translateX(100%) rotate(-45deg);
    }
  `
};

const eventTypeMapping = {
  addition: ["query", "mutation", "subscription"],
  mutation: ["response", "error"],
  teardown: ["teardown"]
};

const EventShape = styled.div<JSX.IntrinsicElements["div"] & { group: string }>`
  background-color: ${p => p.theme.grey["+3"]};
  cursor: pointer;
  height: ${EVENT_SIZE};
  width: ${EVENT_SIZE};
  ${p => shapeMap[p.group]};
`;

export const TimelineEvent: FC<{
  event: ReceivedDebugEvent;
  selectEvent: () => void;
} & Omit<JSX.IntrinsicElements["div"], "event">> = ({
  event,
  selectEvent,
  ...elementProps
}) => {
  const { ref, tooltipProps, isVisible } = useTooltip();
  const eventGroup = useMemo(() => {
    const group = Object.entries(eventTypeMapping).find(([, v]) =>
      v.includes(event.type)
    );
    if (!group) throw new Error("The event type was not found");

    return group[0];
  }, [event.type]);

  return (
    <>
      <EventShape
        {...elementProps}
        group={eventGroup}
        ref={ref}
        onClick={selectEvent}
      />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>{event.message}</TimelineTooltip>
      )}
    </>
  );
};
