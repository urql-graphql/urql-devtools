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
import { nanoid } from "nanoid";
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
    if (state !== "enabled") {
      return;
    }

    (async () => {
      startAnalytics({ clientId: await storage.get("userId") });
      active.current = true;
    })();
  }, [state]);

  const ga = useCallback((...args: Parameters<typeof window.ga>) => {
    if (!active.current) {
      return;
    }

    window.ga(...args);
  }, []);

  const enableTelemetry = useCallback(async () => {
    await storage.set("allowTelemetry", true);
    await storage.set("userId", nanoid());
    setState("enabled");
  }, []);

  const disableTelemetry = useCallback(async () => {
    await storage.set("allowTelemetry", false);
    setState("disabled");
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
const startAnalytics = ({ clientId }: { clientId: string }) => {
  window.ga =
    window.ga || ((...args) => (window.ga.q = window.ga.q || []).push(args));
  window.ga.l = +new Date();

  ga("create", "UA-98443810-2", {
    storage: "none",
    clientId,
  });
  /*
   * See here for explanation - https://stackoverflow.com/questions/3591847/google-analytics-from-a-file-url
   */
  ga("set", "checkProtocolTask", null);
  ga("set", "checkStorageTask", null);
  ga("set", "historyImportTask", null);
  ga("set", "dataSource", "devtools");
};
