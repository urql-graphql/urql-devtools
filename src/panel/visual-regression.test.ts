import puppeteer from "puppeteer";
import { detectCosmosConfig, getFixtureUrls } from "react-cosmos";
import { toMatchImageSnapshot } from "jest-image-snapshot";
expect.extend({ toMatchImageSnapshot });

let fixtures: { id: string; url: string }[];
let browser: puppeteer.Browser;

beforeAll(async () => {
  try {
    browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    fixtures = (
      await getFixtureUrls({
        cosmosConfig: detectCosmosConfig(),
        fullScreen: true,
      })
    ).map((url) => ({
      id: url.replace(/.*?fixtureId\=/, ""),
      url: `http://${url.replace("localhost", "cosmos")}`,
    }));
  } catch (err) {
    console.error(err);
  }

  jest.setTimeout(60000);
});

afterAll(async () => {
  browser && (await browser.close());
});

describe("Fixtures", () => {
  it("matches image snapshot", async () => {
    for (const { id, url } of fixtures) {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "load" });
      await delay(200);
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: id,
        failureThreshold: 0.01,
      });
      await page.close();
    }
  }, 120000);
});

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));
