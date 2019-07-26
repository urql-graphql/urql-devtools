const EventHooksPlugin = require("event-hooks-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { spawn } = require("child_process");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

let tsBuild;

// Kill ts watch
process.on("exit", () => {
  if (tsBuild !== undefined && process.env.NODE_ENV !== "production") {
    tsBuild.kill();
  }
});

module.exports = {
  devtool: "source-map",
  entry: {
    background: `${__dirname}/src/background/background.ts`,
    devtools: `${__dirname}/src/devtools/devtools.ts`,
    panel: `${__dirname}/src/panel/panel.tsx`,
    content_script: `${__dirname}/src/content_script.ts`
  },
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".jsx"]
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: "panel.js"
      })
    ]
  },
  output: {
    path: `${__dirname}/dist/extension`
  },
  module: {
    rules: [
      {
        test: /\.*tsx?$/,
        exclude: /(exchange\.ts|node_modules)/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /graphql-language-service-interface[\/\\]dist/,
      /\.js$/
    ),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!exchange.js"]
    }),
    new CopyWebpackPlugin([
      { from: "src/assets/", to: "assets/" },
      {
        from: "src/manifest.json",
        transform: function(content) {
          return Buffer.from(
            JSON.stringify(
              {
                ...JSON.parse(content.toString()),
                version: process.env.npm_package_version
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
    }),
    new EventHooksPlugin({
      compile: () => {
        // Start tsc for exchange on first compile
        if (tsBuild !== undefined) {
          return;
        }

        const args = [
          ...["-p", `${__dirname}/tsconfig.exchange.json`],
          ...(process.env.NODE_ENV === "production" ? [] : ["--watch"])
        ];
        tsBuild = spawn("tsc", args);
        tsBuild.stdout.on("data", d => console.log(d.toString()));
        tsBuild.stderr.on("data", d => console.log(d.toString()));
        tsBuild.on("exit", () => console.log("spawned process killed"));
      }
    })
  ]
};
