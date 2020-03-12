import React, {
  createContext,
  useRef,
  useState,
  useCallback,
  useMemo,
  FC,
  useContext,
  useEffect
} from "react";
import { scaleLinear } from "d3-scale";
import { ParsedEvent } from "../types";
import {
  TimelineTooltip,
  TooltipPosition
} from "../pages/timeline/components/TimelineTooltip";
import { DevtoolsContext } from "./Devtools";

interface TimelineContextValue {
  events: Record<string, any>;
  setContainer: (e: HTMLDivElement) => void;
  getTimePosition: (t: number) => number;
  timelineLength: number;
  setTooltipPosition: React.Dispatch<
    React.SetStateAction<TooltipPosition | null>
  >;
}

const TimelineContext = createContext<TimelineContextValue>(null as any);

export const useTimelineContext = () => useContext(TimelineContext);

const useTimelineDomain = () => {
  const startTime = useRef(Date.now());
  const ref = useRef<HTMLElement>(undefined as any);
  const [scale, setScale] = useState<{
    scale: TimelineContextValue["getTimePosition"];
  }>({
    scale: undefined as any
  });

  const createScale = useCallback(() => {
    if (!ref.current) {
      return;
    }

    setScale({
      scale: scaleLinear()
        .domain([startTime.current, Date.now()])
        .range([0, ref.current.clientWidth])
    });
  }, [setScale]);

  const setContainer = useCallback<TimelineContextValue["setContainer"]>(r => {
    ref.current = r;
    createScale();
  }, []);

  useEffect(() => {
    const render = () => {
      window.requestAnimationFrame(() => {
        createScale();
        render();
      });
    };

    render();
  }, []);

  return useMemo(
    () => ({
      setContainer,
      getTimePosition: scale.scale,
      timelineLength: ref.current && ref.current.clientWidth
    }),
    [scale]
  );
};

export const TimelineProvider: FC = ({ children }) => {
  const { addMessageHandler } = useContext(DevtoolsContext);
  const domain = useTimelineDomain();
  const [events, setEvents] = useState<Record<string, ParsedEvent[]>>({});
  // TODO: add tooltip message state
  const [
    tooltipPosition,
    setTooltipPosition
  ] = React.useState<TooltipPosition | null>(null);

  useEffect(() => {
    return addMessageHandler(message => {
      if (message.type === "init" || message.type === "disconnect") {
        return;
      }

      const key =
        message.type === "operation"
          ? message.data.key
          : message.data.operation.key;
      setEvents(e => ({
        ...e,
        [key]: [...(e[key] || []), message]
      }));
    });
  }, [addMessageHandler]);

  const value = useMemo(
    () => ({
      events,
      setTooltipPosition,
      ...domain
    }),
    [domain, events]
  );

  return (
    <TimelineContext.Provider value={value}>
      {/* TimelineTooltip rendered here so the position
          doesn't have to be passed with the setter */}
      {tooltipPosition && <TimelineTooltip position={tooltipPosition} />}
      {children}
    </TimelineContext.Provider>
  );
};
