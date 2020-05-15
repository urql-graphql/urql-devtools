import React from "react";
import { Navigation } from "./Navigation";

export default {
  basic: (
    <Navigation
      items={[
        {
          label: "Item 1",
          link: "/item1",
        },
        {
          label: "Item 2",
          link: "/item2",
        },
        {
          label: "Item 3",
          link: "/item3",
        },
      ]}
      data-snapshot
    />
  ),
};
