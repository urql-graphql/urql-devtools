#!/usr/bin/env node
const { spawn } = require("child_process");
spawn(/^win/.test(process.platform) ? "npm.cmd" : "npm", ["start"], {
  stdio: "inherit",
  cwd: `${__dirname}/..`,
});
