import React, { FC, ComponentProps } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { CodeHighlight } from "../../components";
import { useDevtoolsContext } from "../../context";

export const Mismatch: FC<ComponentProps<typeof Container>> = (props) => {
  const { client } = useDevtoolsContext();

  if (!client.connected) {
    return null;
  }

  return (
    <Container {...props}>
      <Content>
        <Icon icon={faBomb} />
        <Header>Version Mismatch</Header>
        <Hint>
          Expected devtools exchange (@urql/devtools) version{" "}
          <em>{`>=${client.version.required}`}</em> but got{" "}
          <em>{`${client.version.actual}.`}</em>
        </Hint>
      </Content>
      <Content>
        <Code code={code} language="shell" />
      </Content>
    </Container>
  );
};

const code = `\
# Yarn
yarn add @urql/devtools

# Npm
npm update @urql/devtools
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.canvas};
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
  color: ${(p) => p.theme.text};
  font-weight: 400;
  margin: 0;
`;

const Hint = styled.p`
  text-align: center;
  color: ${(p) => p.theme.textDimmed};
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 80px;
  margin-bottom: 40px;
  color: ${(p) => p.theme.error};
`;

const Code = styled(CodeHighlight)`
  width: 100%;
  box-sizing: border-box;
`;
