import React, {
  createContext,
  FC,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { GraphQLSchema } from "graphql";
import { introspectSchema } from "graphql-tools";
import { HttpLink } from "apollo-link-http";
import { DevtoolsContext } from ".";

interface RequestContextValue {
  query: string;
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
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<object | undefined>();
  const [error, setError] = useState<object | undefined>();
  const [schema, setSchema] = useState<GraphQLSchema>();

  const execute = useCallback(() => {
    console.log("query", query);
    setFetching(true);
    setResponse(undefined);
    setError(undefined);
    sendMessage({ type: "request", query });
  }, [query, sendMessage]);

  // Listen for response for devtools
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

  // Get schema
  useEffect(() => {
    chrome.devtools.inspectedWindow.eval(
      "window.__urql__.client.url",
      async endpoint => {
        const link = new HttpLink({
          uri: endpoint as string,
          fetch
        });
        const schema = await introspectSchema(link);
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
