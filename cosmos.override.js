const webpack = require("webpack");

module.exports = (c) => ({
  ...c,
  module: {
    ...c.module,
    rules: [
      ...c.module.rules,
      {
        test: /\.svg$/,
        use: ["svg-react-loader"],
      },
    ],
  },
  resolve: {
    ...c.resolve,
    extensions: [".mjs", ...c.resolve.extensions],
    alias: {
      "react-error-overlay": `${__dirname}/src/panel/util/ErrorOverlay.ts`,
    },
    fallback: {
      fs: false,
      path: false,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.BUILD_ENV": JSON.stringify(process.env.BUILD_ENV),
    }),
    new webpack.ContextReplacementPlugin(
      /graphql-language-service-interface[\/\\]dist/,
      /\.js$/
    ),
    ...c.plugins,
  ],
});
