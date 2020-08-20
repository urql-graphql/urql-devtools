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

const createIssueUrl = (err: Error) => {
  const uri = `https://github.com/FormidableLabs/urql-devtools/issues/new`;
  const params = new URLSearchParams({
    title: `[Runtime error]: ${err.message || "Unknown error"}`,
    body: `
## About
A runtime error occurred.

## Reproduction

<!-- Enter steps taken to reproduce the error. -->

## Additional info

<!-- Any additional info that may be useful. -->

## Stack trace

\`\`\`
${err.stack}
\`\`\`
  `,
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
