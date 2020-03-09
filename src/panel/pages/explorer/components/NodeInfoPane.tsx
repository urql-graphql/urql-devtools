import React, { FC, useContext, useMemo } from "react";
import styled from "styled-components";
import { ParsedFieldNode, ParsedNodeMap } from "../../../context/Explorer/ast";
import { Context, Variables } from "../../../context/Explorer/ast/types";
import { Pane } from "../../../components";
import { ExplorerContext } from "../../../context";
import { Value } from "./Value";
import { CacheOutcomeIcon } from "./Icons";

export const NodeInfoPane: FC = () => {
  const { focusedNode } = useContext(ExplorerContext);

  const content = useMemo(() => {
    if (!focusedNode) {
      return (
        <TextContainer>
          <Text>Select a node to see more information...</Text>
        </TextContainer>
      );
    }

    return <NodeInfoContent node={focusedNode} />;
  }, [focusedNode]);

  return (
    <Pane>
      <PaneBody>{content}</PaneBody>
    </Pane>
  );
};

const NodeInfoContent: FC<{ node: ParsedFieldNode }> = ({ node }) => (
  <>
    <Container>
      <Title>Name</Title>
      <Name>{node.name}</Name>
    </Container>
    {node.cacheOutcome ? (
      <Container>
        <Title>Cache Outcome</Title>
        <div>
          <CacheIcon state={node.cacheOutcome} />
          <Name>{node.cacheOutcome}</Name>
          {getDescription(node.cacheOutcome)}
        </div>
      </Container>
    ) : null}
    {node.args ? (
      <Container>
        <Title>Arguments</Title>
        <Code>
          <Value value={node.args} expand={true} />
        </Code>
      </Container>
    ) : null}
    {node.value || node.children ? (
      <Container>
        <Title>Value</Title>
        {node.value !== undefined ? (
          <Value
            value={node.children !== undefined ? node.children : node.value}
            expand={false}
          />
        ) : (
          renderChildren(node)
        )}
      </Container>
    ) : null}
  </>
);

const gatherChildValues = (
  values: ParsedNodeMap | ParsedNodeMap[] | undefined | Variables
) => {
  if (!values) {
    return null;
  }

  if (!Array.isArray(values) && typeof values !== "object" && values) {
    return values;
  } else {
    return Object.entries(values).reduce((acc, [key, value]) => {
      const childValue =
        value.value !== undefined ? value.value : value.children;

      if (Array.isArray(childValue)) {
        acc[key] = childValue.map(gatherChildValues);
      } else if (childValue && typeof childValue === "object") {
        acc[key] = gatherChildValues(childValue);
      } else {
        acc[key] = childValue;
      }
      return acc;
    }, Object.create(null));
  }
};

const getDescription = (status: Context["cacheOutcome"]) => {
  switch (status) {
    case "hit": {
      return <Description>{"This result was served from cache."}</Description>;
    }
    case "partial": {
      return (
        <Description>
          {"Some values for this result were served from cache."}
        </Description>
      );
    }
    case "miss": {
      return (
        <Description>{"This result wasn't served from cache"}</Description>
      );
    }
    default: {
      return null;
    }
  }
};

const renderChildren = (node: ParsedFieldNode) => {
  return (
    <Code key={node._id}>
      {Array.isArray(node.children) ? (
        <Value value={node.children} />
      ) : (
        <Value value={gatherChildValues(node.children)} expand />
      )}
    </Code>
  );
};

const PaneBody = styled(Pane.Body)`
  padding: 20px;
`;

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  text-transform: uppercase;
  color: ${p => p.theme.purple["+1"]};
  font-size: 12px;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const Name = styled.code`
  color: ${p => p.theme.grey["+2"]};
`;

const Description = styled.p`
  color: ${p => p.theme.grey["+2"]}d4;
  margin-bottom: 0;
  margin-top: 5px;
`;

const Code = styled.code`
  display: block;
  color: ${p => p.theme.grey["-1"]};
  white-space: pre;

  & > code {
    padding-left: 1rem;
  }
  & > * {
    display: block;
  }
`;

const TextContainer = styled.div`
  padding: 2rem 1rem;
`;

const Text = styled.p`
  text-align: center;
  color: ${p => p.theme.grey["-1"]};
`;

const CacheIcon = styled(CacheOutcomeIcon)`
  position: relative;
  top: 1px;
  margin-right: 0.5rem;
`;
