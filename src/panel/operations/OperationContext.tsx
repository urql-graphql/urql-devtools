import React, { createContext, FC, useState } from "react";
import { OperationEvent } from "../../types";

interface OperationContextValue {
  selectedOperation?: OperationEvent;
  selectOperation: (op: OperationEvent) => void;
  clearSelectedOperation: () => void;
}

export const OperationContext = createContext<OperationContextValue>(
  null as any
);

export const OperationProvider: FC = ({ children }) => {
  const [selectedOperation, setSelectedOperation] = useState<
    OperationEvent | undefined
  >(undefined);

  const selectOperation = (op: OperationEvent) => setSelectedOperation(op);
  const clearSelectedOperation = () => setSelectedOperation(undefined);

  const value = {
    selectedOperation,
    selectOperation,
    clearSelectedOperation
  };

  return <OperationContext.Provider value={value} children={children} />;
};
