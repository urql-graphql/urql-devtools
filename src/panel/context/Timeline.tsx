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
  useEffect,
} from "react";
import { scaleLinear, ScaleLinear } from "d3-scale";
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
    zoom: 1,
  });
  const ref = useRef<HTMLDivElement>(undefined as any);
  const [scale, setScale] = useState<{
    scale: TimelineContextValue["scale"];
  }>({
    scale: undefined as any,
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

    setScale((oldScale) => {
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
          .range([0, ref.current.clientWidth]),
      };
    });
  }, [setScale]);

  const setContainer = useCallback<TimelineContextValue["setContainer"]>(
    (r) => {
      ref.current = r;
      createScale();
    },
    []
  );

  const handlePan = useCallback(
    (movement: number) => {
      const endTime =
        domain.current.start + DEFAULT_WIDTH * domain.current.zoom;
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
        start: Math.max(startTime.current, newStart),
      };
    },
    [scale]
  );

  const handleZoom = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * 0.01;
    const newZoom =
      e.deltaY < 0
        ? Math.max(0.2, domain.current.zoom + delta)
        : Math.min(3, domain.current.zoom + delta);
    const endTime = domain.current.start + domain.current.zoom * DEFAULT_WIDTH;
    const scale = scaleLinear()
      .domain([domain.current.start, endTime])
      .range([0, ref.current.clientWidth]);
    const scaleFactor = newZoom / domain.current.zoom;
    const mouseTime = scale.invert(e.clientX);
    const differenceFromStart = mouseTime - domain.current.start;
    const newDifferenceFromStart = differenceFromStart * scaleFactor;
    const newStart = mouseTime - newDifferenceFromStart;
    domain.current = {
      ...domain.current,
      start: Math.max(newStart, startTime.current),
      zoom: newZoom,
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

    // * Passive=false to prevent console warning as it uses preventDefault
    ref.current.addEventListener("wheel", wheelListener, { passive: false });

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
      scale: scale.scale,
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
      // TODO!: Fix this mess
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      if (message.type !== "debug") {
        return;
      }

      const receivedEvent = {
        key: count++,
        timestamp: message.timestamp,
        ...message.data,
      };
      const opKey = receivedEvent.operation.key;

      setEvents((e) => ({
        ...e,
        [opKey]: [...(e[opKey] || []), receivedEvent],
      }));
    });
  }, [addMessageHandler]);

  const value = useMemo(
    () => ({
      events,
      selectedEvent,
      setSelectedEvent,
      ...domain,
    }),
    [domain, events]
  );

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
};
