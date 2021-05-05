import styled from "styled-components";
import React, { FC } from "react";

const ArrowIcon: FC<JSX.IntrinsicElements["svg"]> = (props) => (
  <svg height="10" width="10" viewBox="0 0 4 8" {...props}>
    <path
      d="M4 3.982a.485.485 0 01-.127.355C3.731 4.5.61 7.729.465 7.892c-.145.163-.443.163-.443-.147L0 .255c0-.31.298-.31.442-.147C.587.271 3.71 3.5 3.852 3.663c.085.1.148.173.148.319z"
      fill="currentColor"
    />
  </svg>
);

export const Arrow = styled(ArrowIcon)`
  flex-shrink: 0;
  height: 10px;
  width: 10px;
  margin-left: 2px;
  margin-right: 5px;
  color: ${(p) => p.theme.text};
  transform: rotate(0deg);
  transition: transform 100ms ease;

  &[data-active="true"] {
    transform: rotate(90deg);
  }
`;
