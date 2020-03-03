const webpack = require("webpack");

module.exports = (c, env) => {
  console.log(c);
  return {
    ...c,
    module: {
      ...c.module,
      rules: [
        ...c.module.rules,
        {
          test: /\.svg$/,
          use: ["url-loader"]
        }
      ]
    },
    resolve: {
      ...c.resolve,
      extensions: [".mjs", ...c.resolve.extensions]
    },
    plugins: [
      new webpack.ContextReplacementPlugin(
        /graphql-language-service-interface[\/\\]dist/,
        /\.js$/
      ),
      ...c.plugins
    ]
  };
};
