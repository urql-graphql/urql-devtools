import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from "react";

import { DevtoolsExchangeOutgoingMessage } from "@urql/devtools";
import { DevtoolsContext } from "../Devtools";
import { startQuery, NodeMap } from "./ast";

export const ExplorerContext = createContext<NodeMap>(Object.create(null));

interface Props {
  children: ReactNode;
}

export function ExplorerContextProvider({ children }: Props) {
  const { addMessageHandler } = useContext(DevtoolsContext);
  const [operations, setOperations] = useState<NodeMap>(Object.create(null));

  useEffect(() => {
    return addMessageHandler((o: DevtoolsExchangeOutgoingMessage) => {
      if (o.type === "disconnect") {
        setOperations(Object.create(null));
      } else if (o.type === "response") {
        setOperations(operations => {
          return startQuery(o.data.operation, o.data.data, operations);
        });
      }
    });
  }, [operations, addMessageHandler]);

  return (
    <ExplorerContext.Provider value={operations}>
      {children}
    </ExplorerContext.Provider>
  );
}
