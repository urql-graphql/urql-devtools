import React, {
  createContext,
  FC,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { DevtoolsContext } from ".";

interface RequestContextValue {
  query: string;
  setQuery: (s: string) => void;
  fetching: boolean;
  response: object | undefined;
  execute: () => void;
  error: object | undefined;
}

export const RequestContext = createContext<RequestContextValue>(null as any);

export const RequestProvider: FC = ({ children }) => {
  const { sendMessage, addMessageHandler } = useContext(DevtoolsContext);
  const [fetching, setFetching] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<object | undefined>();
  const [error, setError] = useState<object | undefined>();

  const execute = useCallback(() => {
    setFetching(true);
    setResponse(undefined);
    setError(undefined);
    console.log("executing query ", query);
    sendMessage({ type: "request", query });
  }, [query, sendMessage]);

  useEffect(() => {
    return addMessageHandler(e => {
      if (
        e.type === "operation" ||
        e.data.operation.context.devtools.source !== "Devtools"
      ) {
        return;
      }

      if (e.data.error !== undefined) {
        setError(e.data.error);
      } else {
        setResponse(e.data.data);
      }

      setFetching(false);
    });
  }, [addMessageHandler]);

  const value = useMemo(
    () => ({
      query,
      setQuery,
      fetching,
      response,
      error,
      execute
    }),
    [query, fetching, response, error, execute]
  );

  return <RequestContext.Provider value={value} children={children} />;
};
