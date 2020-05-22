import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
  FC,
  useEffect,
  useRef,
} from "react";
import * as storage from "../util/storage";

type Page =
  | "explorer"
  | "events"
  | "request"
  | "disconnected"
  | "error"
  | "mismatch";
interface TelemetryContextValue {
  state: "enabled" | "disabled" | "pending";
  disableTelemetry: () => void;
  enableTelemetry: () => void;
  setPage: (page: Page) => void;
}

const TelemetryContext = createContext<TelemetryContextValue>(null as any);

export const useTelemetry = () => useContext(TelemetryContext);

export const usePageTelemetry = (page: Page) => {
  const { setPage } = useTelemetry();

  useEffect(() => {
    setPage(page);
  }, []);
};

export const TelemetryProvider: FC = ({ children }) => {
  const active = useRef(false);
  const [state, setState] = useState<TelemetryContextValue["state"]>();

  useLayoutEffect(() => {
    storage.get("allowTelemetry").then((telemetryEnabled) =>
      setState(() => {
        if (telemetryEnabled === undefined) {
          return "pending";
        }

        if (telemetryEnabled === false) {
          return "disabled";
        }

        return "enabled";
      })
    );
  }, []);

  useEffect(() => {
    if (state === "enabled") {
      startAnalytics();
      active.current = true;
    }
  }, [state]);

  const ga = useCallback<typeof window.ga>(
    active.current ? window.ga : ((() => false) as any),
    []
  );

  const enableTelemetry = useCallback(() => {
    setState("enabled");
    storage.set("allowTelemetry", true);
  }, []);

  const disableTelemetry = useCallback(() => {
    setState("disabled");
    storage.set("allowTelemetry", false);
  }, []);

  const setPage = useCallback<TelemetryContextValue["setPage"]>(
    (page) => {
      console.log(active.current);
      ga("set", "page", page);
      ga("send", { hitType: "pageview" });
    },
    [ga]
  );

  const value = useMemo(
    () => ({
      state: state as TelemetryContextValue["state"],
      enableTelemetry,
      disableTelemetry,
      setPage,
    }),
    [state, enableTelemetry, disableTelemetry, setPage]
  );

  useEffect(() => {
    enableTelemetry();
  }, []);

  if (state === undefined) {
    return null;
  }

  return (
    <TelemetryContext.Provider value={value}>
      {children}
    </TelemetryContext.Provider>
  );
};

/** Global script to enable google analytics. */
const startAnalytics = () => {
  window.ga =
    window.ga || ((...args) => (window.ga.q = window.ga.q || []).push(args));
  window.ga.l = +new Date();
  ga("create", "UA-98443810-2", "auto");
  ga("set", "checkProtocolTask", null); // Disable file protocol checking.
  ga("set", "checkStorageTask", null); // Disable cookie storage checking.
  ga("set", "historyImportTask", null); // Disable history checking (requires reading from cookies).
  ga("send", "pageview");
  console.log(window.ga.q);

  // window._gaq = window._gaq || [];
  // window._gaq.push(["_setAccount", "UA-98443810-2"]);
  // window._gaq.push(["_trackPageview", "/"]);

  // console.log(window.ga);
};

startAnalytics();
