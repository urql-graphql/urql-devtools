import React, { Component, ComponentProps } from "react";
import { faBug, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { rem } from "polished";
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
  # About

  <!-- Replace the below description with a brief summary -->

  Devtools does not detect a running instance of urql.

  # Reproduction

  <!-- Replace the below steps with your reproduction. -->

  1.  Clone [this example](https://github.com/FormidableLabs/urql/tree/main/packages/react-urql/examples/1-getting-started) project
  2.  Run \`pnpm install\`
  3.  Run \`pnpm start\`
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
  # About

  <!-- Replace the below description with a brief summary -->

  Devtools is unresponsive when using on an Android device with expo.

  # Reproduction

  <!-- Replace the below steps with your reproduction. -->

  1.  Clone [this example](https://github.com/kadikraman/UrqlTest) react native project
  2.  Plug in Android phone via USB
  3.  Run \`pnpm install\`
  4.  Run \`pnpm start\`
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
    labels: process.env.BUILD_ENV === "extension" ? "Bug" : "Bug,Electron",
    body: generateErrorTemplate(err),
  });

  return `${uri}?${params}`;
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  width: ${rem(400)};
  margin: ${(p) => p.theme.space[6]};
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.colors.canvas.base};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;

  @media (min-width: 768px) {
    flex-direction: row;

    & > ${Content} {
      margin: ${rem(6)};
    }
  }
`;

const Header = styled.h1`
  color: ${(p) => p.theme.colors.text.base};
  font-weight: 400;
  margin: 0;
`;

const Hint = styled.p`
  text-align: center;
  color: ${(p) => p.theme.colors.textDimmed.base};
`;

const BugIcon = styled(FontAwesomeIcon)`
  font-size: ${(p) => p.theme.fontSizes.display.m};
  margin-bottom: ${(p) => p.theme.space[8]};
  color: ${(p) => p.theme.colors.error.base};
`;

const Code = styled(CodeHighlight)`
  max-width: 100%;
  box-sizing: border-box;
  color: ${(p) => p.theme.colors.error.base};
`;

const Button = styled.button`
  margin: ${(p) => p.theme.space[2]};
  padding: ${(p) => `${p.theme.space[3]} ${p.theme.space[5]}`};
  border-radius: ${(p) => p.theme.radii.m};
  cursor: pointer;
  outline: none;
  color: ${(p) => p.theme.colors.primary.contrast};
  background: ${(p) => p.theme.colors.primary.base};

  &[data-type="icon"] {
    padding: ${(p) => `${p.theme.space[3]} ${p.theme.space[5]}`};
  }

  &:hover {
    background: ${(p) => p.theme.colors.primary.hover};
  }

  &:active {
    background: ${(p) => p.theme.colors.primary.active};
  }
`;

const ButtonArray = styled.div`
  display: flex;
`;
