export const get: <T = any>(key: string) => Promise<T> = async (key) => {
  if (process.env.BUILD_ENV === "extension") {
    return new Promise((resolve) =>
      chrome.storage.sync.get(key, (i) => resolve(i[key]))
    );
  }

  const fs = require("fs").promises as typeof import("fs/promises");

  const filePath = getFilePath();
  return JSON.parse(await fs.readFile(filePath, "utf-8").catch(() => "{}"))[
    key
  ];
};

export const set: (key: string, value: any) => Promise<void> = async (
  key,
  value
) => {
  if (process.env.BUILD_ENV === "extension") {
    return new Promise((resolve) =>
      chrome.storage.sync.set({ [key]: value }, resolve)
    );
  }

  const fs = require("fs").promises as typeof import("fs/promises");

  const filePath = getFilePath();
  const oldState = JSON.parse(
    await fs.readFile(filePath, "utf-8").catch(() => "{}")
  );
  await fs.writeFile(
    filePath,
    JSON.stringify({ ...oldState, [key]: value }, null, 2),
    "utf-8"
  );
};

const getFilePath = () => {
  const path = require("path") as typeof import("path");
  const electron = require("electron") as typeof import("electron");

  return path.join(
    electron.remote.app.getPath("appData"),
    ".urql-devtools.json"
  );
};
