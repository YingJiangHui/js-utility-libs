/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts'],
  setupFiles: ["jest-canvas-mock"],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};