export class CheckoutOverviewPage {
  constructor(page) {
    this.title = page.locator('[data-test="title"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}
