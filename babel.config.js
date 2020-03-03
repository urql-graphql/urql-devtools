module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: [
    "inline-import-data-uri",
    [
      "babel-plugin-styled-components",
      {
        fileName: false
      }
    ]
  ]
};
