import { test, expect } from '../../fixtures/authenticatedPage';
import { PRODUCTS } from '../../utils/constants';

test.describe('Shopping Cart Tests', { tag: '@cart' }, () => {
  test('Add Products to Cart', { tag: '@smoke' }, async ({ authenticatedPage, inventoryPage, cartPage }) => {
    // Add multiple products to cart
    await inventoryPage.addProductToCart(PRODUCTS.backpack.dataTest);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight.dataTest);

    // Verify cart badge updates
    await inventoryPage.assertCartBadgeCount('2');

    // Click cart icon
    await inventoryPage.goToCart();

    // Verify cart page displays correct items and prices
    await cartPage.assertOnCartPage();
    await cartPage.assertCartItemCount(2);

    // Verify first item (Backpack)
    await cartPage.assertProductInCart(PRODUCTS.backpack.name, PRODUCTS.backpack.price);

    // Verify second item (Bike Light)
    await cartPage.assertProductInCart(PRODUCTS.bikeLight.name, PRODUCTS.bikeLight.price);

    // Verify item quantity
    await cartPage.assertProductQuantity(0, '1');
    await cartPage.assertProductQuantity(1, '1');
  });
});
