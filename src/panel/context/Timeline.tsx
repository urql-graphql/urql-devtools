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
import { scaleLinear, ScaleLinear } from "d3-scale";
import { max, min } from "d3-array";
import { ReceivedDebugEvent } from "../types";
import { DevtoolsContext } from "./Devtools";

interface TimelineContextValue {
  selectedEvent?: ReceivedDebugEvent;
  setSelectedEvent: Dispatch<SetStateAction<ReceivedDebugEvent | undefined>>;
  container: HTMLDivElement;
  setContainer: (e: HTMLDivElement) => void;
  events: Record<string, ReceivedDebugEvent[]>;
  scale: ScaleLinear<number, number>;
  startTime: number;
}

const TimelineContext = createContext<TimelineContextValue>(null as any);

export const useTimelineContext = () => useContext(TimelineContext);

const useTimelineDomain = () => {
  const startTime = useRef(Date.now());
  const domain = useRef({
    start: startTime.current,
    zoom: 1
  });
  const ref = useRef<HTMLDivElement>(undefined as any);
  const [scale, setScale] = useState<{
    scale: TimelineContextValue["scale"];
  }>({
    scale: undefined as any
  });

  const createScale = useCallback(() => {
    if (!ref.current) {
      return;
    }

    // 30000ms at 1x zoom
    const endTime = domain.current.zoom * 30000;

    const newScale = scaleLinear()
      .domain([domain.current.start, endTime])
      .range([0, ref.current.clientWidth]);

    setScale(oldScale => {
      if (
        oldScale.scale &&
        // Scale hasn't changed
        newScale(100) === oldScale.scale(100) &&
        // New changes aren't visible to the user (outside of view)
        Date.now() > domain.current.start + endTime
      ) {
        return oldScale;
      }

      return {
        scale: scaleLinear()
          .domain([domain.current.start, domain.current.start + endTime])
          .range([0, ref.current.clientWidth])
      };
    });
  }, [setScale]);

  const setContainer = useCallback<TimelineContextValue["setContainer"]>(r => {
    ref.current = r;
    createScale();
  }, []);

  const handlePan = useCallback((e: WheelEvent) => {
    // Horizontal and vertical scroll can be used (max delta)
    // Gets largest axis of movement
    const delta =
      max([Math.abs(e.deltaX), Math.abs(e.deltaY)]) === Math.abs(e.deltaX)
        ? e.deltaX
        : e.deltaY;

    // Scale mouse movement to zoom delta
    const scaledDelta = delta * 10;

    // Normalize movement for different zoom levels
    const newStart = domain.current.start + domain.current.zoom * scaledDelta;

    // Apply movement (limited left movement)
    domain.current = {
      ...domain.current,
      start: max([newStart, startTime.current]) as number
    };
  }, []);

  const handleZoom = useCallback((e: WheelEvent) => {
    // Scale movement delta
    const delta = e.deltaY * 0.01;
    const newZoom =
      e.deltaY < 0
        ? (max([0.2, domain.current.zoom + delta]) as number)
        : (min([3, domain.current.zoom + delta]) as number);

    domain.current = {
      ...domain.current,
      zoom: newZoom
    };
  }, []);

  // Listen for scroll events
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const listener = (e: WheelEvent) => {
      if (!e.ctrlKey) {
        return handlePan(e);
      }

      if (e.deltaY) {
        return handleZoom(e);
      }
    };

    ref.current.addEventListener("wheel", listener);
    return () => removeEventListener("wheel", listener);
  }, []);

  // Check scale each animation frame
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
      container: ref.current,
      setContainer,
      startTime: startTime.current,
      scale: scale.scale
    }),
    [scale, setContainer]
  );
};

export const TimelineProvider: FC = ({ children }) => {
  const { addMessageHandler } = useContext(DevtoolsContext);
  const domain = useTimelineDomain();
  const [events, setEvents] = useState<Record<string, ReceivedDebugEvent[]>>(
    {}
  );
  const [selectedEvent, setSelectedEvent] = useState<
    ReceivedDebugEvent | undefined
  >(undefined);

  useEffect(() => {
    let count = 0;

    // Todo - add debug event type to Devtools context
    return addMessageHandler(message => {
      // @ts-ignore
      if (message.type !== "debug") {
        return;
      }

      const receivedEvent = {
        key: count++,
        timestamp: (message as any).timestamp,
        ...(message as any).data
      };
      const opKey = receivedEvent.operation.key;

      setEvents(e => ({
        ...e,
        [opKey]: [...(e[opKey] || []), receivedEvent]
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
