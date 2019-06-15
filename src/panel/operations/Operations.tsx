import React, { useState, useEffect, useContext } from "react";
import { Operation as OperationType } from "urql";
import { Operation } from "./Operation";
import { DevtoolsContext } from "../Context";

export const Operations = () => {
  const { operations } = useContext(DevtoolsContext);

  return (
    <>
      {operations.map((op: any, i: any) => (
        <Operation key={i} operation={op} />
      ))}
    </>
  );
};
