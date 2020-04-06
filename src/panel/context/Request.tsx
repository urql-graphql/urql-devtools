import React, {
  createContext,
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { print } from "graphql";
import { GraphQLSchema } from "graphql";
import { introspectSchema } from "graphql-tools";
import { useDevtoolsContext } from "./Devtools";

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
  const { sendMessage, addMessageHandler } = useDevtoolsContext();
  const [state, setState] = useState<{
    fetching: boolean;
    response?: object;
    error?: object;
  }>({ fetching: false, response: undefined, error: undefined });
  const [query, setQuery] = useState<string>();
  const [schema, setSchema] = useState<GraphQLSchema>();

  const execute = useCallback(() => {
    setState({
      fetching: true,
      response: undefined,
      error: undefined,
    });
    sendMessage({ type: "request", query: query || "" });
  }, [query, sendMessage]);

  // Listen for response for devtools
  useEffect(() => {
    return addMessageHandler((e) => {
      if (e.type !== "debug") {
        return;
      }

      const debugEvent = e.data;

      if (debugEvent.operation.context.meta?.source !== "Devtools") {
        return;
      }

      if (debugEvent.type === "update") {
        setState({
          fetching: false,
          response: debugEvent.data.value,
        });
      }

      if (debugEvent.type === "error") {
        setState({
          fetching: false,
          error: debugEvent.data.value,
        });
      }
    });
  }, [addMessageHandler]);

  // Get schema
  useEffect(() => {
    chrome.devtools.inspectedWindow.eval(
      "window.__urql__.url",
      async (endpoint: string) => {
        const schema = await introspectSchema(({ query, variables }) => {
          return fetch(endpoint, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ query: print(query), variables }),
          })
            .then((data) => data.json())
            .catch((error) => ({ data: null, error }));
        });

        setSchema(schema);
      }
    );
  }, []);

  const value = useMemo(
    () => ({
      query,
      setQuery,
      ...state,
      execute,
      schema,
    }),
    [query, state, execute, schema]
  );

  return <RequestContext.Provider value={value} children={children} />;
};
