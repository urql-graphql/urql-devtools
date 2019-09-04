import React, { useState, useContext, useMemo } from "react";
import styled from "styled-components";
import { Background } from "../components/Background";
import { ExplorerContext } from "../context";
import { NodeMap, FieldNode } from "../context/explorer/ast";
import { ListItem, List } from "./ListItem";
import { DetailView } from "./DetailView";

export function Explorer() {
  const [panelContents, setPanelContents] = useState<FieldNode | null>(null);
  const { data } = useContext(ExplorerContext);

  const renderTree = (data: NodeMap | NodeMap[]) =>
    useMemo(() => {
      if (Array.isArray(data) && data.length > 0) {
        return data.map((el: any) => {
          const keys = Object.keys(el);
          return (
            <List>
              {keys.map(key => (
                <ListItem
                  node={el[key]}
                  renderChildren={renderTree}
                  openDetailView={setPanelContents}
                />
              ))}
            </List>
          );
        });
      } else if (typeof data === "object" && !Array.isArray(data)) {
        const keys = Object.keys(data);
        return keys.map((key: string) => {
          const node: FieldNode = data[key];

          if (node) {
            return (
              <ListItem
                node={node}
                renderChildren={renderTree}
                openDetailView={setPanelContents}
              />
            );
          }
        });
      } else {
        return null;
      }
    }, [data]);

  return (
    <Container>
      <ListContainer>
        <List role="tree">{renderTree(data)}</List>
      </ListContainer>
      <SidePanel>
        <DetailView node={panelContents} />
      </SidePanel>
    </Container>
  );
}

const Container = styled(Background)`
  background-color: ${p => p.theme.dark["0"]};
`;

const SidePanel = styled.aside`
  flex: 1;
  flex-basis: 30%;
  padding: 1rem;
  background-color: ${p => p.theme.dark["-2"]};
  overflow: auto;
`;

const ListContainer = styled.section`
  flex: 2;
  flex-basis: 70%;
  padding: 1rem;
  overflow: auto;
`;
