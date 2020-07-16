import React from "react";
import { schema } from "./Schema.fixture";
import { Search } from "./Search";

const typeMap = schema.getTypeMap();
const setTypeMock = (type: any) => console.log(type);

export default {
  basic: (
    <div style={{ position: "relative", width: "100%" }}>
      <Search data-snapshot typeMap={typeMap} setType={setTypeMock} />
    </div>
  ),
};
