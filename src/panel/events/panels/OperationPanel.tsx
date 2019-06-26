import React, { useState, useMemo, FC } from "react";
import {
  OutgoingOperation,
  IncomingError,
  IncomingResponse
} from "../../../types";
import { Tabs } from "../../components/Tabs";
import { QueryCode } from "./QueryCode";
import { JsonCode } from "./JsonCode";

export const OperationPanel: FC<{
  event: OutgoingOperation;
  response?: IncomingError | IncomingResponse;
}> = ({ event, response }) => {
  const tabOptions = [
    { label: "Query", value: "query" },
    { label: "Variables", value: "variables" },
    event.data.operationName === "mutation"
      ? { label: "Response", value: "response" }
      : { label: "State", value: "state" },
    { label: "Meta", value: "meta" }
  ] as const;

  const [activeTab, setActiveTab] = useState<
    typeof tabOptions[number]["value"]
  >("query");

  // Resets tab to query if activeTab is non-existent (on operationName change)
  const visibleTab = useMemo(
    () =>
      tabOptions.find(o => o.value === activeTab) === undefined
        ? "query"
        : activeTab,
    [activeTab, tabOptions]
  );

  const content = useMemo(() => {
    switch (visibleTab) {
      case "query":
        return <QueryCode operation={event} />;

      case "variables":
        return <JsonCode json={event.data.variables || {}} />;

      case "state":
      case "response":
        const data =
          response === undefined
            ? "Fetching"
            : { data: response.data.data, error: response.data.error };
        return <JsonCode json={data} />;

      case "meta":
        return (
          <JsonCode
            json={{
              key: event.data.key,
              operationName: event.data.operationName,
              component: event.data.context.devtools.source,
              context: { ...event.data.context, devtools: undefined }
            }}
          />
        );
    }
  }, [visibleTab, event, response]);

  return (
    <>
      <Tabs active={visibleTab} options={tabOptions} setActive={setActiveTab} />
      {content}
    </>
  );
};
