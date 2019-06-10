import React, { useState, useEffect } from "react";
import { Operation as OperationType } from "urql";
import { Operation } from "./Operation";

export const Operations = () => {
  const [state, setState] = useState<OperationType[]>([]);

  useEffect(() => {
    const script = `window.__urql.getOps();`;
    const changeDetector = () =>
      chrome.devtools.inspectedWindow.eval(
        script,
        (response: OperationType[]) => {
          if (response.length !== 0) {
            setState(prev => [...prev, ...response]);
          }
        }
      );

    const interval = setInterval(changeDetector, 200);
    () => window.clearInterval(interval);
  });

  return (
    <>
      {state.map((op, i) => (
        <Operation key={i} operation={op} />
      ))}
    </>
  );
};
