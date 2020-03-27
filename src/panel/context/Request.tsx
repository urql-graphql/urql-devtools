import React, {
  createContext,
  FC,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
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
      setState((s) => {
        if (
          !s.fetching ||
          (e.type !== "response" && e.type !== "error") ||
          (e.data.operation.context.meta as any).source !== "Devtools"
        ) {
          return s;
        }

        return {
          fetching: false,
          error: e.data.error,
          response: e.data.data,
        };
      });
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
