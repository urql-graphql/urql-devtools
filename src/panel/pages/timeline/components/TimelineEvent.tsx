import React, { FC, useMemo } from "react";
import { ReceivedDebugEvent } from "../../../types";
import AdditionIcon from "../../../../assets/events/addition.svg";
import OtherIcon from "../../../../assets/events/other.svg";
import TeardownIcon from "../../../../assets/events/teardown.svg";
import UpdateIcon from "../../../../assets/events/update.svg";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

const shapeMap: Record<string, any> = {
  addition: AdditionIcon,
  update: UpdateIcon,
  teardown: TeardownIcon,
  other: OtherIcon
};

export const TimelineEvent: FC<{
  event: ReceivedDebugEvent;
} & Omit<JSX.IntrinsicElements["img"], "ref">> = ({ event, ...svgProps }) => {
  const { ref, tooltipProps, isVisible } = useTooltip();

  const style = useMemo(
    () =>
      ["teardown", "update", "addition"].includes(event.type)
        ? { cursor: "pointer", width: 10, height: 10 }
        : { cursor: "pointer", width: 5, height: 5 },
    [event.type]
  );

  const Icon = useMemo(() => shapeMap[event.type] || shapeMap.other, [
    shapeMap
  ]);

  return (
    <>
      <img
        {...svgProps}
        style={{ ...svgProps.style, ...style }}
        src={Icon}
        ref={ref}
      />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>{event.message}</TimelineTooltip>
      )}
    </>
  );
};
