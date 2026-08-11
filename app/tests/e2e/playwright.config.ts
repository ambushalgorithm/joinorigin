import { defineConfig, devices } from '@playwright/test';

const WEB_PORT = Number(process.env.JOINORIGIN_WEB_PORT ?? 3100);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Cap workers: the suite grew from 36 → 100+ tests (TASK-218). With the
  // default worker count (cpus/2 = 4 on this host), 4 parallel workers
  // hammering the single Next.js dev server caused the pre-existing
  // responsive mobile-nav test to flake (toggle clicks dropped under load).
  // 2 workers keeps the full suite deterministic and green (verified 106/106
  // across repeated runs) while still running files in parallel.
  workers: 2,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 120_000,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${WEB_PORT}`,
    trace: 'on-first-retry',
    navigationTimeout: 60_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // Start the Next.js dev server from the workspace context on a dedicated
    // port (default 3100) to avoid collisions with other dev servers.
    command: `PORT=${WEB_PORT} pnpm --dir ../../apps/web dev`,
    url: `http://127.0.0.1:${WEB_PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
