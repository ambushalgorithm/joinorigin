import { test, expect } from '@playwright/test';

test('homepage shows Welcome to JoinOrigin', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Welcome to JoinOrigin')).toBeVisible();
});

test('homepage renders the shared design system elements', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Your workspace is ready.')).toBeVisible();
  await expect(page.getByText('Get started')).toBeVisible();
});
