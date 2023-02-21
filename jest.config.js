const transform = {
  "\\.tsx?$": [
    "ts-jest",
    {
      tsconfig: "./tsconfig.test.json"
    }
  ]
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  transform: transform,
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: __dirname,
  moduleFileExtensions: ["ts", "tsx", "js"],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/packages/**/node_modules/',
  ],
  projects: [
    {
      displayName: "Packages",
      testMatch: ["<rootDir>/packages/**/*.test.ts"],
      transform: transform,
    }
  ],
};