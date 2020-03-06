import puppeteer from "puppeteer";
import { detectCosmosConfig, getFixtureUrls } from "react-cosmos";
import { toMatchImageSnapshot } from "jest-image-snapshot";
expect.extend({ toMatchImageSnapshot });

let fixtures: { id: string; url: string }[];
let browser: puppeteer.Browser;

beforeAll(async () => {
  browser = await puppeteer.launch();
  fixtures = (await getFixtureUrls({ cosmosConfig: detectCosmosConfig() })).map(
    url => ({
      id: url.replace(/.*?fixtureId\=/, ""),
      url: `http://${url.replace("?fixtureId", "_renderer.html?_fixtureId")}`
    })
  );

  // Hacky solution to fix CI font rendering
  const page = await browser.newPage();
  await page.goto(fixtures[0].url, { waitUntil: "domcontentloaded" });
  await page.close();
  // End hacky fix

  jest.setTimeout(60000);
});

afterAll(async () => {
  await browser.close();
});

describe("Matches snapshot", () => {
  it("renders", async () => {
    for (const { id, url } of fixtures) {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded" });
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: id
      });
      await page.close();
    }
  }, 120000);
});
