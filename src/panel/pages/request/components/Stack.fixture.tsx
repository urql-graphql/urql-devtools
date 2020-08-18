import React from "react";
import { Stack } from "./Stack";

const setTypeMock = (type: any) => console.log(type);

export default {
  basic: <Stack setStack={setTypeMock} setType={setTypeMock} />,
};
