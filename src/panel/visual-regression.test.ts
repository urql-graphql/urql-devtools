import puppeteer from "puppeteer";
import { detectCosmosConfig, getFixtureUrls } from "react-cosmos";
import { toMatchImageSnapshot } from "jest-image-snapshot";
expect.extend({ toMatchImageSnapshot });

let fixtures: string[];
let browser: puppeteer.Browser;

beforeAll(async () => {
  browser = await puppeteer.launch();
  fixtures = await getFixtureUrls({ cosmosConfig: detectCosmosConfig() });
  jest.setTimeout(60000);
});

afterAll(async () => {
  await browser.close();
});

describe("Matches snapshot", () => {
  it("renders", async () => {
    for (const url of fixtures) {
      const page = await browser.newPage();
      await page.goto(
        `http://${url.replace("?fixtureId", "_renderer.html?_fixtureId")}`,
        { waitUntil: "domcontentloaded" }
      );
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: url.replace(/.*?fixtureId\=/, "")
      });
      await page.close();
    }
  }, 120000);
});
