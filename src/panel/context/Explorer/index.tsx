import React, {
  createContext,
  useState,
  useEffect,
  FC,
  useMemo,
  SetStateAction,
  Dispatch,
} from "react";
import { useDevtoolsContext } from "../Devtools";
import { handleResponse, ParsedNodeMap, ParsedFieldNode } from "./ast";

export interface ExplorerContextValue {
  operations: ParsedNodeMap;
  expandedNodes: ParsedFieldNode[];
  setExpandedNodes: Dispatch<SetStateAction<ParsedFieldNode[]>>;
  focusedNode?: ParsedFieldNode;
  setFocusedNode: Dispatch<SetStateAction<ParsedFieldNode | undefined>>;
}

export const ExplorerContext = createContext<ExplorerContextValue>(null as any);

export const ExplorerProvider: FC = ({ children }) => {
  const { addMessageHandler } = useDevtoolsContext();
  const [operations, setOperations] = useState<
    ExplorerContextValue["operations"]
  >({});
  const [expandedNodes, setExpandedNodes] = useState<
    ExplorerContextValue["expandedNodes"]
  >([]);
  const [focusedNode, setFocusedNode] = useState<
    ExplorerContextValue["focusedNode"]
  >(undefined);

  useEffect(() => {
    return addMessageHandler((message) => {
      if (message.type === "connection-disconnect") {
        setOperations({});
        return;
      }

      if (message.type !== "debug-event" || message.data.type !== "update") {
        return;
      }

      const debugEvent = message.data;

      if (debugEvent.data) {
        setOperations((operations) =>
          handleResponse({
            operation: debugEvent.operation,
            data: debugEvent.data.value,
            parsedNodes: operations,
          })
        );
        return;
      }
    });
  }, [addMessageHandler]);

  const value = useMemo(
    () => ({
      expandedNodes,
      setExpandedNodes,
      focusedNode,
      setFocusedNode,
      operations,
    }),
    [operations, focusedNode, setFocusedNode, expandedNodes, setExpandedNodes]
  );

  return (
    <ExplorerContext.Provider value={value}>
      {children}
    </ExplorerContext.Provider>
  );
};
