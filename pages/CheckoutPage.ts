import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly checkoutInfoTitle: Locator;
  readonly checkoutOverviewTitle: Locator;
  readonly checkoutCompleteTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly priceTotalLabel: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutInfoTitle = page.getByText('Checkout: Your Information');
    this.checkoutOverviewTitle = page.getByText('Checkout: Overview');
    this.checkoutCompleteTitle = page.getByText('Checkout: Complete!');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.paymentInfo = page.getByText('Payment Information:');
    this.shippingInfo = page.getByText('Shipping Information:');
    this.priceTotalLabel = page.getByText('Price Total');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async assertOnCheckoutInfoPage() {
    await expect(this.checkoutInfoTitle).toBeVisible();
  }

  async assertOnCheckoutOverviewPage() {
    await expect(this.checkoutOverviewTitle).toBeVisible();
  }

  async assertOnCheckoutCompletePage() {
    await expect(this.checkoutCompleteTitle).toBeVisible();
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async assertErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async assertOrderSummaryVisible() {
    await expect(this.paymentInfo).toBeVisible();
    await expect(this.shippingInfo).toBeVisible();
    await expect(this.priceTotalLabel).toBeVisible();
  }

  async assertPaymentMethod(method: string) {
    await expect(this.page.getByText(method)).toBeVisible();
  }

  async assertShippingMethod(method: string) {
    await expect(this.page.getByText(method)).toBeVisible();
  }

  async assertProductInOverview(productName: string) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async assertProductPriceInOverview(price: string) {
    await expect(this.page.locator('.inventory_item_price', { hasText: price })).toBeVisible();
  }

  async getSubtotal(): Promise<string> {
    return await this.subtotalLabel.textContent() || '';
  }

  async getTax(): Promise<string> {
    return await this.taxLabel.textContent() || '';
  }

  async getTotal(): Promise<string> {
    return await this.totalLabel.textContent() || '';
  }

  async assertCheckoutComplete() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toBeVisible();
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }
}
