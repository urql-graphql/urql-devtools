/** Copied from https://github.com/FormidableLabs/urql-exchange-graphcache/blob/master/src/ast/node.ts */

import { SelectionNode, InlineFragmentNode, FieldNode, Kind } from "graphql";

export const isFieldNode = (node: SelectionNode): node is FieldNode =>
  node.kind === Kind.FIELD;

export const isInlineFragment = (
  node: SelectionNode
): node is InlineFragmentNode => node.kind === Kind.INLINE_FRAGMENT;
