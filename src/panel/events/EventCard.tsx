import React, { FC, useContext, useCallback } from "react";
import styled, { ThemeContext, css } from "styled-components";
import { UrqlEvent } from "../../types";
import { EventsContext } from "../context";

/** Shows basic information about an operation. */
export const EventCard: FC<{
  operation: UrqlEvent;
  active: boolean;
  setFilter: any;
  canFilter: boolean;
}> = ({ operation, setFilter, canFilter, active = false }) => {
  const theme = useContext(ThemeContext);
  const { selectedEvent, selectEvent, clearSelectedEvent } = useContext(
    EventsContext
  );

  const handleContainerClick = useCallback(() => {
    // if we're currently in filtering mode, ignore container clicks
    if (canFilter) {
      return;
    }

    selectedEvent === operation ? clearSelectedEvent() : selectEvent(operation);
  }, [operation, selectedEvent, selectEvent, canFilter]);

  const colors: { [key: string]: string } = {
    subscription: theme.orange[0],
    teardown: theme.grey[0],
    mutation: theme.purple[0],
    query: theme.blue[0],
    response: theme.green[0],
    error: theme.red[0]
  };

  const valueGetters: { [key: string]: (e: UrqlEvent) => string | number } = {
    name: (e: UrqlEvent) =>
      e.type === "operation" ? e.data.operationName : e.type,
    key: (e: UrqlEvent) =>
      e.type === "operation" ? e.data.key : e.data.operation.key,
    info: (e: UrqlEvent) =>
      e.type === "operation"
        ? e.data.context.devtools.source
        : e.data.operation.context.devtools.source
  };

  const values: { [key: string]: any } = {
    key: valueGetters["key"](operation),
    info: valueGetters["info"](operation),
    name: valueGetters["name"](operation),
    date: formatDate(operation.timestamp)
  };

  const makeSetFilter = (type: string) => {
    return () =>
      canFilter
        ? setFilter({
            payload: {
              filter: {
                value: values[type],
                propName: type,
                propGetter: valueGetters[type]
              }
            },
            type: "add"
          })
        : () => {
            /*noop*/
          };
  };

  return (
    <Container onClick={handleContainerClick} aria-selected={active}>
      <Indicator
        style={{ backgroundColor: colors[values["name"].toString()] }}
      />
      <OperationName onClick={makeSetFilter("name")} isActive={canFilter}>
        {values["name"]}
      </OperationName>
      <OperationTime>{values["date"]}</OperationTime>
      <OperationAddInfo onClick={makeSetFilter("info")} isActive={canFilter}>
        {values["info"] || "Unknown"}
      </OperationAddInfo>
      <OperationKey onClick={makeSetFilter("key")} isActive={canFilter}>
        {values["key"]}
      </OperationKey>
    </Container>
  );
};

const formatDate = (date: number) => {
  const d = new Date(date);
  const padded = (n: number) => String(n).padStart(2, "0");

  return `${padded(d.getHours())}:${padded(d.getMinutes())}:${padded(
    d.getSeconds()
  )}`;
};

// Breakpoints
const smMax = "399px";
const mdMin = "400px";

const getActiveStyles = (p: { isActive: boolean }) => {
  return (
    p.isActive &&
    css`
      text-decoration: underline;
      cursor: pointer;
    `
  );
};

const OperationName = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  margin: 0;
  width: 50%;
  text-transform: capitalize;

  @media (max-width: ${smMax}) {
    margin-bottom: 10px;
  }

  @media (min-width: ${mdMin}) {
    color: rgba(255, 255, 255, 0.8);
    order: 1;
    font-size: 13px;
    width: auto;
    flex-basis: 4;
    width: 20%;
  }

  ${getActiveStyles}
`;

const OperationTime = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin: 0;
  width: 50%;
  text-align: right;

  @media (min-width: ${mdMin}) {
    order: 4;
    font-size: 13px;
    width: 20%;
  }
`;

const OperationAddInfo = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  width: 50%;

  @media (min-width: ${mdMin}) {
    color: rgba(255, 255, 255, 0.8);
    order: 2;
    font-size: 13px;
    width: 25%;
  }

  ${getActiveStyles}
`;

const OperationKey = styled.p`
  margin: 0;

  @media (max-width: ${smMax}) {
    color: rgba(255, 255, 255, 0.7);
    width: 50%;
    text-align: right;
  }

  @media (min-width: ${mdMin}) {
    color: rgba(255, 255, 255, 0.8);
    order: 3;
    font-size: 13px;
    width: 25%;
  }

  ${getActiveStyles}
`;

const Indicator = styled.div`
  position: absolute;
  left: 0;
  width: 5px;
  top: 0;
  bottom: 0;
`;

const Container = styled.div`
  position: relative;
  background-color: ${props => props.theme.dark[0]};
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;

  &:nth-child(2n):not(:hover) {
    background-color: ${props => props.theme.dark["-1"]};
  }

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.dark["-2"]};
  }

  &[aria-selected="true"]:not(:hover) {
    background-color: ${props => props.theme.dark["-3"]};
  }

  @media (max-width: ${smMax}) {
    flex-wrap: wrap;
    align-items: baseline;
  }

  @media (min-width: ${mdMin}) {
    align-items: center;
    justify-content: space-between;
  }
`;
