const EventHooksPlugin = require("event-hooks-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { spawn } = require("child_process");

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
  output: {
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.*tsx?$/,
        exclude: /(exchange\.ts|node_modules)/,
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "tsconfig.devtools.json"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!exchange.js"]
    }),
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
    }),
    new EventHooksPlugin({
      compile: () => {
        // Start tsc for exchange on first compile
        if (tsBuild !== undefined) {
          return;
        }

        const args = [
          ...["src/exchange.ts", "--outDir", "dist"],
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
