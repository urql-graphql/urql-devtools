const nodeExternals = require("webpack-node-externals");

const root = `${__dirname}/..`;

module.exports = {
  target: "electron-main",
  devtool: "source-map",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    main: `${root}/src/electron/main.ts`,
  },
  output: {
    path: `${root}/dist/electron`,
    filename: "main.js",
  },
  // Everything other than relative/absolute imports are externals
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".mjs", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.*ts$/,
        loader: "babel-loader",
        options: {
          envName: "electron-node",
        },
      },
    ],
  },
};
