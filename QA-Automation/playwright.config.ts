import { defineConfig, devices } from "@playwright/test";

// Playwright execution config for the QA-Automation project.
// npm scripts in package.json call this config when running typecheck/e2e tests.
const localBaseURL = "http://127.0.0.1:4173";
const baseURL = process.env.BASE_URL || localBaseURL;
const usesExternalBaseURL = Boolean(process.env.BASE_URL);

export default defineConfig({
  testDir: "./tests/e2e",

  // Snapshot files live beside each spec so design baselines are easy to review.
  snapshotPathTemplate: "{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
    toHaveScreenshot: {
      // Allows small rendering differences while still catching meaningful UI drift.
      maxDiffPixelRatio: 0.025
    }
  },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [["html"], ["list"]],
  use: {
    // Local PR checks use the static server. Production readiness passes BASE_URL from CI.
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  webServer: usesExternalBaseURL ? undefined : {
    // Serves ../SourceCode as a static site before browser tests execute.
    command: "npx tsx tests/support/static-server.ts",
    url: localBaseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 10_000
  },
  projects: [
    {
      // Desktop is the approved baseline for visual regression snapshots.
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 }
      }
    },
    {
      // Mobile runs functional/responsive checks; visual snapshots are skipped in the spec.
      name: "chromium-mobile",
      use: {
        ...devices["Pixel 7"],
        viewport: { width: 390, height: 844 }
      }
    }
  ]
});
