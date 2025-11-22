import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly burgerMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText('Products');
    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
  }

  async assertOnInventoryPage() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.inventoryContainer).toBeVisible();
  }

  async assertProductCount(expectedCount: number) {
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }

  async getProductByName(productName: string) {
    return this.page.locator('.inventory_item', { hasText: productName });
  }

  async addProductToCart(productDataTest: string) {
    await this.page.locator(`[data-test="${productDataTest}"]`).click();
  }

  async addProductToCartByName(productName: string) {
    const product = await this.getProductByName(productName);
    await product.locator('button').click();
  }

  async assertCartBadgeCount(expectedCount: string) {
    await expect(this.shoppingCartBadge).toHaveText(expectedCount);
  }

  async assertCartBadgeNotVisible() {
    await expect(this.shoppingCartBadge).not.toBeVisible();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async selectSortOption(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    const names = await this.inventoryItems.locator('.inventory_item_name').allTextContents();
    return names;
  }

  async getProductPrices(): Promise<string[]> {
    const prices = await this.inventoryItems.locator('.inventory_item_price').allTextContents();
    return prices;
  }

  async assertProductHasAllElements(productLocator: Locator) {
    await expect(productLocator.locator('img')).toBeVisible();
    await expect(productLocator.locator('.inventory_item_name')).toBeVisible();
    await expect(productLocator.locator('.inventory_item_desc')).toBeVisible();
    await expect(productLocator.locator('.inventory_item_price')).toBeVisible();
    await expect(productLocator.locator('button')).toBeVisible();
  }

  async assertFirstProductDetails(name: string, price: string, description: string) {
    const firstProduct = this.inventoryItems.first();
    await expect(firstProduct.locator('.inventory_item_name')).toHaveText(name);
    await expect(firstProduct.locator('.inventory_item_price')).toHaveText(price);
    await expect(firstProduct.locator('.inventory_item_desc')).toContainText(description);
  }

  async assertAllProductsHaveRequiredElements() {
    const count = await this.inventoryItems.count();
    for (let i = 0; i < count; i++) {
      const product = this.inventoryItems.nth(i);
      await this.assertProductHasAllElements(product);
    }
  }
}
