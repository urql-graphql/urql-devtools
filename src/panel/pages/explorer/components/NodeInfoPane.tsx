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
      <PaneBody>{content}</PaneBody>
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
          <CodeHighlight
            code={JSON.stringify(node.args, null, 2)}
            language="json"
          />
        </Container>
      ) : null}
      {value ? (
        <Container>
          <Title>Value</Title>
          {isExpanded ? (
            <CodeHighlight code={value} language="json" />
          ) : (
            <ExpandPrompt role={"button"} onClick={handleReveal}>
              Click to expand
            </ExpandPrompt>
          )}
        </Container>
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
  background: ${(p) => p.theme.dark["+3"]};
  color: ${(p) => p.theme.grey["+6"]};
  cursor: pointer;
`;

const PaneBody = styled(Pane.Body)`
  padding: 20px;
`;

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  color: ${(p) => p.theme.light["0"]};
  font-size: 13px;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0.5rem;
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
  padding: 2rem 1rem;
`;

const Text = styled.p`
  text-align: center;
  color: ${(p) => p.theme.grey["-1"]};
`;

const CacheIcon = styled(CacheOutcomeIcon)`
  position: relative;
  top: 1px;
  margin-right: 0.5rem;
`;
