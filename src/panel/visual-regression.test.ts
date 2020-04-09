import { detectCosmosConfig, getFixtures2 } from "react-cosmos";
import { toMatchImageSnapshot } from "jest-image-snapshot";
expect.extend({ toMatchImageSnapshot });

type FixtureApi = ReturnType<typeof getFixtures2>[number];

const fixtures = getFixtures2({ cosmosConfig: detectCosmosConfig() }).reduce<
  [string, FixtureApi][]
>((p, c) => [...p, [`${c.fileName} - ${c.name}`, c]], []);

beforeAll(async () => {
  jest.retryTimes(5);
  jest.setTimeout(60000);
});

describe.each(fixtures)("%s", (id, { rendererUrl }) => {
  it("matches snapshot", async () => {
    await page.goto(rendererUrl, { waitUntil: "load" });
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
        height: Math.min(boundingBox.height, page.viewport().height),
      },
    });
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: id,
      failureThreshold: 0.01,
    });
  });
});

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));
