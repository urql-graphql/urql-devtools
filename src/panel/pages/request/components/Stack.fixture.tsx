import React from "react";
import { schema } from "./Schema.fixture";
import { Stack } from "./Stack";

const typeMap = schema.getTypeMap();
const stackMock = [typeMap["Reply"]];
const setTypeMock = (type: any) => console.log(type);

export default {
  basic: (
    <Stack stack={stackMock} setStack={setTypeMock} setType={setTypeMock} />
  ),
};
