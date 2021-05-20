import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { rem } from "polished";
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
  padding: ${(p) => p.theme.space[6]};
  text-align: center;
  color: ${(p) => p.theme.colors.textDimmed.base};
`;

const Status = styled.code`
  color: ${(p) => p.theme.colors.textDimmed.base};
  font-size: ${(p) => p.theme.fontSizes.body.m};
  line-height: ${(p) => p.theme.lineHeights.body.m};
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  display: block;
  margin-right: ${(p) => p.theme.space[3]};
  width: ${rem(9)};
  height: ${rem(9)};
  box-sizing: border-box;
  border: solid 1px;
  border-radius: 50%;

  &[data-state="idle"] {
    border-color: ${(p) => p.theme.colors.divider.base};
  }

  &[data-state="fetching"] {
    border-color: ${(p) => p.theme.colors.pending.base};
  }

  &[data-state="success"] {
    border-color: ${(p) => p.theme.colors.success.base};
    background-color: ${(p) => p.theme.colors.success.base};
  }

  &[data-state="error"] {
    border-color: ${(p) => p.theme.colors.error.base};
    background-color: ${(p) => p.theme.colors.error.base};
  }
`;
