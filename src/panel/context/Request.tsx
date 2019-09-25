import React, {
  createContext,
  FC,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { print } from "graphql";
import { GraphQLSchema } from "graphql";
import { introspectSchema } from "graphql-tools";
import { DevtoolsContext } from ".";

interface RequestContextValue {
  query?: string;
  setQuery: (s: string) => void;
  fetching: boolean;
  response?: object;
  execute: () => void;
  error?: object;
  schema?: GraphQLSchema;
}

export const RequestContext = createContext<RequestContextValue>(null as any);

export const RequestProvider: FC = ({ children }) => {
  const { sendMessage, addMessageHandler } = useContext(DevtoolsContext);
  const [fetching, setFetching] = useState(false);
  const [query, setQuery] = useState<string>();
  const [response, setResponse] = useState<object | undefined>();
  const [error, setError] = useState<object | undefined>();
  const [schema, setSchema] = useState<GraphQLSchema>();

  const execute = useCallback(() => {
    setFetching(true);
    setResponse(undefined);
    setError(undefined);
    sendMessage({ type: "request", query: query || "" });
  }, [query, sendMessage]);

  // Listen for response for devtools
  useEffect(() => {
    return addMessageHandler(e => {
      if (
        !fetching ||
        e.type === "operation" ||
        e.type === "init" ||
        e.type === "disconnect" ||
        (e.data.operation.context.meta as any).source !== "Devtools"
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
  }, [fetching, addMessageHandler]);

  // Get schema
  useEffect(() => {
    chrome.devtools.inspectedWindow.eval(
      "window.__urql__.url",
      async (endpoint: string) => {
        const schema = await introspectSchema(({ query, variables }) => {
          return fetch(endpoint, {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({ query: print(query), variables })
          })
            .then(data => data.json())
            .catch(error => ({ data: null, error }));
        });

        setSchema(schema);
      }
    );
  }, []);

  const value = useMemo(
    () => ({
      query,
      setQuery,
      fetching,
      response,
      error,
      execute,
      schema
    }),
    [query, fetching, response, error, execute, schema]
  );

  return <RequestContext.Provider value={value} children={children} />;
};
