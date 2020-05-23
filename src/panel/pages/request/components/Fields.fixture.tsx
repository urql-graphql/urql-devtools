import React from "react";
import { schema } from "./Schema.fixture";
import { Fields } from "./Fields";
import { Box } from "./Stack";

const typeMap = schema.getTypeMap();
const setTypeMock = (type: any) => console.log(type);

const Objects = () => (
  <Box>
    <h3 style={{ color: "white" }}>Basic</h3>
    <Fields setType={setTypeMock} node={typeMap["User"]} key="1" />
    <h3 style={{ color: "white" }}>Arg and Field Descriptions</h3>
    <Fields setType={setTypeMock} node={typeMap["Mutation"]} key="2" />
    <h3 style={{ color: "white" }}>Default args</h3>
    <Fields setType={setTypeMock} node={typeMap["Query"]} key="3" />
  </Box>
);

export default {
  object: <Objects />,
  interface: (
    <Box>
      <Fields setType={setTypeMock} node={typeMap["Test"]} />
    </Box>
  ),
  enum: (
    <Box>
      <Fields setType={setTypeMock} node={typeMap["SortBy"]} />
    </Box>
  ),
  union: (
    <Box>
      <Fields setType={setTypeMock} node={typeMap["Action"]} />
    </Box>
  ),
  input: (
    <Box>
      <Fields setType={setTypeMock} node={typeMap["ThreadInput"]} />
    </Box>
  ),
};
