import React, { FC, useContext } from "react";
import styled from "styled-components";
import { IncomingError, IncomingResponse } from "../../../types";
import { EventsContext } from "../../context";
import { OperationPanel } from "./OperationPanel";
import { ResponsePanel } from "./ResponsePanel";
import { ErrorPanel } from "./ErrorPanel";

/** Pane shows additional information about a selected operation event. */
export const Panel: FC = () => {
  const { selectedEvent, events } = useContext(EventsContext);

  if (selectedEvent === undefined) {
    return null;
  }

  const content = () => {
    switch (selectedEvent.type) {
      case "operation":
        const responseState = events
          // Only events after the request
          .filter(
            e => e.type !== "operation" && e.timestamp > selectedEvent.timestamp
          )
          // First response for mutation, latest response for query
          .sort((a, b) =>
            selectedEvent.data.operationName === "mutation"
              ? a.timestamp - b.timestamp
              : b.timestamp - a.timestamp
          )
          .find(
            e =>
              (e as IncomingError | IncomingResponse).data.operation.key ===
              selectedEvent.data.key
          ) as IncomingError | IncomingResponse | undefined;

        return (
          <OperationPanel event={selectedEvent} response={responseState} />
        );

      case "response":
        return <ResponsePanel event={selectedEvent} />;

      case "error":
        return <ErrorPanel event={selectedEvent} />;
    }
  };

  return <Container>{content()}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.dark["-2"]};
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
