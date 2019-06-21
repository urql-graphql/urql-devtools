import React, { FC, useContext } from "react";
import styled from "styled-components";
import { EventsContext } from "../../context";
import { OperationPanel } from "./OperationPanel";
import { ResponsePanel } from "./ResponsePanel";

/** Pane shows additional information about a selected operation event. */
export const Panel: FC = () => {
  const { selectedEvent: selectedOperation } = useContext(EventsContext);

  if (selectedOperation === undefined) {
    return null;
  }

  const content = () => {
    switch (selectedOperation.type) {
      case "operation":
        return <OperationPanel event={selectedOperation} />;

      case "response":
        return <ResponsePanel event={selectedOperation} />;
    }
  };

  return <Container>{content()}</Container>;
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
