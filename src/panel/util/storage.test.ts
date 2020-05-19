jest.mock("electron", () => ({
  remote: { app: { getPath: jest.fn(() => "/tmp/") } },
}));
import { promises as fs } from "fs";
import { get, set } from "./storage";

const configFile = "/tmp/.urql-devtools.json";

describe("electron", () => {
  beforeEach(async () => {
    process.env.BUILD_ENV = "electron";
    await fs.unlink(configFile).catch(() => false);
  });

  describe("get", () => {
    describe("on empty file", () => {
      it("returns undefined", async () => {
        expect(await get("version")).toBe(undefined);
      });
    });

    describe("on populated file", () => {
      const data = { somekey: { value: 1234 } };
      beforeEach(() => {
        fs.writeFile(configFile, JSON.stringify(data), "utf-8");
      });
      it("returns value", async () => {
        expect(await get("somekey")).toEqual(data.somekey);
      });
    });
  });

  describe("set", () => {
    describe("on empty file", () => {
      it("sets new file value", async () => {
        const key = "mykey";
        const value = { someValue: "1234" };

        await set(key, value);
        const file = await fs.readFile(configFile, "utf-8");
        expect(file).toEqual(JSON.stringify({ [key]: value }, null, 2));
      });
    });

    describe("on populated file", () => {
      const data = { somekey: { value: 1234 } };
      beforeEach(() => {
        fs.writeFile("/tmp/.urql-devtools.json", JSON.stringify(data), "utf-8");
      });

      it("merges object", async () => {
        const key = "newkey";
        const value = 1234;

        await set(key, value);
        const file = await fs.readFile(configFile, "utf-8");
        expect(file).toEqual(
          JSON.stringify({ ...data, [key]: value }, null, 2)
        );
      });
    });
  });
});
