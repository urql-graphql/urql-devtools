import React, { FC, useContext, useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { Tabs } from "../components/Tabs";
import {
  OutgoingOperation,
  OperationEvent,
  IncomingResponse
} from "../../types";
import { OperationContext } from "./OperationContext";
import { QueryTab } from "./QueryTab";
import { JsonTab } from "./JsonTab";

/** Pane shows additional information about a selected operation event. */
export const OperationEventPanel: FC = () => {
  const { selectedOperation } = useContext(OperationContext);

  return selectedOperation === undefined ? null : (
    <OperationEventPanelContent event={selectedOperation} />
  );
};

const OperationEventPanelContent: FC<{ event: OperationEvent }> = ({
  event
}) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setActiveTab(0);
  }, [event]);

  const tabOptions = useMemo(() => {
    return event.type === "operation"
      ? [
          { label: "Query", value: 0 },
          { label: "Variables", value: 1 },
          { label: "Meta", value: 2 }
        ]
      : [{ label: "Response", value: 0 }, { label: "Meta", value: 1 }];
  }, [event]);

  const getOperationContent = (op: OutgoingOperation) => {
    if (activeTab === 0) {
      return <QueryTab operation={op} />;
    }

    if (activeTab === 1) {
      return <JsonTab json={op.data.variables || {}} />;
    }

    if (activeTab === 2) {
      return (
        <JsonTab
          json={{
            key: op.data.key,
            operationName: op.data.operationName,
            component: op.data.context.devtools.source,
            context: { ...op.data.context, devtools: undefined }
          }}
        />
      );
    }

    return null;
  };

  const getResponseContent = (op: IncomingResponse) => {
    if (activeTab === 0) {
      return <JsonTab json={op.data.data} />;
    }

    if (activeTab === 1) {
      return (
        <JsonTab
          json={{
            key: op.data.operation.key,
            operationName: op.data.operation.operationName,
            component: op.data.operation.context.devtools.source,
            context: { ...op.data.operation.context, devtools: undefined }
          }}
        />
      );
    }
  };

  const content = () =>
    event.type === "operation"
      ? getOperationContent(event)
      : getResponseContent(event);

  return (
    <>
      <Container>
        <Tabs
          active={activeTab}
          options={tabOptions}
          setActive={setActiveTab}
        />
        {content()}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.cardBg};
  width: 100%;
  height: 400px;
  max-height: 400px;
  overflow: scroll;
  font-size: 12px;

  .react-codemirror2 {
    display: flex;
    flex-grow: 1;

    .CodeMirror {
      height: auto;
      width: 100%;
    }
  }
`;
