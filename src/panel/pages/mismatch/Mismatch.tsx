import React, { FC, ComponentProps } from "react";
import styled from "styled-components";
import { rem } from "polished";
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
  width: ${rem(300)};
  margin: ${(p) => p.theme.space[3]};
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
      margin: ${(p) => p.theme.space[6]};
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

const Icon = styled(FontAwesomeIcon)`
  font-size: ${(p) => p.theme.fontSizes.display.l};
  margin-bottom: ${(p) => p.theme.space[9]};
  color: ${(p) => p.theme.colors.error.base};
`;

const Code = styled(CodeHighlight)`
  width: 100%;
  box-sizing: border-box;
`;
