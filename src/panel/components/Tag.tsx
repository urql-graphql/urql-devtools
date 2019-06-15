import styled from "styled-components";
import { Operation } from "urql";

export const Tag = styled.p((props: any) => ({
  padding: "3px 8px",
  borderRadius: "20px",
  color: "rgba(255, 255, 255, 0.8)",
  backgroundColor: colors[props.color]
}));

const colors: Record<Operation["operationName"] | string, string> = {
  mutation: "#8268CD",
  query: "#68B5CD",
  teardown: "#E07272",
  subscription: "#CA7398"
};
