import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  FC,
  useMemo,
  SetStateAction,
  Dispatch,
} from "react";
import { DevtoolsExchangeOutgoingMessage } from "@urql/devtools";
import { DevtoolsContext } from "../Devtools";
import { handleResponse, ParsedNodeMap, ParsedFieldNode } from "./ast";

export interface ExplorerContextValue {
  operations: ParsedNodeMap;
  focusedNode?: ParsedFieldNode;
  setFocusedNode: Dispatch<SetStateAction<ParsedFieldNode | undefined>>;
}

export const ExplorerContext = createContext<ExplorerContextValue>(null as any);

export const ExplorerProvider: FC = ({ children }) => {
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

      if (o.type === "response" && o.data.data) {
        setOperations((operations) =>
          handleResponse({
            operation: o.data.operation,
            data: o.data.data,
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
