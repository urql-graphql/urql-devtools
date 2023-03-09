module.exports = {
  presets: [
    [
      "@babel/preset-env",
      { targets: { firefox: "70", chrome: "78", electron: "9" } },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "inline-react-svg",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    [
      "babel-plugin-styled-components",
      {
        fileName: false,
      },
    ],
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"],
    },
  },
};
