import { defineConfig, devices } from "@playwright/test";

// Not 3000, so a running development server is never tested by mistake.
const port = 3100;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: "./e2e",
  // A flaky test counts as failing; see SPEC-002.002-diagnose-failures.
  retries: 0,
  reporter: "list",
  use: {
    baseURL,
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Always a new production build, so a pass can't come from stale code.
    command: `npm run build && npm run start -- --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
