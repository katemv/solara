import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["./setupTests.ts"],
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/jest-config/mocks/styleMock.js"
    },
    moduleFileExtensions: ["tsx", "ts", "js", "json", "node"],
    transform: {
        "^.+.tsx?$": ["ts-jest", {}]
    },
    transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts"
    ]
};

export default config;
