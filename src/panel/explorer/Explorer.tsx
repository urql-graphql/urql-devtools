import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Background } from "../components/Background";
import { ExplorerContext } from "../context";
import { FieldNode } from "../context/explorer/ast";
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
        <Tree
          nodeMap={data}
          setFocusedNode={setActiveNode}
          setDetailView={setDetailViewNode}
          activeId={focusedNodeId}
        />
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
  background-color: ${p => p.theme.dark["-2"]};
  overflow: auto;
`;

const ListContainer = styled.section`
  flex: 2;
  flex-basis: 70%;
  padding: 1rem;
  overflow: auto;
`;
