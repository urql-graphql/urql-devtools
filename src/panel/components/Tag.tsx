import styled from "styled-components";

export const Tag = styled.p((props: any) => ({
  padding: "3px 8px",
  borderRadius: "20px",
  color: "rgba(255, 255, 255, 0.8)",
  backgroundColor: props.color
}));
