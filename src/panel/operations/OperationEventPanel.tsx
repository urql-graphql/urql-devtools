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
import { Route } from "react-router-dom";
import { __RouterContext, Switch, Redirect } from "react-router";

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
  const { match, history } = useContext(__RouterContext);

  /** Prefix current route to child routes */
  const prefixPath = function<T extends { to: string | string[] }>(ob: T) {
    return {
      ...ob,
      to:
        typeof ob.to === "string"
          ? `${match.path}${ob.to}`
          : ob.to.map(t => `${match.path}${t}`)
    };
  };

  /** Args for tabs */
  const tabOptions = useMemo(() => {
    const opts =
      event.type === "operation"
        ? [
            { label: "Query", to: `/query` },
            { label: "Variables", to: `/variables` },
            { label: "Meta", to: `/meta` }
          ]
        : [
            { label: "Response", to: "/response" },
            { label: "Meta", to: "/meta" }
          ];

    return opts.map(prefixPath);
  }, [event]);

  /** Update history when redirecting to parent */
  useEffect(
    () => () => {
      if (/\/operations\/.+/.test(history.location.pathname)) {
        history.push("/operations");
      }
    },
    []
  );

  useEffect(() => {
    history.push(tabOptions[0].to);
  }, [tabOptions, history]);

  const operationRoutes = (op: OutgoingOperation) => [
    {
      to: [`/`, `/query`],
      component: () => <QueryTab operation={op} />
    },
    {
      to: `/variables`,
      component: () => <JsonTab json={op.data.variables || {}} />
    },
    {
      to: `/meta`,
      component: () => (
        <JsonTab
          json={{
            key: op.data.key,
            operationName: op.data.operationName,
            component: op.data.context.devtools.source,
            context: { ...op.data.context, devtools: undefined }
          }}
        />
      )
    }
  ];

  const responseRoutes = (op: IncomingResponse) => [
    {
      to: [`/`, `/response`],
      component: () => <JsonTab json={op.data.data} />
    },
    {
      to: `/meta`,
      component: () => (
        <JsonTab
          json={{
            key: op.data.operation.key,
            operationName: op.data.operation.operationName,
            component: op.data.operation.context.devtools.source,
            context: { ...op.data.operation.context, devtools: undefined }
          }}
        />
      )
    }
  ];

  const routes = (event.type === "operation"
    ? operationRoutes(event)
    : responseRoutes(event)
  ).map(prefixPath);

  return (
    <>
      <Container>
        <Tabs options={tabOptions} />
        <Switch>
          {routes.map(r => (
            <Route path={r.to} component={r.component} exact />
          ))}
          <Redirect to={tabOptions[0].to} />
        </Switch>
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
