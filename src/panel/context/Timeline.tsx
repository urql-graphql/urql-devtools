import React, {
  createContext,
  Dispatch,
  useRef,
  useState,
  useCallback,
  useMemo,
  FC,
  SetStateAction,
  useContext,
  useEffect
} from "react";
import { scaleLinear } from "d3-scale";
import { PresentedEvent } from "../types";
import { DevtoolsContext } from "./Devtools";

interface TimelineContextValue {
  events: Record<string, any>;
  selectedEvent: PresentedEvent | null;
  setSelectedEvent: Dispatch<SetStateAction<PresentedEvent | null>>;
  setContainer: (e: HTMLDivElement) => void;
  getTimePosition: (t: number) => number;
  timelineLength: number;
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
        .domain([startTime.current, startTime.current + 30000])
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
  const [events, setEvents] = useState<Record<string, PresentedEvent[]>>({});
  const [selectedEvent, setSelectedEvent] = useState<PresentedEvent | null>(
    null
  );

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
      selectedEvent,
      setSelectedEvent,
      ...domain
    }),
    [domain, events]
  );

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
};
