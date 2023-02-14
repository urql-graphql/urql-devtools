import React, { FC, Fragment } from "react";
import {
  isInterfaceType,
  isObjectType,
  isInputObjectType,
  isUnionType,
  isEnumType,
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedType,
  GraphQLArgument,
  GraphQLEnumValue,
  GraphQLObjectType,
} from "graphql";
import styled from "styled-components";
import { InlineCodeHighlight } from "../../../components";
import { Type } from "./Type";

interface FieldProps {
  node?: GraphQLNamedType;
  setType: (type: GraphQLNamedType) => void;
}

export const Fields: FC<FieldProps> = ({ node, setType }) => {
  if (!node) {
    return null;
  }

  const isDeprecated = (
    field: GraphQLField<any, any, any> | GraphQLEnumValue
  ) =>
    // TODO: this does not exist anymore
    (field as any).isDeprecated ? (
      <Deprecated>{`Deprecated: ${field.deprecationReason}`}</Deprecated>
    ) : null;

  const getDefaultValue = (field: GraphQLInputField | GraphQLArgument) =>
    field.defaultValue !== undefined || null ? (
      <Default>
        {` = `}
        <InlineCodeHighlight
          code={JSON.stringify(field.defaultValue)}
          language="javascript"
        />
      </Default>
    ) : null;

  const getDescription = (
    field:
      | GraphQLField<any, any, any>
      | GraphQLArgument
      | GraphQLInputField
      | GraphQLEnumValue
      | GraphQLObjectType
  ) =>
    field.description ? (
      <Description>{`"${field.description}"`}</Description>
    ) : null;

  if (isObjectType(node) || isInterfaceType(node)) {
    const fields = node.getFields();
    const keys = Object.keys(fields);

    return (
      <>
        {keys.map((field, i) => {
          const args = fields[field].args;
          const hasArgumentLevelDescription = args.some(
            (arg) => arg.description
          );
          const hasFieldLevelDescription = !!fields[field].description;

          return (
            <FieldWrapper
              key={i}
              data-multiline={`${
                hasArgumentLevelDescription || hasFieldLevelDescription
              }`}
            >
              <div>{getDescription(fields[field])}</div>
              <span>
                <Name>{fields[field].name}</Name>
                {args.length > 0 ? "(" : null}
              </span>
              {args.length > 0 ? (
                <>
                  <ArgWrapper data-multiline={`${hasArgumentLevelDescription}`}>
                    {args.map((arg, idx) => (
                      <Fragment key={idx}>
                        {getDescription(arg)}
                        <code>
                          <code>{arg.name}</code>
                          <Separator content=":" />
                          <Type type={arg.type} setType={setType} />
                          {getDefaultValue(arg)}
                          {idx !== args.length - 1 && <Separator content="," />}
                        </code>
                      </Fragment>
                    ))}
                  </ArgWrapper>
                </>
              ) : null}
              <div>
                <span>
                  {args.length ? ")" : null}
                  <Separator content=":" />
                </span>
                <Type type={fields[field].type} setType={setType} />
                {isDeprecated(fields[field])}
              </div>
            </FieldWrapper>
          );
        })}
      </>
    );
  }

  if (isInputObjectType(node)) {
    const fields = node.getFields();
    const keys = Object.keys(fields);

    return (
      <>
        {keys.map((field, i) => {
          return (
            <FieldWrapper key={i}>
              {getDescription(fields[field])}
              <Name>{fields[field].name}</Name>
              <Separator content=":" />
              <Type type={fields[field].type} setType={setType} />
              {getDefaultValue(fields[field])}
            </FieldWrapper>
          );
        })}
      </>
    );
  }

  if (isUnionType(node)) {
    const types = node.getTypes();
    return (
      <>
        {types.map((type, i) => {
          return (
            <FieldWrapper key={i} data-multiline="true">
              {getDescription(type)}
              <span>
                <Separator content="|" />
                <Type type={type} setType={setType} />
              </span>
            </FieldWrapper>
          );
        })}
      </>
    );
  }

  if (isEnumType(node)) {
    const types = node.getValues();
    return (
      <>
        {types.map((type, i) => {
          return (
            <FieldWrapper key={i} data-multiline="true">
              {getDescription(type)}
              <span>
                <code>{type.value}</code>
                {isDeprecated(type)}
              </span>
            </FieldWrapper>
          );
        })}
      </>
    );
  }

  return null;
};

const Description = styled.code`
  color: ${(p) => p.theme.colors.syntax.string};
`;

const FieldWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;
  font-size: ${(p) => p.theme.fontSizes.body.l};
  line-height: ${(p) => p.theme.lineHeights.body.l};
  padding: ${(p) => p.theme.space[3]};
  color: ${(p) => p.theme.colors.text.base};
  white-space: nowrap;

  &:last-child {
    border: none;
  }

  & + & {
    padding-top: 0;
  }

  &[data-multiline="true"] {
    flex-direction: column;

    & > ${Description} {
      margin-bottom: ${(p) => p.theme.space[2]};
    }
  }
`;

const Separator = styled.span`
  &::before {
    content: ${({ content }: { content: string }) => `"${content}"`};
    display: inline-block;
    color: ${(p) => p.theme.colors.text.base};
    margin-right: ${(p) => p.theme.space[2]};
  }
`;

const Name = styled.span`
  color: ${(p) => p.theme.colors.syntax.property};
`;

const Deprecated = styled.code`
  display: inline-block;
  color: ${(p) => p.theme.colors.syntax.invalid};
  margin-left: ${(p) => p.theme.space[2]};
`;

const Default = styled.code`
  display: inline-block;
  color: ${(p) => p.theme.colors.syntax.description};
  margin-left: ${(p) => p.theme.space[2]};
`;

const ArgWrapper = styled.div`
  display: flex;

  &[data-multiline="true"] {
    flex-direction: column;
    & > code {
      padding-left: ${(p) => p.theme.space[3]};
    }
  }
`;
