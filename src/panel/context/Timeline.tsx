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
  useLayoutEffect,
} from "react";
import { scaleLinear, ScaleLinear } from "d3-scale";
import { DebugEvent } from "@urql/core";
import { DevtoolsContext } from "./Devtools";

interface TimelineContextValue {
  selectedEvent?: DebugEvent & { duration?: number };
  setSelectedEvent: Dispatch<SetStateAction<DebugEvent | undefined>>;
  container: HTMLDivElement;
  setContainer: (e: HTMLDivElement) => void;
  events: Record<string, DebugEvent[]>;
  eventOrder: number[];
  filterables: {
    source: string[];
    graphqlType: string[];
  };
  filter: {
    source: string[];
    graphqlType: string[];
  };
  setFilter: Dispatch<SetStateAction<TimelineContextValue["filter"]>>;
  setPosition: (time: number) => void;
  scale: ScaleLinear<number, number>;
  startTime: number;
  zoomIn: () => void;
  zoomOut: () => void;
}

export const TimelineContext = createContext<TimelineContextValue>(null as any);

export const useTimelineContext = (): TimelineContextValue =>
  useContext(TimelineContext);

const DEFAULT_WIDTH = 30000;
export const START_PADDING = 500;
const ZOOM_MIN = 5;
const ZOOM_MAX = 0.05;

const useTimelineDomain = () => {
  const startTime = useRef(Date.now());
  const domain = useRef({
    start: startTime.current - START_PADDING,
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

  const setPosition = useCallback((t: number) => {
    if (t < startTime.current) {
      console.warn("Cannot move position behind 'startTime'");
    }

    domain.current = {
      ...domain.current,
      start: Math.max(startTime.current - START_PADDING, t),
    };
    createScale();
  }, []);

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
        start: Math.max(startTime.current - START_PADDING, newStart),
      };
    },
    [scale]
  );

  const handleZoom = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * 0.01;
    const newZoom =
      e.deltaY < 0
        ? Math.max(ZOOM_MAX, domain.current.zoom + delta)
        : Math.min(ZOOM_MIN, domain.current.zoom + delta);
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
      start: Math.max(newStart, startTime.current - START_PADDING),
      zoom: newZoom,
    };
  }, []);

  const zoomIn = useCallback(() => {
    domain.current = {
      ...domain.current,
      zoom: Math.max(ZOOM_MAX, domain.current.zoom - 0.2),
    };
  }, []);

  const zoomOut = useCallback(() => {
    domain.current = {
      ...domain.current,
      zoom: Math.min(ZOOM_MIN, domain.current.zoom + 0.2),
    };
  }, []);

  // Listen for drag events
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    // dragstart -> mousemove -> mouseup
    const dragStartListener = (e: DragEvent) => {
      e.preventDefault();
      ref.current.addEventListener("mousemove", mouseMoveListener, {
        passive: true,
      });
      window.addEventListener("mouseup", mouseUpListener, {
        passive: true,
      });
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
      ref.current?.removeEventListener("dragstart", dragStartListener);
      ref.current?.removeEventListener("mousemove", mouseMoveListener);
      window.removeEventListener("mouseup", mouseUpListener);
    };
  }, [ref.current]);

  // Listen for zoom events
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const wheelListener = (e: WheelEvent) => {
      // Horizontal scroll
      if (!e.ctrlKey && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        handlePan(-e.deltaX);
        return;
      }

      // Vertical scroll
      if (!e.ctrlKey) {
        return;
      }

      // Zoom
      e.preventDefault();
      handleZoom(e);
    };

    ref.current.addEventListener("wheel", wheelListener, { passive: false });

    return () => ref.current?.removeEventListener("wheel", wheelListener);
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
      setPosition,
      scale: scale.scale,
      zoomIn,
      zoomOut,
    }),
    [scale, setContainer]
  );
};

export const TimelineProvider: FC = ({ children }) => {
  const { addMessageHandler } = useContext(DevtoolsContext);
  const domain = useTimelineDomain();
  const [filterables, setFilterables] = useState<
    TimelineContextValue["filterables"]
  >({
    source: ["devtoolsExchange"],
    graphqlType: ["query", "subscription", "mutation"],
  });
  const [filter, setFilter] = useState<TimelineContextValue["filter"]>({
    source: ["devtoolsExchange"],
    graphqlType: ["query", "subscription", "mutation"],
  });
  const [events, setEvents] = useState<Record<string, DebugEvent[]>>({});
  const [eventOrder, setEventOrder] = useState<
    TimelineContextValue["eventOrder"]
  >([]);
  const [selectedEvent, setSelectedEvent] = useState<
    (DebugEvent & { duration?: number }) | undefined
  >(undefined);

  useEffect(() => {
    return addMessageHandler((message) => {
      if (message.type !== "debug-event") {
        return;
      }

      const debugEvent = message.data;
      const opKey = debugEvent.operation.key;

      setEvents((e) => ({
        ...e,
        [opKey]: [...(e[opKey] || []), message.data],
      }));
      setEventOrder((o) => (o.includes(opKey) ? o : [...o, opKey]));
      setFilterables((f) => ({
        ...f,
        source: f.source.includes(debugEvent.source)
          ? f.source
          : [...f.source, debugEvent.source],
      }));
    });
  }, [addMessageHandler]);

  const value = useMemo(
    () => ({
      events,
      eventOrder,
      setFilter,
      filter,
      filterables,
      selectedEvent,
      setSelectedEvent,
      ...domain,
    }),
    [
      domain,
      events,
      eventOrder,
      filter,
      setFilter,
      filterables,
      selectedEvent,
      setSelectedEvent,
    ]
  );

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
};
