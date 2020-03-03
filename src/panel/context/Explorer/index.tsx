import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  FC,
  useMemo,
  SetStateAction,
  Dispatch
} from "react";

import { DevtoolsExchangeOutgoingMessage } from "@urql/devtools";
import { DevtoolsContext } from "../Devtools";
import { startQuery, NodeMap, FieldNode } from "./ast";

export interface ExplorerContextValue {
  operations: NodeMap;
  focusedNode?: FieldNode;
  setFocusedNode: Dispatch<SetStateAction<FieldNode | undefined>>;
}

export const ExplorerContext = createContext<ExplorerContextValue>(null as any);

export const ExplorerContextProvider: FC = ({ children }) => {
  const { addMessageHandler } = useContext(DevtoolsContext);
  const [operations, setOperations] = useState<
    ExplorerContextValue["operations"]
  >({});
  const [focusedNode, setFocusedNode] = useState<
    ExplorerContextValue["focusedNode"]
  >(undefined);

  useEffect(() => {
    return addMessageHandler((o: DevtoolsExchangeOutgoingMessage) => {
      if (o.type === "disconnect") {
        setOperations({});
        return;
      }

      if (o.type === "response") {
        setOperations(operations =>
          startQuery(o.data.operation, o.data.data, operations)
        );
        return;
      }
    });
  }, [operations, addMessageHandler]);

  const value = useMemo(
    () => ({
      focusedNode,
      setFocusedNode,
      operations,
      setOperations
    }),
    [operations, focusedNode]
  );
  return (
    <ExplorerContext.Provider value={value}>
      {children}
    </ExplorerContext.Provider>
  );
};
