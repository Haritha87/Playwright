import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage.js';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage.js';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js';
import { loginTestData } from '../test-data/loginData.js';
import { shoppingTestData } from '../test-data/shoppingData.js';

let loginPage;
let inventoryPage;
let cartPage;
let checkoutInformationPage;
let checkoutOverviewPage;
let checkoutCompletePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page, shoppingTestData.product.name);
  checkoutInformationPage = new CheckoutInformationPage(page);
  checkoutOverviewPage = new CheckoutOverviewPage(page);
  checkoutCompletePage = new CheckoutCompletePage(page);

  await loginPage.goto();
  await loginPage.login(
    loginTestData.validUser.username,
    loginTestData.validUser.password,
  );
});

test('should complete checkout when a valid customer purchases a backpack', async ({ page }) => {
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(inventoryPage.title).toHaveText(shoppingTestData.expected.inventoryTitle);

  await inventoryPage.addBackpackToCart();
  await expect(inventoryPage.backpackRemoveButton).toBeVisible();
  await inventoryPage.openCart();

  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(cartPage.productName).toBeVisible();
  await cartPage.checkout();

  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  await expect(checkoutInformationPage.title).toHaveText(
    shoppingTestData.expected.informationTitle,
  );
  await checkoutInformationPage.enterInformation(
    shoppingTestData.checkout.firstName,
    shoppingTestData.checkout.lastName,
    shoppingTestData.checkout.postalCode,
  );
  await checkoutInformationPage.continueCheckout();

  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  await expect(checkoutOverviewPage.title).toHaveText(
    shoppingTestData.expected.overviewTitle,
  );
  await checkoutOverviewPage.finishCheckout();

  await expect(page).toHaveURL(/\/checkout-complete\.html$/);
  await expect(checkoutCompletePage.completeHeader).toHaveText(
    shoppingTestData.expected.completionMessage,
  );
});
