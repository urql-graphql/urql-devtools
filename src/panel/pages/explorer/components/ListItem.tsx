import React, {
  useContext,
  useMemo,
  useCallback,
  FC,
  useEffect,
  useRef,
} from "react";
import { animated } from "react-spring";
import styled from "styled-components";
import { ParsedFieldNode } from "../../../context/Explorer/ast";
import { ExplorerContext } from "../../../context";
import { useFlash } from "../hooks";
import { InlineCodeHighlight, Arrow } from "../../../components";
import { Arguments } from "./Arguments";
import { Tree } from "./Tree";

interface ListItemProps {
  node: ParsedFieldNode;
  depth?: number;
}

export const ListItem: FC<ListItemProps> = ({ node, depth = 0 }) => {
  const previousNode = useRef(node);
  const [flashStyle, flash] = useFlash();
  const { expandedNodes, setExpandedNodes, setFocusedNode } = useContext(
    ExplorerContext
  );
  const isExpanded = useMemo(
    () => expandedNodes.some((n) => n._id === node._id),
    [node, expandedNodes]
  );

  useEffect(() => {
    // Child changed
    if (!isExpanded && previousNode.current.children !== node.children) {
      flash();
    }

    // Value changed
    if (
      !previousNode.current.children &&
      previousNode.current.value !== node.value
    ) {
      flash();
    }

    previousNode.current = node;
  }, [isExpanded, flash, node]);

  const handleFieldContainerClick = useCallback(() => {
    if (isExpanded) {
      setExpandedNodes((n) =>
        n.slice(
          0,
          n.findIndex((n) => n._id === node._id)
        )
      );
      setFocusedNode(undefined);
      return;
    }

    setExpandedNodes((n) => [...n, node]);
    setFocusedNode(node);
  }, [isExpanded, node, setExpandedNodes]);

  if (
    (Array.isArray(node.children) && node.children.length > 0) ||
    node.children
  ) {
    return (
      <Item role="treeitem" withChildren>
        <OutlineContainer
          onClick={handleFieldContainerClick}
          style={flashStyle}
          aria-expanded={isExpanded}
        >
          <Arrow data-active={isExpanded} />
          <ChildrenName>{node.name}</ChildrenName>
          <Arguments args={node.args} />
        </OutlineContainer>
        {isExpanded && <Tree nodeMap={node.children} depth={depth + 1} />}
      </Item>
    );
  }

  const contents = (
    <ListItemKeyVal>
      <Name>{node.name}</Name>
      {": "}
      <animated.span style={flashStyle}>
        <InlineCodeHighlight
          code={JSON.stringify(node.children || node.value) || "undefined"}
          language="json"
        />
      </animated.span>
    </ListItemKeyVal>
  );

  if (node.args) {
    return (
      <Item role="treeitem" withChildren={false}>
        <OutlineContainer style={flashStyle} aria-expanded={isExpanded}>
          {contents}
        </OutlineContainer>
      </Item>
    );
  }
  return (
    <Item role="treeitem" withChildren={false}>
      {contents}
    </Item>
  );
};

const ListItemKeyVal = styled.div`
  margin: 0;
`;

export const SystemListItem: React.FC<{
  node: ParsedFieldNode;
  index?: number;
}> = ({ node, index }) => (
  <Item withChildren={false}>
    <Typename>
      {`${node.value}`}
      {typeof index === "number" ? ` #${index}` : null}
    </Typename>
  </Item>
);

const Item = styled.li`
  padding-left: ${({ withChildren }: { withChildren: boolean }) =>
    withChildren ? "0" : "1rem"};
  min-height: 1.4rem;
  line-height: 1.4rem;
  color: ${(p) => p.theme.grey["-1"]};
`;

const OutlineContainer = styled(animated.div)`
  cursor: pointer;
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  align-items: center;
  width: 100%;
  padding-left: 3px;
`;

const Name = styled.span`
  color: ${(p) => p.theme.light["-9"]};
`;

const ChildrenName = styled.span`
  flex-shrink: 0;
  margin-right: 3px;
  color: ${(p) => p.theme.light["0"]};
  font-weight: bold;
  font-size: 13px;
`;

const Typename = styled.div`
  display: inline-block;
  margin-left: -7px;
  margin-bottom: 0.15rem;
  margin-top: -0.1rem;
  padding: 3px 5px;
  border: 1px solid ${(p) => `${p.theme.grey["-1"]}`};
  border-radius: 2px;
  background-color: ${(p) => p.theme.dark["+1"]};
  color: ${(p) => p.theme.grey["+2"]};
  font-size: 11px;
  line-height: 1rem;
`;
