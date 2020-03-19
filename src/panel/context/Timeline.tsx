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

const DEFAULT_WIDTH = 30000;

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
    const endTime = domain.current.zoom * DEFAULT_WIDTH;

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

  const handlePan = useCallback(
    (movement: number) => {
      const endTime = domain.current.start + DEFAULT_WIDTH;
      // Convert pixel delta to time delta
      const scaledDelta = scaleLinear()
        .domain([domain.current.start, endTime])
        .range([0, ref.current.clientWidth])
        .invert(movement);

      // Normalize movement for different zoom levels
      const newStart = 2 * domain.current.start - scaledDelta;

      // Apply movement (limited left movement)
      domain.current = {
        ...domain.current,
        start: newStart < startTime.current ? startTime.current : newStart
      };
    },
    [scale]
  );

  const handleZoom = useCallback((e: WheelEvent) => {
    // Scale movement delta
    const delta = e.deltaY * 0.01;
    const newZoom =
      e.deltaY < 0
        ? (max([0.2, domain.current.zoom + delta]) as number)
        : (min([3, domain.current.zoom + delta]) as number);

    // Gen new domain end based on zoom
    const endTime =
      domain.current.start + (domain.current.zoom + delta) * DEFAULT_WIDTH;

    // Convert pixel delta to time delta based on mouse position
    const scaledDelta = scaleLinear()
      .domain([domain.current.start, endTime])
      .range([0, ref.current.clientWidth])
      .invert(e.clientX - ref.current.clientLeft);

    const zoomDiff = newZoom - domain.current.zoom;
    const startDiff = domain.current.start - scaledDelta;
    const moveFactor = startDiff * zoomDiff;

    const newStart = domain.current.start + moveFactor;
    domain.current = {
      ...domain.current,
      start: newStart < startTime.current ? startTime.current : newStart,
      zoom: newZoom
    };
  }, []);

  // Listen for drag events
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // dragstart -> mousemove -> mouseup
    const dragStartListener = (e: DragEvent) => {
      e.preventDefault();
      ref.current.addEventListener("mousemove", mouseMoveListener);
      window.addEventListener("mouseup", mouseUpListener);
    };

    const mouseMoveListener = (e: MouseEvent) => {
      handlePan(e.movementX);
    };

    const mouseUpListener = () => {
      ref.current.removeEventListener("mousemove", mouseMoveListener);
      window.removeEventListener("mouseup", mouseUpListener);
    };

    ref.current.addEventListener("dragstart", dragStartListener);

    return () => {
      ref.current.removeEventListener("dragstart", dragStartListener);
      ref.current.removeEventListener("mousemove", mouseMoveListener);
      window.removeEventListener("mouseup", mouseUpListener);
    };
  }, []);

  // Listen for zoom events
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const wheelListener = (e: WheelEvent) => {
      if (!e.ctrlKey && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        handlePan(-e.deltaX);
        return;
      }

      e.preventDefault();
      handleZoom(e);
    };

    // * Passive to prevent console warning - we might want to preventDefault
    // * here in future
    ref.current.addEventListener("wheel", wheelListener, { passive: true });

    return () => ref.current.removeEventListener("wheel", wheelListener);
  }, [handleZoom, handlePan]);

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
