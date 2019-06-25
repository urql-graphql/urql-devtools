import React, { useState, useMemo, FC } from "react";
import { OutgoingOperation } from "../../../types";
import { Tabs } from "../../components/Tabs";
import { QueryCode } from "./QueryCode";
import { JsonCode } from "./JsonCode";

export const OperationPanel: FC<{ event: OutgoingOperation }> = ({ event }) => {
  const [activeTab, setActiveTab] = useState<tabs>("query");

  const content = useMemo(() => {
    switch (activeTab) {
      case "query":
        return <QueryCode operation={event} />;

      case "variables":
        return <JsonCode json={event.data.variables || {}} />;

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
  }, [activeTab, event]);

  return (
    <>
      <Tabs active={activeTab} options={tabOptions} setActive={setActiveTab} />
      {content}
    </>
  );
};

const tabOptions = [
  { label: "Query", value: "query" },
  { label: "Variables", value: "variables" },
  { label: "Meta", value: "meta" }
] as const;

type tabs = typeof tabOptions[number]["value"];
