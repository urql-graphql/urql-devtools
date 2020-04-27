declare module "*.svg";
declare module "nanoid";

declare namespace NodeJS {
  interface Global {
    matchMedia: jest.Mock;
  }
  export interface ProcessEnv {
    NODE_ENV: "production" | "development" | "testing";
    BUILD_ENV: "extension" | "electron";
  }
}
