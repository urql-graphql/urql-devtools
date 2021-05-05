import React, {
  FC,
  useContext,
  useMemo,
  ComponentProps,
  useState,
  useCallback,
  useRef,
} from "react";
import styled from "styled-components";
import { ParsedFieldNode } from "../../../context/Explorer/ast";
import { Pane, CodeHighlight } from "../../../components";
import { ExplorerContext } from "../../../context";
import { CacheOutcomeIcon } from "./Icons";

export const NodeInfoPane: FC<ComponentProps<typeof Pane>> = (props) => {
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
    <Pane {...props}>
      <Pane.Body>{content}</Pane.Body>
    </Pane>
  );
};

const NodeInfoContent: FC<{ node: ParsedFieldNode }> = ({ node }) => {
  const previousNode = useRef(node);
  const [expanded, setExpanded] = useState(false);

  const value = useMemo(
    () =>
      node.value || node.children
        ? JSON.stringify(node.value || node.children, null, 2)
        : false,
    [node.value, node.children]
  );

  const isExpanded = useMemo(
    () =>
      (value && value.length < 10000) ||
      (expanded && previousNode.current._id == node._id),
    [node._id, expanded, value]
  );

  const handleReveal = useCallback(() => setExpanded(true), []);

  previousNode.current = node;

  return (
    <>
      <Pane.Item>
        <Pane.ItemTitle>Name</Pane.ItemTitle>
        <Name>{node.name}</Name>
      </Pane.Item>
      {node.cacheOutcome ? (
        <Pane.Item>
          <Pane.ItemTitle>Cache Outcome</Pane.ItemTitle>
          <CacheIcon state={node.cacheOutcome} />
          <Name>{node.cacheOutcome}</Name>
          {getDescription(node.cacheOutcome)}
        </Pane.Item>
      ) : null}
      {node.args ? (
        <Pane.Item>
          <Pane.ItemTitle>Arguments</Pane.ItemTitle>
          <CodeHighlight
            code={JSON.stringify(node.args, null, 2)}
            language="javascript"
          />
        </Pane.Item>
      ) : null}
      {value ? (
        <Pane.Item>
          <Pane.ItemTitle>Value</Pane.ItemTitle>
          {isExpanded ? (
            <CodeHighlight code={value} language="javascript" />
          ) : (
            <ExpandPrompt role={"button"} onClick={handleReveal}>
              Click to expand
            </ExpandPrompt>
          )}
        </Pane.Item>
      ) : null}
    </>
  );
};

const getDescription = (status: ParsedFieldNode["cacheOutcome"]) => {
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

const ExpandPrompt = styled.div`
  text-align: center;
  padding: 15px;
  background: ${(p) => p.theme.dark["+2"]};
  color: ${(p) => p.theme.grey["+6"]};
  cursor: pointer;
`;

const Name = styled.code`
  color: ${(p) => p.theme.grey["+2"]};
`;

const Description = styled.p`
  color: ${(p) => p.theme.grey["+2"]}d4;
  margin-bottom: 0;
  margin-top: 5px;
`;

const TextContainer = styled.div`
  padding: 20px;
`;

const Text = styled.p`
  margin: 0;
  text-align: center;
  color: ${(p) => p.theme.grey["-1"]};
`;

const CacheIcon = styled(CacheOutcomeIcon)`
  position: relative;
  top: 1px;
  margin-right: 0.5rem;
`;
