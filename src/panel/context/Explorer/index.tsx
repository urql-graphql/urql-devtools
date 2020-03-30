import React, {
  createContext,
  useState,
  useEffect,
  FC,
  useMemo,
  SetStateAction,
  Dispatch,
} from "react";
import { DevtoolsExchangeOutgoingMessage } from "@urql/devtools";
import { useDevtoolsContext } from "../Devtools";
import { handleResponse, ParsedNodeMap, ParsedFieldNode } from "./ast";

export interface ExplorerContextValue {
  operations: ParsedNodeMap;
  focusedNode?: ParsedFieldNode;
  setFocusedNode: Dispatch<SetStateAction<ParsedFieldNode | undefined>>;
}

export const ExplorerContext = createContext<ExplorerContextValue>(null as any);

export const ExplorerProvider: FC = ({ children }) => {
  const { addMessageHandler } = useDevtoolsContext();
  const [operations, setOperations] = useState<
    ExplorerContextValue["operations"]
  >({});
  const [focusedNode, setFocusedNode] = useState<
    ExplorerContextValue["focusedNode"]
  >(undefined);

  useEffect(() => {
    return addMessageHandler((message: DevtoolsExchangeOutgoingMessage) => {
      if (message.type === "disconnect") {
        setOperations({});
        return;
      }

      if (message.type !== "debug" || message.data.type !== "update") {
        return;
      }

      const debugEvent = message.data;

      if (debugEvent.data) {
        setOperations((operations) =>
          handleResponse({
            operation: debugEvent.operation,
            data: debugEvent.data,
            parsedNodes: operations,
          })
        );
        return;
      }
    });
  }, [addMessageHandler]);

  const value = useMemo(
    () => ({
      focusedNode,
      setFocusedNode,
      operations,
    }),
    [operations, focusedNode, setFocusedNode]
  );

  return (
    <ExplorerContext.Provider value={value}>
      {children}
    </ExplorerContext.Provider>
  );
};
