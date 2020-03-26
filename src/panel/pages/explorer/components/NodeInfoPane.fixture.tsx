import React from "react";
import { ExplorerContext } from "../../../context";
import { NodeInfoPane } from "./NodeInfoPane";

const explorerContextValue = {
  operations: {},
  setFocusedNode: () => false,
  focusedNode: {
    _id: "1234",
    _owner: {},
    name: "Hello",
    key: "1234",
  },
} as const;

export default {
  empty: (
    <ExplorerContext.Provider
      value={{ ...explorerContextValue, focusedNode: undefined }}
    >
      <NodeInfoPane />
    </ExplorerContext.Provider>
  ),
  "cache hit": (
    <ExplorerContext.Provider
      value={{
        ...explorerContextValue,
        focusedNode: {
          ...explorerContextValue.focusedNode,
          cacheOutcome: "hit",
        },
      }}
    >
      <NodeInfoPane />
    </ExplorerContext.Provider>
  ),
  "cache miss": (
    <ExplorerContext.Provider
      value={{
        ...explorerContextValue,
        focusedNode: {
          ...explorerContextValue.focusedNode,
          cacheOutcome: "miss",
        },
      }}
    >
      <NodeInfoPane />
    </ExplorerContext.Provider>
  ),
  "cache partial": (
    <ExplorerContext.Provider
      value={{
        ...explorerContextValue,
        focusedNode: {
          ...explorerContextValue.focusedNode,
          cacheOutcome: "partial",
        },
      }}
    >
      <NodeInfoPane />
    </ExplorerContext.Provider>
  ),
  "with args": (
    <ExplorerContext.Provider
      value={{
        ...explorerContextValue,
        focusedNode: {
          ...explorerContextValue.focusedNode,
          args: {
            name: "hello",
            age: 1234,
          },
        },
      }}
    >
      <NodeInfoPane />
    </ExplorerContext.Provider>
  ),
  "with value (object)": (
    <ExplorerContext.Provider
      value={{
        ...explorerContextValue,
        focusedNode: {
          ...explorerContextValue.focusedNode,
          value: {
            property: "Object value",
          },
        },
      }}
    >
      <NodeInfoPane />
    </ExplorerContext.Provider>
  ),
  "with value (string)": (
    <ExplorerContext.Provider
      value={{
        ...explorerContextValue,
        focusedNode: {
          ...explorerContextValue.focusedNode,
          value: "Hello",
        },
      }}
    >
      <NodeInfoPane />
    </ExplorerContext.Provider>
  ),
  "with children": (
    <ExplorerContext.Provider
      value={{
        ...explorerContextValue,
        focusedNode: {
          ...explorerContextValue.focusedNode,
          children: {
            child1: {
              ...explorerContextValue.focusedNode,
              value: "I'm a child node",
            },
          },
        },
      }}
    >
      <NodeInfoPane />
    </ExplorerContext.Provider>
  ),
};
