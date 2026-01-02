import { test, expect } from '@playwright/test';

test.describe('performance', () => {
  test('page loads within acceptable time', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForSelector('#project-list');
    const loadTime = Date.now() - start;

    expect(loadTime).toBeLessThan(3000);
  });

  test('search responds quickly', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#sidebar-search-input');

    const start = Date.now();
    await page.fill('#sidebar-search-input', 'typescript');
    await page.waitForSelector('#sidebar-filter-count');
    const searchTime = Date.now() - start;

    expect(searchTime).toBeLessThan(500);
  });

  test('scrollspy updates without lag', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#project-list');

    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(200);

    const activeCard = page.locator('[class*="active"]');
    await expect(activeCard.first()).toBeVisible();
  });
});
