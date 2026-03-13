import { test, expect } from '@playwright/test';

// These tests require a running dev server with DEV_BYPASS_IAP=true
// and a seeded database with a user that has oct-web-dev access.

test.describe('OCT-Web-Dev docs tab', () => {
  test.skip(
    !process.env.E2E_FULL,
    'Skipped unless E2E_FULL=true (requires auth bypass + seeded DB)'
  );

  test('tabs are visible when authenticated', async ({ page }) => {
    await page.goto('/resources/oct-web-dev');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Design')).toBeVisible();
    await expect(page.getByText('Docs')).toBeVisible();
    await expect(page.getByText('Progress')).toBeVisible();
  });

  test('docs tab shows document sidebar', async ({ page }) => {
    await page.goto('/resources/oct-web-dev');
    await page.waitForLoadState('networkidle');
    await page.getByText('Docs').click();
    await expect(page.getByText('Project Documentation')).toBeVisible();
    await expect(page.getByText('CI/CD Pipeline')).toBeVisible();
  });

  test('clicking a document loads its content', async ({ page }) => {
    await page.goto('/resources/oct-web-dev');
    await page.waitForLoadState('networkidle');
    await page.getByText('Docs').click();
    // Click on Architecture Overview in the sidebar
    await page.getByRole('button', { name: /Architecture Overview/ }).first().click();
    // Document content should load
    await expect(page.locator('.prose, [class*="markdown"]').first()).toBeVisible();
  });
});
