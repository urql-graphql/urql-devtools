import { useContext } from "react";
import { EventsContext } from "../context";

export const useEventsContext = () => useContext(EventsContext);
