import React, {
  createContext,
  FC,
  useState,
  useEffect,
  useContext
} from "react";
import { UrqlEvent } from "../../types";
import { DevtoolsContext } from "./Devtools";

interface EventsContextValue {
  events: UrqlEvent[];
  selectedEvent?: UrqlEvent;
  selectEvent: (op: UrqlEvent) => void;
  clearSelectedEvent: () => void;
}

export const EventsContext = createContext<EventsContextValue>(null as any);

export const OperationProvider: FC = ({ children }) => {
  const { addMessageHandler } = useContext(DevtoolsContext);
  const [events, setEvents] = useState<UrqlEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<UrqlEvent | undefined>(
    undefined
  );

  const selectEvent = (op: UrqlEvent) => setSelectedEvent(op);
  const clearSelectedEvent = () => setSelectedEvent(undefined);

  useEffect(() => {
    return addMessageHandler(msg => {
      console.log("message received in OperationProvider", msg);
      if (
        msg.type === "operation" ||
        msg.type === "response" ||
        msg.type === "error"
      ) {
        setEvents(o => [msg, ...o]);
      }
    });
  }, []);

  // Set initial events state from cache
  useEffect(() => {
    window.chrome.devtools.inspectedWindow.eval(
      `window.__urql__.events`,
      (ops: UrqlEvent[]) => {
        console.log(ops);
        setEvents(ops);
      }
    );
  }, []);

  const value = {
    events,
    selectedEvent,
    selectEvent,
    clearSelectedEvent
  };

  return <EventsContext.Provider value={value} children={children} />;
};
