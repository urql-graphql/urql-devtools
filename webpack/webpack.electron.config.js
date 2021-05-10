const nodeExternals = require("webpack-node-externals");

const root = `${__dirname}/..`;

module.exports = {
  target: "node",
  devtool: "source-map",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    main: `${root}/src/electron/main.ts`,
  },
  output: {
    path: `${root}/dist/electron`,
    filename: "main.js",
    globalObject: "this",
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
          presets: [
            ["@babel/preset-env", { targets: { node: "10" } }],
            "@babel/preset-typescript",
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-optional-chaining",
          ],
        },
      },
    ],
  },
};
