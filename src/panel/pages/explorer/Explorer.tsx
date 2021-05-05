import React, { useContext, FC, ComponentProps } from "react";
import styled from "styled-components";
import { Background } from "../../components";
import { ExplorerContext } from "../../context";
import { Tree, NodeInfoPane } from "./components";

export const Explorer: FC<ComponentProps<typeof Container>> = (props) => {
  const { operations } = useContext(ExplorerContext);

  return (
    <Container {...props}>
      <ListContainer>
        {Object.keys(operations).length ? (
          <Tree nodeMap={operations} />
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
};

const Container = styled(Background)`
  background-color: ${(p) => p.theme.canvas};
`;

const ListContainer = styled.section`
  flex: 2;
  flex-basis: 70%;
  overflow: auto;
`;

const TitleWrapper = styled.div`
  padding: 1rem;
  color: ${(p) => p.theme.textDimmed};
  font-weight: normal;
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: 1rem;
`;
