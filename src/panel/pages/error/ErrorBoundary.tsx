import React, { Component, ComponentProps } from "react";
import { faBug, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { CodeHighlight } from "../../components";
import { openExternalUrl } from "../../util";

export class ErrorBoundary extends Component<
  ComponentProps<typeof Container>,
  { error?: Error }
> {
  state: { error?: Error } = {};

  componentDidCatch(error: Error): void {
    this.setState({
      error: error,
    });
  }

  private handleReloadClick = () => {
    window.location.reload();
  };

  private handleReportClick = () => {
    if (!this.state.error) {
      return;
    }

    const url = createIssueUrl(this.state.error);
    openExternalUrl(url);
  };

  render(): React.ReactNode {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <Container {...this.props}>
        <Content>
          <BugIcon icon={faBug} />
          <Header>Unexpected Error</Header>
          <Hint>
            Something went wrong and {"we're"} not totally sure why...
          </Hint>
          <ButtonArray>
            <Button data-type="icon" onClick={this.handleReloadClick}>
              <FontAwesomeIcon icon={faRedoAlt} />
            </Button>
            <Button onClick={this.handleReportClick}>Report issue</Button>
          </ButtonArray>
        </Content>
        <Content>
          <Code code={this.state.error.stack} />
        </Content>
      </Container>
    );
  }
}

const generateErrorTemplate = (err: Error) => {
  if (process.env.BUILD_ENV === "extension") {
    return `
  | name                           | about                                                              | title | labels | assignees |
  | ------------------------------ | ------------------------------------------------------------------ | ----- | ------ | --------- |
  | Bug report (browser extension) | Create a bug report for the browser extension version of devtools. |       | Bug    |           |

  # About
    
  <!-- Replace the below description with a brief summary -->
    
  Devtools does not detect a running instance of urql.
  
  # Reproduction
  
  <!-- Replace the below steps with your reproduction. -->
  
  1.  Clone [this example](https://github.com/FormidableLabs/urql/tree/main/packages/react-urql/examples/1-getting-started) project
  2.  Run \`yarn install\`
  3.  Run \`yarn start\`
  4.  Open chrome and navigate to [http://localhost:8080](http://localhost:8080)
  5.  Open the urql devtools panel
  
  ## Expected result
  
  <!-- Tell us what you expected. -->
  
  - Extension detects app
  
  ## Actual result
  
  <!-- Tell us what actually happened. -->
  
  - Extension shows message "Waiting for exchange"
  
    ## Stack trace
  
  \`\`\`
  ${err.stack}
  \`\`\`
  
  # Additional info
  
  | environment    | version   |
  | -------------- | --------- |
  | browser        | Chrome 69 |
  | urql           | 0.0.0     |
  | urql devtools  | 0.0.0     |
  | @urql/devtools | 0.0.0     |
    `;
  }
  // Electron error template
  return `
  | name                    | about                                                              | title | labels        | assignees |
  | ----------------------- | ------------------------------------------------------------------ | ----- | ------------- | --------- |
  | Bug report (standalone) | Create a bug report for the native/standalone version of devtools. |       | Bug, Electron |           |
  
  # About
  
  <!-- Replace the below description with a brief summary -->
  
  Devtools is unresponsive when using on an Android device with expo.
  
  # Reproduction
  
  <!-- Replace the below steps with your reproduction. -->
  
  1.  Clone [this example](https://github.com/kadikraman/UrqlTest) react native project
  2.  Plug in Android phone via USB
  3.  Run \`yarn install\`
  4.  Run \`yarn start\`
  5.  Open devtools using npx \`npx urql-devtools\`
    
  ## Expected result
  
  <!-- Tell us what you expected. -->
  
  - App opens on Android phone
  - Urql Devtools opens in standalone window
  - Urql devtools detects app
  
  ## Actual result
  
  <!-- Tell us what actually happened. -->
  
  - App opens on Android phone
  - Urql devtools opens in standalone window
  - Urql devtools stays on "waiting for exchange" notice  
  ## Stack trace
  
  \`\`\`
  ${err.stack}
  \`\`\`
  
  # Additional info
  
  | environment    | version        |
  | -------------- | -------------- |
  | os             | Macbuntu 20.04 |
  | node           | 0.0.0          |
  | urql           | 0.0.0          |
  | urql-devtools  | 0.0.0          |
  | @urql/devtools | 0.0.0          |
  `;
};

const createIssueUrl = (err: Error) => {
  const uri = `https://github.com/FormidableLabs/urql-devtools/issues/new`;
  const params = new URLSearchParams({
    title: `[Runtime error]: ${err.message || "Unknown error"}`,
    body: generateErrorTemplate(err),
  });

  return `${uri}?${params}`;
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  width: 400px;
  margin: 20px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.dark["0"]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;

  @media (min-width: 768px) {
    flex-direction: row;

    & > ${Content} {
      margin: 20px;
    }
  }
`;

const Header = styled.h1`
  color: ${(p) => p.theme.light["0"]};
  font-weight: 400;
  margin: 0;
`;

const Hint = styled.p`
  text-align: center;
  color: ${(p) => p.theme.grey["+4"]};
`;

const BugIcon = styled(FontAwesomeIcon)`
  font-size: 60px;
  margin-bottom: 40px;
  color: ${(p) => p.theme.red["0"]};
`;

const Code = styled(CodeHighlight)`
  max-width: 100%;
  box-sizing: border-box;
  color: ${(p) => p.theme.red["0"]};
`;

const Button = styled.button`
  margin: 5px;
  padding: 7px 15px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  color: ${(p) => p.theme.light["-6"]};
  background: ${(p) => p.theme.dark["+5"]};
  border-color: ${(p) => p.theme.dark["+5"]};

  &[data-type="icon"] {
    padding: 7px 10px;
  }

  &:hover:not(:active) {
    color: ${(p) => p.theme.light["-2"]};
    background-color: ${(p) => p.theme.dark["+9"]};
  }
`;

const ButtonArray = styled.div`
  display: flex;
`;
