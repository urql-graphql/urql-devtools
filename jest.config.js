module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/src/panel/__mocks__/svg.tsx",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$":
      "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
};
