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
            <Description>Make a new request or refresh the page</Description>
          </TitleWrapper>
        )}
      </ListContainer>
      <NodeInfoPane />
    </Container>
  );
};

const Container = styled(Background)`
  background-color: ${(p) => p.theme.colors.canvas.base};
`;

const ListContainer = styled.section`
  flex: 2;
  flex-basis: 70%;
  overflow: auto;
`;

const TitleWrapper = styled.div`
  padding: ${(p) => p.theme.space[6]};
  color: ${(p) => p.theme.colors.textDimmed.base};
  font-weight: normal;
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: ${(p) => p.theme.fontSizes.body.xl};
  line-height: ${(p) => p.theme.lineHeights.body.xl};
  color: ${(p) => p.theme.colors.text.base};
  margin: 0;
`;

const Description = styled.p`
  margin-top: ${(p) => p.theme.space[3]};
`;
