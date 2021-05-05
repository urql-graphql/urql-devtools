import React from "react";
import {
  faCog,
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
          title: "Settings",
          icon: faCog,
          onClick: () => console.log("Settings"),
          active: true,
        },
        {
          title: "Run",
          icon: faPlay,
          onClick: () => console.log("Run"),
        },
        {
          title: "Clear",
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
