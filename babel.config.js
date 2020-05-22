module.exports = (api) => {
  const target = api.env();

  // Browser extension (full)
  if (target === "extension") {
    return {
      presets: [
        ["@babel/preset-env", { targets: { firefox: "70", chrome: "78" } }],
        ...guiPresets,
      ],
      plugins: [
        ...guiPlugins,
        [
          "babel-plugin-transform-remove-imports",
          { test: /^(electron|fs|path)\/?/ },
        ],
      ],
    };
  }

  // Electron (panel)
  if (target === "electron") {
    return {
      presets: [
        ["@babel/preset-env", { targets: { electron: "9" } }],
        ...guiPresets,
      ],
      plugins: [...guiPlugins],
    };
  }

  // Electron (main.js)
  return {
    presets: [
      ["@babel/preset-env", { targets: { node: "10" } }],
      "@babel/preset-typescript",
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-optional-chaining",
    ],
  };
};

const guiPresets = ["@babel/preset-react", "@babel/preset-typescript"];

const guiPlugins = [
  "inline-react-svg",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-proposal-optional-chaining",
  [
    "babel-plugin-styled-components",
    {
      fileName: false,
    },
  ],
];
