import electron from "electron";

export const openExternalUrl = (url: string) => {
  if (process.env.BUILD_ENV === "extension") {
    return window.open(url, "_blank");
  }

  electron.shell.openExternal(url);
};
