declare module "*.svg";
declare module "nanoid";

declare namespace NodeJS {
  interface Global {
    matchMedia: jest.Mock;
  }
}
