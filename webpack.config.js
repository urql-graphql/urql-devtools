const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    background: `${__dirname}/src/background/background.ts`,
    devtools: `${__dirname}/src/devtools/devtools.ts`,
    panel: `${__dirname}/src/panel/panel.tsx`,
    content_script: `${__dirname}/src/content_script.ts`,
    exchange: `${__dirname}/src/exchange.ts`
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  output: {
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.*tsx?$/,
        exclude: /exchange\.ts/,
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "tsconfig.devtools.json"
        }
      },
      {
        test: /exchange\.ts$/,
        loader: "shell-loader",
        options: {
          script: "tsc src/exchange.ts --outDir dist"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: "src/manifest.json",
        transform: function(content, path) {
          return Buffer.from(
            JSON.stringify(
              {
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString())
              },
              null,
              2
            )
          );
        }
      }
    ]),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/devtools/devtools.html`,
      filename: "devtools.html",
      chunks: ["devtools"]
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/panel/panel.html`,
      filename: "panel.html",
      chunks: ["panel"]
    })
  ]
};
