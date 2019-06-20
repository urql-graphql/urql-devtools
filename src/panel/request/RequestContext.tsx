import React, { createContext, FC, useState } from "react";

interface RequestContextValue {
  query: string;
  setQuery: (s: string) => void;
  response: object | undefined;
  execute: () => void;
}

export const RequestContext = createContext<RequestContextValue>(null as any);

export const RequestProvider: FC = ({ children }) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<object | undefined>();

  const execute = () => {};

  const value = {
    query,
    setQuery,
    response,
    execute
  };

  return <RequestContext.Provider value={value} children={children} />;
};
