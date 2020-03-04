import React from "react";
import { Value } from "./Value";

export default {
  "array - empty": <Value value={[]} />,
  "array - colllapsed": <Value value={["item 1", "item 2"]} />,
  "array - expanded": <Value expand value={["item 1", "item 2"]} />,
  "object - empty": <Value value={{}} />,
  "object - collapsed": <Value value={{ name: "Carla", age: 20 }} />,
  "object - expanded": <Value expand value={{ name: "Carla", age: 20 }} />,
  string: <Value value="hello" />,
  null: <Value value={null} />
};
