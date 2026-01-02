import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4173/projects',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // webServer disabled - run `bun run preview` manually before tests
  // webServer: {
  //   command: 'bun run preview',
  //   url: 'http://localhost:4173/projects',
  //   reuseExistingServer: true,
  //   timeout: 120000,
  // },
});
