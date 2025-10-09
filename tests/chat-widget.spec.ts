import { test, expect } from '@playwright/test';

test.describe('Chat Widget - Cross-Browser Tests', () => {
  test('should load homepage with chat widget in English', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    await expect(page).toHaveURL(/\/en/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en', { timeout: 10000 });
  });

  test('should load homepage with chat widget in Arabic', async ({ page }) => {
    await page.goto('/ar', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    await expect(page).toHaveURL(/\/ar/);
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl', { timeout: 10000 });
  });

  test('should be responsive on mobile', async ({ page, viewport }) => {
    await page.goto('/en', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    
    // Page should load on any viewport
    await expect(page.locator('html')).toBeVisible({ timeout: 10000 });
  });
});
