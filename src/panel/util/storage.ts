import { promises as fs } from "fs";
import path from "path";
import electron from "electron";

export const get: <T extends keyof StorageSchema>(
  key: T
) => Promise<StorageSchema[T]> = async (key) => {
  if (process.env.BUILD_ENV === "extension") {
    return new Promise((resolve) =>
      chrome.storage.sync.get(key, (i) => resolve(i[key]))
    );
  }

  const filePath = getFilePath();
  return JSON.parse(await fs.readFile(filePath, "utf-8").catch(() => "{}"))[
    key
  ];
};

export const set: <T extends keyof StorageSchema>(
  key: T,
  value: StorageSchema[T]
) => Promise<void> = async (key, value) => {
  if (process.env.BUILD_ENV === "extension") {
    return new Promise((resolve) =>
      chrome.storage.sync.set({ [key]: value }, resolve)
    );
  }

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
  return path.join(
    electron.remote.app.getPath("appData"),
    ".urql-devtools.json"
  );
};

type StorageSchema = {
  allowTelemetry: boolean;
};
