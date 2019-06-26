import React, { useState, useMemo, FC } from "react";
import { IncomingError } from "../../../types";
import { Tabs } from "../../components/Tabs";
import { JsonCode } from "./JsonCode";

export const ErrorPanel: FC<{ event: IncomingError }> = ({ event }) => {
  const [activeTab, setActiveTab] = useState<tabs>("error");

  const content = useMemo(() => {
    switch (activeTab) {
      case "error":
        return <JsonCode json={event.data.error} />;

      case "meta":
        return (
          <JsonCode
            json={{
              key: event.data.operation.key,
              operationName: event.data.operation.operationName,
              component: event.data.operation.context.devtools.source,
              context: {
                ...event.data.operation.context,
                devtools: undefined
              }
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
  { label: "Error", value: "error" },
  { label: "Meta", value: "meta" }
] as const;

type tabs = typeof tabOptions[number]["value"];
