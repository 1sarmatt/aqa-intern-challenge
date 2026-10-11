import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    // close cookies popup and wait for it to disappear
    const cookieButton = page.locator('._UCHI_COOKIE__button');
    if (await cookieButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await cookieButton.click();
      // Wait for the cookie popup to disappear
      await page.locator('._UCHI_COOKIE__wrap').waitFor({ state: 'hidden', timeout: 5000 });
    }
  });

  test('opens', async ({page}) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible()
  });

  test('has correct title', async ({ page }) => {
    await widgetPage.openWidget();

    await widgetPage.clickFirstPopularArticle();

    await widgetPage.clickWriteToUs();

    expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');
  });
});
