const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

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
    content_script: `${__dirname}/src/content_script/index.ts`
  },
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".jsx"]
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            ascii_only: true,
            comments: false
          }
        }
      })
    ]
  },
  output: {
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.*tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        use: ["url-loader"]
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /graphql-language-service-interface[\/\\]dist/,
      /\.js$/
    ),
    new CleanWebpackPlugin(),
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
    })
  ]
};
