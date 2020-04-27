const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const root = `${__dirname}/..`;

module.exports = {
  devtool: "source-map",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    background: `${root}/src/extension/background.ts`,
    devtools: `${root}/src/extension/devtools.ts`,
    content_script: `${root}/src/extension/content_script.ts`,
    panel: `${root}/src/panel/panel.tsx`,
  },
  output: {
    path: `${root}/dist/extension`,
    devtoolModuleFilenameTemplate: (info) =>
      `urql-devtools:///${info.resourcePath}`,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            ascii_only: true, // Required for codemirror
            comments: false,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.*tsx?$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["svg-react-loader"],
      },
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /graphql-language-service-interface[\/\\]dist/,
      /\.js$/
    ),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
      cleanAfterEveryBuildPatterns: ["!*", "!*/**"],
    }),
    new CopyWebpackPlugin(
      [
        { from: "src/assets/", to: "assets/" },
        {
          from: "src/extension/manifest.json",
          transform: function (content) {
            return Buffer.from(
              JSON.stringify(
                {
                  ...JSON.parse(content.toString()),
                  version: process.env.npm_package_version,
                },
                null,
                2
              )
            );
          },
        },
      ],
      { copyUnmodified: true }
    ),
    new HtmlWebpackPlugin({
      template: `${root}/src/extension/devtools.html`,
      filename: "devtools.html",
      chunks: ["devtools"],
    }),
    new HtmlWebpackPlugin({
      template: `${root}/src/panel/panel.html`,
      filename: "panel.html",
      chunks: ["panel"],
    }),
  ],
};
