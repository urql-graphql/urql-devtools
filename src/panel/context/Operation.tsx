import React, {
  createContext,
  FC,
  useState,
  useEffect,
  useContext
} from "react";
import { OperationEvent } from "../../types";
import { DevtoolsContext } from "./Devtools";

interface OperationContextValue {
  operations: OperationEvent[];
  selectedOperation?: OperationEvent;
  selectOperation: (op: OperationEvent) => void;
  clearSelectedOperation: () => void;
}

export const OperationContext = createContext<OperationContextValue>(
  null as any
);

export const OperationProvider: FC = ({ children }) => {
  const { addMessageHandler } = useContext(DevtoolsContext);
  const [operations, setOperations] = useState<OperationEvent[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<
    OperationEvent | undefined
  >(undefined);

  const selectOperation = (op: OperationEvent) => setSelectedOperation(op);
  const clearSelectedOperation = () => setSelectedOperation(undefined);

  useEffect(() => {
    return addMessageHandler(msg => {
      console.log("message received in OperationProvider", msg);
      if (msg.type === "operation" || msg.type === "response") {
        setOperations(o => [...o, msg]);
      }
    });
  }, []);

  // Set initial operations state from cache
  useEffect(() => {
    window.chrome.devtools.inspectedWindow.eval(
      `window.__urql__.operations`,
      (ops: OperationEvent[]) => {
        console.log(ops);
        setOperations(ops);
      }
    );
  }, []);

  const value = {
    operations,
    selectedOperation,
    selectOperation,
    clearSelectedOperation
  };

  return <OperationContext.Provider value={value} children={children} />;
};
