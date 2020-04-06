import React, { FC, useMemo, ComponentProps } from "react";
import styled from "styled-components";
import { DebugEvent } from "@urql/core";
import ExecutionIcon from "../../../../assets/events/execution.svg";
import OtherIcon from "../../../../assets/events/other.svg";
import TeardownIcon from "../../../../assets/events/teardown.svg";
import UpdateIcon from "../../../../assets/events/update.svg";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

const Svg = styled.svg`
  cursor: pointer;
  filter: brightness(1);
  transition: filter 300ms ease;

  & > * {
    fill: ${(props) => props.theme.grey["0"]};
  }

  &:hover > * {
    fill: ${(props) => props.theme.grey["+8"]};
  }

  &:active > * {
    fill: ${(props) => props.theme.grey["+4"]};
  }
`;

const eventGroupIcon: Record<string, any> = {
  execution: ExecutionIcon,
  update: UpdateIcon,
  teardown: TeardownIcon,
  other: OtherIcon,
};

export const TimelineEvent: FC<
  {
    event: DebugEvent;
  } & ComponentProps<typeof Svg>
> = ({ event, ...svgProps }) => {
  const { targetRef, tooltipProps, isVisible } = useTooltip();

  const iconSize = useMemo(
    () =>
      Object.keys(eventGroupIcon)
        .filter((k) => k !== "other")
        .includes(event.type)
        ? 12
        : 8,
    [event.type]
  );

  const Icon = useMemo(
    () => eventGroupIcon[event.type] || eventGroupIcon.other,
    []
  );

  return (
    <>
      <Svg
        as={Icon}
        {...svgProps}
        width={iconSize}
        height={iconSize}
        ref={targetRef}
      />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>{event.message}</TimelineTooltip>
      )}
    </>
  );
};
