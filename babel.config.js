module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    [
      "babel-plugin-styled-components",
      {
        fileName: false,
      },
    ],
  ],
};
