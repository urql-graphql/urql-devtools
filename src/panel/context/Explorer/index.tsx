import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from "react";

import { UrqlEvent } from "../../../types";
import { DevtoolsContext } from "../Devtools";
import { startQuery, NodeMap } from "./ast";

interface ExplorerContextValue {
  data?: any;
}

export const ExplorerContext = createContext<ExplorerContextValue>(
  undefined as any
);

interface Props {
  children: ReactNode;
}

export function ExplorerContextProvider({ children }: Props) {
  const { addMessageHandler } = useContext(DevtoolsContext);
  const [operations, setOperations] = useState<NodeMap[]>([]);

  useEffect(() => {
    window.chrome.devtools.inspectedWindow.eval(
      `window.__urql__.events`,
      (ops: UrqlEvent[]) => {
        ops.forEach(o => {
          if (o.type === "response") {
            return setOperations(operations => {
              return [
                ...operations,
                startQuery(o.data.operation, o.data.data, {})
              ];
            });
          }
        });
      }
    );
  }, []);

  useEffect(() => {
    return addMessageHandler((o: UrqlEvent) => {
      if (o.type === "response") {
        return setOperations(operations => {
          return [...operations, startQuery(o.data.operation, o.data.data, {})];
        });
      }
    });
  }, []);

  const value = {
    data: operations
  };

  return (
    <ExplorerContext.Provider value={value}>
      {children}
    </ExplorerContext.Provider>
  );
}
