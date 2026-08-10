import { test, expect } from '@playwright/test';

test('homepage shows Welcome to JoinOrigin', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Welcome to JoinOrigin')).toBeVisible();
});
