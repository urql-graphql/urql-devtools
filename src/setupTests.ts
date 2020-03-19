import "jest-styled-components";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import puppeteer from "puppeteer";

declare const global: {
  browser: puppeteer.Browser;
  page: puppeteer.Page;
  matchMedia: any;
};

(() => {
  // Setup enzyme
  configure({ adapter: new Adapter() });

  // Setup matchMedia mock
  global.matchMedia = jest.fn();

  // Exit if not visual regression
  if (!jasmine.testPath.includes("visual-regression")) {
    return;
  }

  // Start browser
  beforeAll(async () => {
    global.browser = await puppeteer.launch({
      args: process.env.USER === "root" ? ["--no-sandbox"] : [],
      headless: process.env.HEADLESS !== "false"
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
