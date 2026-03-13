import { test, expect } from '@playwright/test';

test.describe('OCT-Web-Dev access gate', () => {
  test('shows access restricted when user lacks permission', async ({ page }) => {
    await page.goto('/resources/oct-web-dev');
    // Wait for the page to finish loading
    await page.waitForLoadState('networkidle');
    // User without permission should see access restricted message
    const restricted = page.getByText('Access Restricted');
    await expect(restricted).toBeVisible({ timeout: 10_000 });
  });

  test('page renders with correct title', async ({ page }) => {
    await page.goto('/resources/oct-web-dev');
    await expect(page.getByText('OCT Web Development')).toBeVisible({ timeout: 10_000 });
  });
});
