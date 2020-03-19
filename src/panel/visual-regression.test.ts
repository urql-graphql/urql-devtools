import puppeteer, { Browser } from "puppeteer";
import {
  detectCosmosConfig,
  getFixtureUrlsSync,
  getFixturesSync
} from "react-cosmos";
import { toMatchImageSnapshot } from "jest-image-snapshot";
expect.extend({ toMatchImageSnapshot });

let browser: puppeteer.Browser;

// Urls of fixtures
const fixtureUrls = getFixtureUrlsSync({
  cosmosConfig: detectCosmosConfig(),
  fullScreen: true
});
// ID and name for each fixture
const fixtureElements = getFixturesSync({
  cosmosConfig: detectCosmosConfig()
});
const fixtures = fixtureUrls.reduce<[string, string][]>((p, url, i) => {
  const f = fixtureElements[i].fixtureId;

  if (f.name.includes("[no snapshot]")) {
    return p;
  }

  const targetUrl = process.env.TARGET_HOST
    ? url.replace("localhost:5000", process.env.TARGET_HOST)
    : url;

  return [
    ...p,
    [`${/\/(\w+)\.fixture/.exec(f.path)[1]}-${f.name}`, `http://${targetUrl}`]
  ];
}, []);

beforeAll(async () => {
  try {
    browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  } catch (err) {
    console.error(err);
    throw err;
  }

  jest.retryTimes(5);
  jest.setTimeout(60000);
});

afterAll(async () => {
  browser && (await browser.close());
});

describe.each(fixtures)("%s", (id, url) => {
  let page: puppeteer.Page;

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  it("matches snapshot", async () => {
    await page.goto(url, { waitUntil: "load" });
    await page.mouse.move(0, 0);
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: id,
      failureThreshold: 0.01
    });
  });
});
