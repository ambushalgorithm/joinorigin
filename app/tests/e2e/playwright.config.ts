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
  // TASK-522: the two documented flake families (scene-orbit GSAP hydration
  // under parallel load + translate-page cold-route first compile) are
  // hardened in their specs (30s poll matching SCENE_HYDRATION_MAX_WAIT_MS,
  // starve-proof expect.poll change assertions, tolerance-based bbox checks,
  // pre-warm beforeAll + per-goto timeout). A single retry remains as the
  // backstop for environmental (CPU/network) starvation so the suite stays
  // deterministic; tests are NOT disabled.
  retries: 1,
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
    // Run the e2e suite against a PRODUCTION server: build the Next.js app
    // once, then serve it with `next start` on the dedicated port (default
    // 3100). The dev server (`next dev`) ballooned to ~14 GB RSS during the
    // locale-route spec and was OOM-killed by the kernel (journalctl Aug 19
    // 14:51 + 15:36), taking down the whole tmux scope. The production server
    // uses <500 MB (~270 MB measured), so the suite runs without OOM.
    command: `pnpm --dir ../../apps/web build && PORT=${WEB_PORT} pnpm --dir ../../apps/web start`,
    url: `http://127.0.0.1:${WEB_PORT}`,
    // TASK-584: never reuse a running server. The orchestrator now sets
    // JOINORIGIN_WEB_PORT per slot (read above), so each Playwright run must
    // build + start a fresh prod server on its own slot port — concurrent
    // agents must never attach to a neighbor slot's server (wrong-build flakes).
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
