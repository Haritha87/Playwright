export class CartPage {
  constructor(page, productName) {
    this.title = page.locator('[data-test="title"]');
    this.productName = page
      .locator('[data-test="inventory-item-name"]')
      .filter({ hasText: productName });
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
