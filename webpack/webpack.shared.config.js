module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
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
    new HtmlWebpackPlugin({
      template: `${root}/src/panel/panel.html`,
      filename: "panel.html",
      chunks: ["panel"],
    }),
  ],
};
