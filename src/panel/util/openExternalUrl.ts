import { shell } from "electron";

export const openExternalUrl = (url: string): Window | null | undefined => {
  if (process.env.BUILD_ENV === "extension") {
    return window.open(url, "_blank");
  }

  shell.openExternal(url);
};
