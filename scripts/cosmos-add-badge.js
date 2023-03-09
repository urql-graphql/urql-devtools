/**
 * Post-process Cosmos output.
 *
 * Run after `pnpm run cosmos-export`
 */
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const COSMOS_INDEX = path.resolve(__dirname, "../cosmos-export/index.html");
const BADGE = `
    <div style="position: absolute; bottom: 10px; right: 10px; z-index: 100;">
      <a href="https://www.netlify.com">
        <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" alt="Deploys by Netlify" />
      </a>
    </div>
`;

const main = async () => {
  const index = await readFile(COSMOS_INDEX)
    .then((buf) => buf.toString())
    .catch((err) => {
      if (err.code === "ENOENT") {
        console.error(
          `Could not find ${COSMOS_INDEX}. Have you run cosmos-export?`
        );
      }
      throw err;
    });

  // Add badge at end of body if not present
  if (index.indexOf(BADGE) === -1) {
    const withBadge = index.replace("</body>", `${BADGE}  </body>`);
    await writeFile(COSMOS_INDEX, withBadge);
  }
};

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
