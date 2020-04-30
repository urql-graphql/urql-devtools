import React from "react";
import { shallow } from "enzyme";
import { Arguments } from "./Arguments"

const props = {
  args: {
    string: "abc",
    number: 7,
    object: {
      string: "def"
    },
    //JSON.stringify type definition is somewhat problematic.
    // JSON.stringify(null) //"null"
    // JSON.stringify(null) //undefined
    // But JSON.stringify return type is string.
    // Therefore, it will cause any TS null|undefined checks to actually fail at runtime.
    // THe Highlight component will crash if it ever gets a null|undefined code string.
    // Both cases have to be explicitly tested.
    nullable: null,
    undefinable: undefined
  }
}
describe("on mount", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(<Arguments {...props}/>);
    expect(wrapper).toMatchSnapshot();
  })
})