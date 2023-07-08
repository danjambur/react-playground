import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};

export default config;
