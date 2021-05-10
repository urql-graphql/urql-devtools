import React, { ComponentProps, FC } from "react";
import styled from "styled-components";
import { Background } from "../../components/Background";
import { Pane } from "../../components";
import { Query, Schema, Settings, Response } from "./components";

export const Request: FC<ComponentProps<typeof Page>> = (props) => {
  return (
    <Page {...props}>
      <Settings />
      <PageContent>
        <Query />
        {/* {TODO: Hack to offset the panels so they aren't on top of each other.
       There's definitely better way to do this */}
        <Pane initSize={{ y: 700, x: 400 }}>
          <PaneBody>
            <PaneSection>
              <Response />
            </PaneSection>
          </PaneBody>
          {/* {TODO: Also a hack to make these panes work together, sorry! */}
          <SchemaContainer
            forcedOrientation={{ isPortrait: true }}
            initSize={{ y: 350, x: 400 }}
          >
            <PaneBody>
              <Schema />
            </PaneBody>
          </SchemaContainer>
        </Pane>
      </PageContent>
    </Page>
  );
};

const PaneBody = styled(Pane.Body)`
  display: flex;
  flex-grow: 1;
`;

const PaneSection = styled.section`
  color: ${(p) => p.theme.colors.text.base};
  background: ${(p) => p.theme.colors.canvas.base};
  overflow: auto;
  flex-grow: 1;
  flex-basis: 0;

  h1 {
    background-color: ${(p) => p.theme.colors.text.base};
    position: sticky;
    top: ${(p) => `-${p.theme.space[6]}`};
    margin: ${(p) => `-${p.theme.space[6]}`};
    padding: ${(p) => `${p.theme.space[1]} ${p.theme.space[3]}`};
    font-size: ${(p) => p.theme.fontSizes.body.m};
    line-height: ${(p) => p.theme.lineHeights.body.m};
    font-weight: 400;
    border-bottom: solid 1px ${(p) => p.theme.colors.divider.base};
    z-index: 1;
  }

  h1 + * {
    margin-top: ${(p) => p.theme.space[8]};
  }
`;

const Page = styled(Background)`
  background-color: ${(p) => p.theme.colors.canvas.base};
  @media (min-aspect-ratio: 1/1) {
    flex-direction: column;
  }
`;

const SchemaContainer = styled(Pane)`
  & > div {
    min-width: 100%;
    width: 100%;
  }
`;

const PageContent = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;
  }

  .CodeMirror {
    font-size: ${(p) => p.theme.fontSizes.body.m};
    height: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;
