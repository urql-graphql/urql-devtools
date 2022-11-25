import { detectCosmosConfig, getFixtures2, FixtureApi } from "react-cosmos";
import { toMatchImageSnapshot } from "jest-image-snapshot";
expect.extend({ toMatchImageSnapshot });

const fixtures = getFixtures2(detectCosmosConfig()).reduce<
  [string, FixtureApi][]
>((p, c) => [...p, [`${c.fileName} - ${c.name}`, c]], []);

beforeAll(async () => {
  jest.retryTimes(5);
  jest.setTimeout(60000);
});

/** Parallelize for CircleCI */
const parallelize = (arr: any[]) => {
  try {
    if (!process.env.CIRCLE_NODE_TOTAL) {
      throw Error();
    }

    const total = parseInt(process.env.CIRCLE_NODE_TOTAL);
    const index = parseInt(process.env.CIRCLE_NODE_INDEX);
    const interval = Math.round((arr.length * 1) / total);

    const start = index * interval;
    const end = index === total - 1 ? arr.length + 1 : interval * (index + 1);

    return arr.slice(start, end);
  } catch (err) {
    return arr;
  }
};

describe.each(parallelize(fixtures))("%s", (id, { rendererUrl }) => {
  const matchSnapshot = async ({
    viewport,
  }: {
    viewport: "landscape" | "portrait";
  }) => {
    if ((await page.$(".sb-show-errordisplay")) !== null) {
      throw Error("Fixture failed to open");
    }

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
      customSnapshotIdentifier: `${id}-${viewport}`,
      failureThreshold: 0.0001,
      failureThresholdType: "percent",
    });
  };

  describe("Go to page, test landscape and portrait viewport", () => {
    // Only load the page once for each viewport orientation
    let pageRendered = false;
    beforeEach(async () => {
      if (pageRendered) {
        return;
      }

      await page.goto(rendererUrl, { waitUntil: "load" });
      await page.mouse.move(0, 0);
      await delay(500);
      pageRendered = true;
    });

    it("matches landscape snapshot", async () => {
      await page.setViewport({ width: 1200, height: 600 });
      await matchSnapshot({ viewport: "landscape" });
    });

    it("matches portrait snapshot", async () => {
      await page.setViewport({ width: 600, height: 1200 });
      await matchSnapshot({ viewport: "portrait" });
    });
  });
});

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));
