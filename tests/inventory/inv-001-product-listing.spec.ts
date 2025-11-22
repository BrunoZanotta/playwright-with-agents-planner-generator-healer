import { test, expect } from '../../fixtures/authenticatedPage';
import { PRODUCTS } from '../../utils/constants';

test.describe('Product Inventory Tests', { tag: '@inventory' }, () => {
  test('Product Listing', { tag: '@regression' }, async ({ authenticatedPage, inventoryPage }) => {
    // Verify product grid layout
    await inventoryPage.assertOnInventoryPage();

    // Verify first product card elements (Sauce Labs Backpack)
    await inventoryPage.assertFirstProductDetails(
      PRODUCTS.backpack.name,
      PRODUCTS.backpack.price,
      'carry.allTheThings()'
    );

    const firstProduct = inventoryPage.inventoryItems.first();

    // Verify product image
    await expect(firstProduct.locator('img')).toBeVisible();
    await expect(firstProduct.locator('img')).toHaveAttribute('alt', PRODUCTS.backpack.name);

    // Verify Add to Cart button
    await expect(firstProduct.locator('button')).toBeVisible();
    await expect(firstProduct.locator('button')).toHaveText('Add to cart');

    // Verify all products are displayed (6 items total)
    await inventoryPage.assertProductCount(6);

    // Verify each product has all required elements
    await inventoryPage.assertAllProductsHaveRequiredElements();
  });
});
