// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
 module.exports = defineConfig({
  testDir: './tests',

  // Playwright has a default timeout of 30 seconds for each action and each test.
  timeout: 400 * 1000,

  // We can add assertion timeout to wait for an assertion to become true.
  expect: {
    timeout: 400 * 1000,
  },

  // For reporting, we can use multiple reporters together.
  reporter: [
    ['html', { outputFolder: 'test-report' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
});