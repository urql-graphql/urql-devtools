import React, {
  FC,
  useMemo,
  useState,
  ComponentProps,
  useCallback,
} from "react";
import styled from "styled-components";
import { DebugEvent } from "@urql/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareUp } from "@fortawesome/free-solid-svg-icons";
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
        ref={ref}
      />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>{event.message}</TimelineTooltip>
      )}
    </>
  );
};

export const TimelineEventGroup: FC<ComponentProps<typeof Svg>> = ({
  children,
  ...props
}) => {
  const { ref, tooltipProps } = useTooltip();
  const [isExpanded, setExpanded] = useState(false);

  const handleMouseLeave = useCallback(() => setExpanded(false), []);

  return (
    <>
      <SvgContainer ref={ref} {...props}>
        <Svg
          as={FontAwesomeIcon}
          icon={faCaretSquareUp}
          onClick={() => setExpanded((e) => !e)}
          style={{ width: 10, height: 10 }}
        />
      </SvgContainer>
      {isExpanded && (
        <EventPopout {...tooltipProps} onMouseLeave={handleMouseLeave}>
          {children}
        </EventPopout>
      )}
    </>
  );
};

/** Container to get SVG ref :/ */
const SvgContainer = styled.span`
  display: flex;
`;

const EventPopout = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(p) => p.theme.dark["+2"]};
  padding: 5px;

  & > * + * {
    margin-left: 5px;
  }
`;
