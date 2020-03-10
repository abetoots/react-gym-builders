module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest"
  },
  testMatch: [
    //it looks inside src/ for .js, .jsx, .ts and .tsx files, as well as any files with a suffix of .test or .spec
    "<rootDir/src/**/>*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  moduleFileExtensions: ["js", "jsx"],
  testPathIgnorePatterns: ["/node_modules/", "/public/"],
  setupFiles: ["./__mocks__/styleMock.js", "./__mocks__/fileMock.js"],
  setupFilesAfterEnv: [
    // setupFiles before the tests are ran, alternative to setupTests.js
    "@testing-library/jest-dom/extend-expect"
    //no need to import cleanup after each, done automatically when using Jest,
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss|sass)$": "<rootDir>/__mocks__/styleMock.js"
  }
};
