import React, { useState, useMemo, FC } from "react";
import { IncomingResponse } from "../../../types";
import { Tabs } from "../../components/Tabs";
import { JsonCode } from "./JsonCode";

export const ResponsePanel: FC<{ event: IncomingResponse }> = ({ event }) => {
  const [activeTab, setActiveTab] = useState<tabs>("response");

  const content = useMemo(() => {
    switch (activeTab) {
      case "response":
        return <JsonCode json={event.data.data} />;

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
  { label: "Response", value: "response" },
  { label: "Meta", value: "meta" }
] as const;

type tabs = typeof tabOptions[number]["value"];
