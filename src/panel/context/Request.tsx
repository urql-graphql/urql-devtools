import React, {
  createContext,
  FC,
  useState,
  useContext,
  useEffect
} from "react";
import { DevtoolsContext } from ".";

interface RequestContextValue {
  query: string;
  setQuery: (s: string) => void;
  response: object | undefined;
  execute: () => void;
}

export const RequestContext = createContext<RequestContextValue>(null as any);

const key = 100001;

export const RequestProvider: FC = ({ children }) => {
  const { sendMessage } = useContext(DevtoolsContext);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<object | undefined>();

  const execute = () => {
    sendMessage({ type: "request", query });
  };

  const value = {
    query,
    setQuery,
    response,
    execute
  };

  return <RequestContext.Provider value={value} children={children} />;
};
