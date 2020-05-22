import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
  FC,
} from "react";
import { get, set } from "../util";

interface TelemetryContextValue {
  state: "enabled" | "disabled" | "pending";
  disableTelemetry: () => void;
  enableTelemetry: () => void;
}

const TelemetryContext = createContext<TelemetryContextValue>(null as any);

export const useTelemetryContext = () => useContext(TelemetryContext);

export const TelemetryProvider: FC = ({ children }) => {
  const [state, setState] = useState<TelemetryContextValue["state"]>();

  useLayoutEffect(() => {
    get("allowTelemetry").then((telemetryEnabled) =>
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
  });

  const enableTelemetry = useCallback(() => {
    setState("enabled");
    set("allowTelemetry", true);
  }, []);

  const disableTelemetry = useCallback(() => {
    setState("disabled");
    set("allowTelemetry", false);
  }, []);

  const value = useMemo(
    () => ({
      state: state as TelemetryContextValue["state"],
      enableTelemetry,
      disableTelemetry,
    }),
    [state, enableTelemetry, disableTelemetry]
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
