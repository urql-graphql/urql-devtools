import {
  detectCosmosConfig,
  getFixtureUrlsSync,
  getFixturesSync
} from "react-cosmos";
import { toMatchImageSnapshot } from "jest-image-snapshot";
expect.extend({ toMatchImageSnapshot });

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

  if (f.name === null) {
    return p;
  }

  const fixtureRegex = /\/(\w+)\.fixture/.exec(f.path);

  if (fixtureRegex === null) {
    console.error("Error parsing fixture");
    return p;
  }

  const targetUrl = process.env.TARGET_HOST
    ? url.replace("localhost:5000", process.env.TARGET_HOST)
    : url;
  return [...p, [`${fixtureRegex[1]} - ${f.name}`, `http://${targetUrl}`]];
}, []);

beforeAll(async () => {
  jest.retryTimes(5);
  jest.setTimeout(60000);
});

describe.each(fixtures)("%s", (id, url) => {
  it("matches snapshot", async () => {
    await page.goto(url, { waitUntil: "load" });
    await page.mouse.move(0, 0);
    await delay(500);
    const element = await page.$("[data-snapshot=true]");

    if (element === null) {
      console.warn(`No snapshot for fixture: ${id}`);
      return;
    }

    const boundingBox = await element.boundingBox();
    const image = await element.screenshot({
      clip: {
        x: boundingBox.x,
        y: boundingBox.y,
        width: Math.min(boundingBox.width, page.viewport().width),
        height: Math.min(boundingBox.height, page.viewport().height)
      }
    });
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: id,
      failureThreshold: 0.01
    });
  });
});

const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t));
