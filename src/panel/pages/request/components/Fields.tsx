import React, { FC } from "react";
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
} from "graphql";
import styled from "styled-components";
import { Type } from "./Type";

interface FieldProps {
  node?: GraphQLNamedType;
  setType: (type: GraphQLNamedType) => void;
}

export const Fields: FC<FieldProps> = ({ node, setType }) => {
  if (!node) {
    return null;
  }

  const isDeprecated = (field: GraphQLField<any, any, any>) =>
    field.isDeprecated ? (
      <Deprecated>{`Deprecated: ${field.deprecationReason}`}</Deprecated>
    ) : null;

  const getDefaultValue = (field: GraphQLInputField | GraphQLArgument) => {
    return field.defaultValue !== undefined || null ? (
      <Default>{` = ${field.defaultValue}`}</Default>
    ) : null;
  };

  if (isObjectType(node) || isInterfaceType(node)) {
    const fields = node.getFields();
    const keys = Object.keys(fields);

    return (
      <>
        {keys.map((field, i) => {
          const args = fields[field].args;
          const hasDescriptions = args.some((arg) => arg.description);

          return (
            <FieldWrapper key={i} data-multiline={`${hasDescriptions}`}>
              {fields[field].description ? (
                <Description>{`"${fields[field].description}"`}</Description>
              ) : null}
              <span>
                <Name>{fields[field].name}</Name>
                {args.length ? "(" : null}
              </span>
              {args.length > 0 ? (
                <>
                  <ArgWrapper data-multiline={`${hasDescriptions}`}>
                    {args.map((arg, idx) => (
                      <>
                        {arg.description ? (
                          <Description>{`"${arg.description}"`}</Description>
                        ) : null}
                        <code key={idx}>
                          <span>
                            <code>{arg.name}</code>
                            <Colon />
                            <Type type={arg.type} setType={setType} />
                            {getDefaultValue(arg)}
                            {idx !== args.length - 1 && ", "}
                          </span>
                        </code>
                      </>
                    ))}
                  </ArgWrapper>
                </>
              ) : null}
              <div>
                <span>
                  {args.length ? ")" : null}
                  <Colon />
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
              <Name>{fields[field].name}</Name>
              <Colon />
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
            <span key={i}>
              <span>|</span>
              <Type type={type} setType={setType} />
            </span>
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
            <span key={i}>
              <span>{type.value}</span>
            </span>
          );
        })}
      </>
    );
  }

  return null;
};

const Description = styled.code`
  color: ${(p) => p.theme.green["+3"]};
`;

const FieldWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;
  font-size: 13px;
  margin-bottom: 12px;

  &[data-multiline="true"] {
    flex-direction: column;

    & > ${Description} {
      color: ${(p) => p.theme.light["-5"]};
      margin-bottom: 6px;
    }
  }
`;

const Colon = styled.span`
  &::before {
    content: ":";
    display: inline-block;
    color: ${(p) => p.theme.light["0"]};
    margin-right: 6px;
  }
`;

const Name = styled.span`
  color: ${(p) => p.theme.grey["+9"]};
`;

const Deprecated = styled.code`
  display: inline-block;
  color: ${(p) => p.theme.purple["+5"]};
  margin-left: 6px;
`;

const Default = styled.code`
  display: inline-block;
  color: ${(p) => p.theme.green["+5"]};
  margin-left: 6px;
`;

const ArgWrapper = styled.div`
  display: flex;

  &[data-multiline="true"] {
    flex-direction: column;
    & > code {
      padding-left: 8px;
    }
  }
`;
