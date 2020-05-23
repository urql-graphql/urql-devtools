import React from "react";
import { schema } from "./Schema.fixture";
import { Fields } from "./Fields";
import { BorderBox } from "./Stack";

const typeMap = schema.getTypeMap();
const setTypeMock = (type: any) => console.log(type);

const Objects = () => (
  <BorderBox>
    <h3 style={{ color: "white" }}>Basic</h3>
    <Fields setType={setTypeMock} node={typeMap["User"]} key="1" />
    <h3 style={{ color: "white" }}>Arg and Field Descriptions</h3>
    <Fields setType={setTypeMock} node={typeMap["Mutation"]} key="2" />
    <h3 style={{ color: "white" }}>Default args</h3>
    <Fields setType={setTypeMock} node={typeMap["Query"]} key="3" />
  </BorderBox>
);

export default {
  object: <Objects />,
  interface: (
    <BorderBox>
      <Fields setType={setTypeMock} node={typeMap["Test"]} />
    </BorderBox>
  ),
  enum: (
    <BorderBox>
      <Fields setType={setTypeMock} node={typeMap["SortBy"]} />
    </BorderBox>
  ),
  union: (
    <BorderBox>
      <Fields setType={setTypeMock} node={typeMap["Action"]} />
    </BorderBox>
  ),
  input: (
    <BorderBox>
      <Fields setType={setTypeMock} node={typeMap["ThreadInput"]} />
    </BorderBox>
  ),
};
