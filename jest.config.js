// jest.config.js
module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true, 
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/",
    "\\\\node_modules\\\\"
  ],
  // ...existing configuration...
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^react-router-dom$': '<rootDir>/__mocks__/react-router-dom.js',
    '\\.(css|less)$': 'identity-obj-proxy', // Add this line to mock CSS imports
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will be skipped
  transformIgnorePatterns: [
    "node_modules/(?!(@testing-library/.*))" 
  ],

  // Indicates whether each individual test should be reported during the run
  // An array of regexp pattern strings that are matched against all test paths, matched tests are considered as watchOnly, and will be rerun automatically on file changes
  //watchOnly: false,

  // The paths to modules that run automatically before each test
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.js" // Optional: Add a setup file for global setup
  ],

  // Test Environment
  testEnvironment: "jsdom", // Use jsdom for browser-like testing
  
  // Optional: For TypeScript projects
  preset: "ts-jest", 
  
  // ... other configurations as needed
};