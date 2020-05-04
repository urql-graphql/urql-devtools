#!/usr/bin/env node
const { spawn } = require("child_process");
spawn("npm", ["start"], { stdio: "inherit", cwd: `${__dirname}/..` });
