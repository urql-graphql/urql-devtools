import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { DebugEvent } from "@urql/core";
import ExecutionIcon from "../../../../assets/events/execution.svg";
import OtherIcon from "../../../../assets/events/other.svg";
import TeardownIcon from "../../../../assets/events/teardown.svg";
import UpdateIcon from "../../../../assets/events/update.svg";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

const eventGroupIcon: Record<string, any> = {
  execution: ExecutionIcon,
  update: UpdateIcon,
  teardown: TeardownIcon,
  other: OtherIcon,
};

const Icon = styled.img<{ size: number }>`
  cursor: "pointer";
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
`;

export const TimelineEvent: FC<
  {
    event: DebugEvent<string>;
  } & Omit<JSX.IntrinsicElements["img"], "ref">
> = ({ event, ...svgProps }) => {
  const { ref, tooltipProps, isVisible } = useTooltip();

  const iconSize = useMemo(
    () =>
      Object.keys(eventGroupIcon)
        .filter((k) => k !== "other")
        .includes(event.type)
        ? 12
        : 8,
    [event.type]
  );

  const svgIcon = useMemo(
    () => eventGroupIcon[event.type] || eventGroupIcon.other,
    []
  );

  return (
    <>
      <Icon {...svgProps} size={iconSize} src={svgIcon} ref={ref} />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>{event.message}</TimelineTooltip>
      )}
    </>
  );
};
