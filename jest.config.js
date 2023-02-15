/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(nanoid)/)"],
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "\\.(jpg|svg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$":
      "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
};
