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
        <Pane.Item>
          <Pane.ItemTitle>State</Pane.ItemTitle>
          <Status>
            <Icon data-state={state.toLowerCase()} /> {state}
          </Status>
        </Pane.Item>

        {code && (
          <Pane.Item>
            <Pane.ItemTitle>Response</Pane.ItemTitle>
            {code}
          </Pane.Item>
        )}
      </>
    );
  }, [code, state]);
};

const Prompt = styled.div`
  padding: 20px;
  text-align: center;
  color: ${(p) => p.theme.textDimmed.base};
`;

const Status = styled.code`
  color: ${(p) => p.theme.textDimmed.base};
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
    border-color: ${(p) => p.theme.divider.base};
  }

  &[data-state="fetching"] {
    border-color: ${(p) => p.theme.pending.base};
  }

  &[data-state="success"] {
    border-color: ${(p) => p.theme.success.base};
    background-color: ${(p) => p.theme.success.base};
  }

  &[data-state="error"] {
    border-color: ${(p) => p.theme.error.base};
    background-color: ${(p) => p.theme.error.base};
  }
`;
