import styled from "styled-components";

export const Background = styled.div`
  position: fixed;
  background-color: ${(props: any) => props.theme.bg};
  left: 0;
  right: 0;
  top: 0;
  bottom: 50px;
  display: flex;
  flex-direction: column;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;
    left: 40px;
    bottom: 0;
  }
`;
