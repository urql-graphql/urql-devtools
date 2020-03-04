import React, { useMemo, FC } from "react";
import styled from "styled-components";
import { FieldNode } from "../../../context/Explorer/ast";
import { Key, Value } from "./Value";
import { SeeMoreIcon } from "./Icons";

interface Props {
  args: FieldNode["args"];
  displayAll: boolean;
}

export function Arguments({ args, displayAll }: Props) {
  if (!args) {
    return null;
  }

  const content = useMemo(() => {
    const entries = Object.entries(args);

    const argElements = entries.map(([key, value], index) => (
      <ArgWrapper key={key}>
        <GraphQLArgument argument={{ key, value }} />
        {index === entries.length && ","}
      </ArgWrapper>
    ));

    if (displayAll || arguments.length < 3) {
      return argElements;
    }

    return (
      <>
        {argElements.slice(0, 3)}
        <ExpandContainer key="last">
          <SeeMore />
        </ExpandContainer>
      </>
    );
  }, [args]);

  return <ArgsContainer>({content})</ArgsContainer>;
}
//   return null;
//   const content = useMemo(
//     () =>
//       Object.entries(args).reduce((p, [k, v]) => {
//         if (Array.isArray(v)) {
//           return [...p];
//         }
//       }, []),
//     [args]
//   );

//   let content = [];
//   const entries = Object.entries(args);

//   for (const [key, val] of entries) {
//     if (Array.isArray(val)) {
//       content.push(
//         <ArgWrapper key={key}>
//           <ArgKey>{key}</ArgKey>
//           <Symbol>{`:`}</Symbol>
//           <IconContainer>
//             {"["}
//             <SeeMore />
//             {"]"}
//           </IconContainer>
//           {content.length === entries.length - 1 ? "" : ","}
//         </ArgWrapper>
//       );
//     } else if (val && typeof val === "object") {
//       content.push(
//         <ArgWrapper>
//           <ArgKey>{key}</ArgKey>
//           <Symbol>{`:`}</Symbol>
//           <IconContainer>
//             {"{"}
//             <SeeMore />
//             {"}"}
//           </IconContainer>
//           {content.length === entries.length - 1 ? "" : ","}
//         </ArgWrapper>
//       );
//     } else {
//       content.push(
//         <ArgWrapper key={key}>
//           <Vaue keyName={key} value={val} expand={false} />
//           {content.length === entries.length - 1 ? "" : ","}
//         </ArgWrapper>
//       );
//     }
//   }

//   if (!displayAll && !(content.length <= 3)) {
//     content = [
//       ...content.slice(0, 3),
//       <ExpandContainer key="last">
//         <SeeMore />
//       </ExpandContainer>
//     ];
//   }

//   return content ? <ArgsContainer>({content})</ArgsContainer> : null;
// }

const GraphQLArgument: FC<{ argument: { key: string; value: any } }> = ({
  argument: { key, value }
}) => {
  if (Array.isArray(value)) {
    return (
      <>
        <ArgKey>{key}</ArgKey>
        <Symbol>{`:`}</Symbol>
        <IconContainer>
          {"["}
          <SeeMore />
          {"]"}
        </IconContainer>
      </>
    );
  }

  if (value && typeof value === "object") {
    return (
      <>
        <ArgKey>{key}</ArgKey>
        <Symbol>{`:`}</Symbol>
        <IconContainer>
          {"{"}
          <SeeMore />
          {"}"}
        </IconContainer>
      </>
    );
  }

  // todo
  return (
    <>
      <Key>{key}</Key>
      <Symbol>{`:`}</Symbol>
      <Value value={value} expand={false} />
    </>
  );
};

const ArgsContainer = styled.div`
  display: inline-flex;
  max-width: 400px;
  flex-wrap: wrap;
`;

const ArgKey = styled.span`
  color: ${p => p.theme.pink["0"]};
`;

const ArgWrapper = styled.span`
  margin-right: 5px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const IconContainer = styled.div`
  display: inline-flex;
  align-items: flex-end;
  color: ${p => p.theme.grey["-1"]};
  font-size: 14px;
  cursor: pointer;
`;

const ExpandContainer = styled(IconContainer)`
  margin: 5px 5px 0;
`;

const SeeMore = styled(SeeMoreIcon)`
  margin: 3px;
`;

const Symbol = styled.span`
  color: ${p => p.theme.grey["-1"]};
  margin-right: 5px;
`;
