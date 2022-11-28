import "jest-styled-components";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import puppeteer from "puppeteer";

process.env.BUILD_ENV = "extension";
process.env.PKG_VERSION = "200.0.0";

declare const global: {
  chrome: {
    devtools: {
      inspectedWindow: {
        eval: () => any;
      };
      panels: {
        themeName: "default" | "dark";
      };
    };
  };
  browser: puppeteer.Browser;
  page: puppeteer.Page;
  matchMedia: any;
  ResizeObserver: ResizeObserver;
};

(() => {
  // Setup enzyme
  configure({ adapter: new Adapter() });

  global.ResizeObserver = function ResizeObserver() {
    return {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    };
  } as any;
  global.matchMedia = jest.fn(() => {
    return {
      matches: false,
    } as any;
  });
  global.chrome = {
    devtools: {
      inspectedWindow: {
        eval: jest.fn(),
      },
      panels: {
        themeName: "dark",
      },
    },
  };

  // Start browser
  beforeAll(async () => {
    // Aim to render fonts consistently between invocations
    const args = ["--font-render-hinting=none"];
    global.browser = await puppeteer.launch({
      args: process.env.USER === "root" ? [...args, "--no-sandbox"] : args,
      headless: process.env.HEADLESS !== "false",
    });
  });

  // Create page
  beforeEach(async () => {
    global.page = await global.browser.newPage();
  });

  // Teardown page
  afterEach(async () => {
    if (!global.page) {
      return;
    }

    await global.page.close();
  });

  // Teardown browser
  afterAll(async () => {
    if (!global.browser) {
      return;
    }

    await global.browser.close();
  });
})();
