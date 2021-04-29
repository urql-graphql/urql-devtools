import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { RequestContext } from "../../../context";
import { CodeHighlight, Pane } from "../../../components";

export const Response: React.FC = () => {
  const { fetching, response, error } = useContext(RequestContext);

  const { state, code } = useMemo(() => {
    if (fetching) {
      return {
        state: "Fetching",
        code: null,
      };
    }

    if (response) {
      return {
        state: "Success",
        code: (
          <CodeHighlight
            code={JSON.stringify(response, null, 2)}
            language="javascript"
          />
        ),
      };
    }

    if (error) {
      return {
        state: "Error",
        code: (
          <CodeHighlight
            code={JSON.stringify(error, null, 2)}
            language="javascript"
          />
        ),
      };
    }

    return {
      state: "Idle",
      code: null,
    };
  }, [fetching, response, error]);

  return useMemo(() => {
    if (state === "Idle") {
      return <Prompt>Run a query to see what the client returns...</Prompt>;
    }

    return (
      <>
        <Pane.Item title="State">
          <Status>
            <Icon data-state={state.toLowerCase()} /> {state}
          </Status>
        </Pane.Item>

        {code && <Pane.Item title="Response">{code}</Pane.Item>}
      </>
    );
  }, [code, state]);
};

const Prompt = styled.div`
  padding: 20px;
  text-align: center;
  color: ${(p) => p.theme.grey["0"]};
`;

const Status = styled.code`
  color: ${(p) => p.theme.grey["+2"]};
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  display: block;
  margin-right: 7px;
  width: 9px;
  height: 9px;
  box-sizing: border-box;
  border: solid 1px;
  border-radius: 50%;

  &[data-state="idle"] {
    border-color: ${(p) => p.theme.grey["0"]};
  }

  &[data-state="fetching"] {
    border-color: ${(p) => p.theme.blue["0"]};
  }

  &[data-state="success"] {
    border-color: ${(p) => p.theme.green["0"]};
    background-color: ${(p) => p.theme.green["0"]};
  }

  &[data-state="error"] {
    border-color: ${(p) => p.theme.red["0"]};
    background-color: ${(p) => p.theme.red["-1"]};
  }
`;
