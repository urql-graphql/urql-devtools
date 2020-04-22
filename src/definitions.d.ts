declare module "*.svg";
declare module "nanoid";

declare namespace NodeJS {
  interface Global {
    matchMedia: jest.Mock;
  }
}

interface Window {
  __urql_devtools_content_script_live__: boolean;
  __urql_devtools__: { version: string };
}
