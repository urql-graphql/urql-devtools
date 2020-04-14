import React, { ComponentProps, FC } from "react";
import styled from "styled-components";
import { Background } from "../../components/Background";
import { Query, Response, Settings } from "./components";

export const Request: FC<ComponentProps<typeof Page>> = (props) => {
  return (
    <Page {...props}>
      <Settings />
      <PageContent>
        <Query />
        <Response />
      </PageContent>
    </Page>
  );
};

const Page = styled(Background)`
  background-color: ${(p) => p.theme.dark["0"]};
  @media (min-aspect-ratio: 1/1) {
    flex-direction: column;
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

  .react-codemirror2 {
    display: flex;
    flex-grow: 1;
  }

  .CodeMirror {
    font-size: 12px;
    height: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;
