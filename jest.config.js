module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  },
  setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testEnvironment: "jsdom"
};
