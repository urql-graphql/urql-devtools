import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Background } from "../components/Background";
import { ExplorerContext } from "../context";
import { FieldNode } from "../context/Explorer/ast";
import { Tree } from "./Tree";
import { DetailView } from "./DetailView";

export function Explorer() {
  const { data } = useContext(ExplorerContext);
  const [focusedNodeId, setFocusedNodeId] = useState<string>("");
  const [detailViewNode, setDetailViewNode] = useState<FieldNode | null>(null);

  const setActiveNode = (node: FieldNode) => setFocusedNodeId(node._id);

  return (
    <Container>
      <ListContainer>
        {Object.keys(data).length ? (
          <Tree
            nodeMap={data}
            setFocusedNode={setActiveNode}
            setDetailView={setDetailViewNode}
            activeId={focusedNodeId}
          />
        ) : (
          <TitleWrapper>
            <Title>Responses will be shown here</Title>
            <span>Make a new request or refresh the page</span>
          </TitleWrapper>
        )}
      </ListContainer>
      <SidePanel>
        <DetailView node={detailViewNode} />
      </SidePanel>
    </Container>
  );
}

const Container = styled(Background)`
  background-color: ${p => p.theme.dark["0"]};
`;

const SidePanel = styled.aside`
  flex: 1;
  flex-basis: 30%;
  padding: 1rem;
  background-color: ${p => p.theme.dark["-1"]};
  overflow: auto;
`;

const ListContainer = styled.section`
  flex: 2;
  flex-basis: 70%;
  padding: 1rem;
  overflow: auto;
`;

const TitleWrapper = styled.div`
  padding: 1rem;
  color: ${p => p.theme.grey["+2"]};
  font-weight: normal;
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: 1rem;
`;
