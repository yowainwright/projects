import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test('loads homepage with project list', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#project-list')).toBeVisible();
  });

  test('search filters projects', async ({ page }) => {
    await page.goto('/');
    await page.fill('#sidebar-search-input', 'koa');
    await expect(page.locator('[id="koa"]')).toBeVisible();
  });

  test('clicking project scrolls to it', async ({ page }) => {
    await page.goto('/');
    await page.click('[id="sidebar-card-stickybits"]');
    await expect(page.locator('[id="stickybits"]')).toBeInViewport();
  });

  test('sidebar shows project cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[id^="sidebar-card-"]').first()).toBeVisible();
  });

  test('clear filters resets search', async ({ page }) => {
    await page.goto('/');
    await page.fill('#sidebar-search-input', 'nonexistent');
    await expect(page.locator('#sidebar-nav-empty')).toBeVisible();
    await page.fill('#sidebar-search-input', '');
    await expect(page.locator('#project-list-container')).toBeVisible();
  });
});
