import { expect, test, type Page, type Route } from '@playwright/test';
import { projects } from '../../src/data/projects-generated';

const APP_URL = '/projects/';
const ROOT_PATTERN = /<div id="root">[\s\S]*<\/div>([\s\S]*<\/body>)/;
const EMPTY_ROOT = '<div id="root"></div>$1';
const STABLE_STYLES = '* { animation: none !important; transition: none !important; } input { caret-color: transparent !important; }';
const LAYOUT_SELECTORS = ['#site-nav', '.header__description', '#projects-content', '#sidebar-search', '#prisma-migrations-header'];

function stripStaticMarkup(html: string): string {
  const stripped = html.replace(ROOT_PATTERN, EMPTY_ROOT);
  if (stripped === html) throw new Error('Static root not found');
  return stripped;
}

async function serveEmptyRoot(route: Route) {
  const response = await route.fetch();
  const html = await response.text();
  const body = stripStaticMarkup(html);
  await route.fulfill({ response, body });
}

async function openInteractiveApp(page: Page) {
  await page.goto(APP_URL);
  await expect(page.locator('#sidebar-search-input')).toBeVisible();
  await page.addStyleTag({ content: STABLE_STYLES });
}

async function filterToPrisma(page: Page) {
  await page.fill('#sidebar-search-input', 'prisma');
  await expect(page.locator('#sidebar-filter-count')).toContainText('1 project found');
  await expect(page.locator('#prisma-migrations')).toBeVisible();
  await expect(page.locator('#prisma-migrations-metrics')).toBeAttached();
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function getLayout(page: Page) {
  return page.evaluate((selectors) => selectors.map((selector) => {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Missing layout element: ${selector}`);
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const dimensions = [rect.x, rect.y, rect.width, rect.height].map(Math.round);
    return { selector, dimensions, display: style.display, fontSize: style.fontSize };
  }), LAYOUT_SELECTORS);
}

async function settleLayout(page: Page) {
  await page.evaluate(() => new Promise<void>((resolve) => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  }));
}

test('static content is available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(APP_URL);
  await expect(page.locator('[data-project-id]')).toHaveCount(projects.length);
  await expect(page.locator('#prisma-migrations')).toContainText('8');
  await expect(page.locator('#es-check')).toContainText('212');
  await context.close();
});

test('prerendering preserves the interactive page', async ({ context, page }) => {
  const emptyRootPage = await context.newPage();
  await emptyRootPage.route('**/projects/', serveEmptyRoot);
  await Promise.all([openInteractiveApp(page), openInteractiveApp(emptyRootPage)]);
  await Promise.all([filterToPrisma(page), filterToPrisma(emptyRootPage)]);
  const rendered = await page.screenshot({ animations: 'disabled' });
  const baseline = await emptyRootPage.screenshot({ animations: 'disabled' });
  expect(rendered).toEqual(baseline);
  const mobileViewport = { width: 390, height: 844 };
  await Promise.all([page.setViewportSize(mobileViewport), emptyRootPage.setViewportSize(mobileViewport)]);
  await Promise.all([settleLayout(page), settleLayout(emptyRootPage)]);
  const mobileRendered = await getLayout(page);
  const mobileBaseline = await getLayout(emptyRootPage);
  expect(mobileRendered).toEqual(mobileBaseline);
});
