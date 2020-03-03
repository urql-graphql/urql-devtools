import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Background } from "../../components";
import { ExplorerContext } from "../../context";
import { FieldNode } from "../../context/Explorer/ast";
import { Tree } from "./Tree";
import { NodeInfoPane } from "./NodeInfoPane";

export function Explorer() {
  const { operations } = useContext(ExplorerContext);

  return (
    <Container>
      <ListContainer>
        {Object.keys(operations).length ? (
          <Tree
            nodeMap={operations}
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
      <NodeInfoPane />
    </Container>
  );
}

const Container = styled(Background)`
  background-color: ${p => p.theme.dark["0"]};
`;

const ListContainer = styled.section`
  flex: 2;
  flex-basis: 70%;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  overflow: auto;

  @media (min-aspect-ratio: 1/1) {
    padding-right: 1px;
  }
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
