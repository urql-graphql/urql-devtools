import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { RequestContext } from "../../../context";
import { Pane, CodeHighlight } from "../../../components";

export const Response = () => {
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
            language="json"
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
            language="json"
          />
        ),
      };
    }

    return {
      state: "Idle",
      code: null,
    };
  }, [fetching, response, error]);

  const content = useMemo(() => {
    if (state === "Idle") {
      return <Prompt>Run a query to see what the client returns...</Prompt>;
    }

    return (
      <>
        <Title>State</Title>
        <Status>
          <Icon data-state={state.toLowerCase()} /> {state}
        </Status>
        {code && (
          <>
            <Title>Response</Title>
            {code}
          </>
        )}
      </>
    );
  }, [code, state]);

  return (
    <Pane>
      <PaneBody>
        <PaneSection>{content}</PaneSection>
      </PaneBody>
    </Pane>
  );
};

const Prompt = styled.div`
  padding: 30px;
  text-align: center;
  color: ${(p) => p.theme.grey["0"]};
`;

const Status = styled.code`
  color: ${(p) => p.theme.grey["+2"]};
  margin-bottom: 15px;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  display: block;
  margin-right: 7px;
  width: 10px;
  height: 10px;
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

const PaneBody = styled(Pane.Body)`
  display: flex;
  flex-grow: 1;
`;

const PaneSection = styled.section`
  color: #fff;
  background: ${(props) => props.theme.dark[0]};
  padding: 20px;
  overflow: scroll;
  flex-grow: 1;
  flex-basis: 0;

  h1 {
    background-color: ${(p) => p.theme.dark["+3"]};
    position: sticky;
    top: -20px;
    margin: -20px;
    padding: 2px 10px;
    font-size: 14px;
    font-weight: 400;
    border-bottom: solid 1px ${(p) => p.theme.dark["+5"]};
    z-index: 1;
  }

  h1 + * {
    margin-top: 40px;
  }
`;

const Title = styled.h3`
  color: ${(p) => p.theme.light["0"]};
  font-size: 14px;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;
