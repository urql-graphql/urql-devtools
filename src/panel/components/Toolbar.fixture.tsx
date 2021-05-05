import React from "react";
import {
  faPlay,
  faTrashAlt,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Toolbar } from "./Toolbar";

export default {
  basic: (
    <Toolbar
      items={[
        {
          title: "Item 1",
          icon: faPlay,
          onClick: () => console.log("Run"),
        },
        {
          title: "Item 2",
          icon: faTrashAlt,
          onClick: () => console.log("Clear"),
        },
        {
          title: "Prettify",
          icon: faAlignLeft,
          onClick: () => console.log("Prettify"),
        },
      ]}
      data-snapshot
    />
  ),
};
