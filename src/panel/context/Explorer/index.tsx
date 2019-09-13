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
  const [operations, setOperations] = useState<NodeMap>({});

  console.log(operations);

  useEffect(() => {
    return addMessageHandler((o: DevtoolsExchangeOutgoingMessage) => {
      console.log(o);
      if (o.type === "response") {
        return setOperations(operations => {
          return startQuery(o.data.operation, o.data.data, operations);
        });
      }
    });
  }, [operations, addMessageHandler]);

  const value = {
    data: operations
  };

  return (
    <ExplorerContext.Provider value={value}>
      {children}
    </ExplorerContext.Provider>
  );
}
