import React, {
  createContext,
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { visit, buildClientSchema, DocumentNode } from "graphql";
import { GraphQLSchema, getIntrospectionQuery } from "graphql";
import { useDevtoolsContext } from "./Devtools";
import { appendPopulateDirective } from "./schema-transforms";

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

export const useRequest = () => useContext(RequestContext);

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
    sendMessage({
      type: "execute-query",
      source: "devtools",
      query: query || "",
    });
  }, [query, sendMessage]);

  // Listen for response for devtools
  useEffect(() => {
    return addMessageHandler((e) => {
      if (e.type !== "debug-event") {
        return;
      }

      const debugEvent = e.data;

      if (debugEvent.operation.context.meta?.source !== "Devtools") {
        return;
      }

      if (
        debugEvent.type === "update" &&
        isIntrospectionQuery(debugEvent.operation.query)
      ) {
        setSchema(
          appendPopulateDirective(buildClientSchema(debugEvent.data.value))
        );
        return;
      }

      if (debugEvent.type === "update") {
        setState({
          fetching: false,
          response: debugEvent.data.value,
        });
        return;
      }

      if (debugEvent.type === "error") {
        setState({
          fetching: false,
          error: debugEvent.data.value,
        });
        return;
      }
    });
  }, [addMessageHandler]);

  // Get schema
  useEffect(() => {
    sendMessage({
      type: "execute-query",
      source: "devtools",
      query: getIntrospectionQuery(),
    });
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

const isIntrospectionQuery = (query: DocumentNode) => {
  let value = false;

  visit(query, {
    OperationDefinition: {
      enter: (n) => {
        if (n.name?.value === "IntrospectionQuery") {
          value = true;
        }
        return false;
      },
    },
  });

  return value;
};
