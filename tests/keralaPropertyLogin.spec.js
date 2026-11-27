import { test, expect } from '@playwright/test';
import { KeralaPropertyLoginPage } from '../pages/KeralaPropertyLoginPage.js';
import { KeralaPropertyMyHomePage } from '../pages/KeralaPropertyMyHomePage.js';

let loginPage;
let myHomePage;

test.beforeEach(async ({ page }) => {
  const username = process.env.KERALAPROPERTY_USERNAME;
  const password = process.env.KERALAPROPERTY_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'Set KERALAPROPERTY_USERNAME and KERALAPROPERTY_PASSWORD before running this test.',
    );
  }

  loginPage = new KeralaPropertyLoginPage(page);
  myHomePage = new KeralaPropertyMyHomePage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
});

test('should show the My home dashboard when valid credentials are submitted', async ({ page }) => {
  await expect(page).toHaveURL(/\/member\/myhome\/?$/);
  await expect(myHomePage.myHomeHeading).toBeVisible();
});
