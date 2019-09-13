/** Copied from https://github.com/FormidableLabs/urql-exchange-graphcache/blob/master/src/types.ts */

import { DocumentNode, FragmentDefinitionNode, SelectionNode } from "graphql";

// Helper types
export type NullArray<T> = (null | T)[];

// GraphQL helper types
export type SelectionSet = readonly SelectionNode[];
export interface Fragments {
  [fragmentName: string]: void | FragmentDefinitionNode;
}

// Scalar types are not entities as part of response data
export type Primitive = null | number | boolean | string;

export interface ScalarObject {
  __typename?: never;
  [key: string]: any;
}

export type Scalar = Primitive | ScalarObject;

export interface SystemFields {
  __typename: string;
  _id?: string | number | null;
  id?: string | number | null;
}

export type EntityField = undefined | Scalar | Scalar[];
export type DataField = Scalar | Scalar[] | Data | NullArray<Data>;

export interface DataFields {
  [fieldName: string]: DataField;
}

export type Data = SystemFields & DataFields;
export type Link<Key = string> = null | Key | NullArray<Key>;
export type ResolvedLink = Link<Data>;

export interface Variables {
  [name: string]: Scalar | Scalar[] | Variables | NullArray<Variables>;
}

export interface ResolveInfo {
  fragments: Fragments;
  variables: Variables;
}

export type KeyGenerator = (data: Data) => null | string;

export interface KeyingConfig {
  [typename: string]: KeyGenerator;
}

// Completeness of the query result
export type Completeness = "EMPTY" | "PARTIAL" | "FULL";
