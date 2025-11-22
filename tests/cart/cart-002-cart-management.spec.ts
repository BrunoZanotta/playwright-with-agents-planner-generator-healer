import { test, expect } from '../../fixtures/authenticatedPage';
import { PRODUCTS } from '../../utils/constants';
import { URLS } from '../../utils/constants';

test.describe('Shopping Cart Tests', { tag: '@cart' }, () => {
  test('Cart Management', { tag: '@regression' }, async ({ authenticatedPage, inventoryPage, cartPage }) => {
    // Add multiple products to cart
    await inventoryPage.addProductToCart(PRODUCTS.backpack.dataTest);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight.dataTest);
    await inventoryPage.assertCartBadgeCount('2');

    // Navigate to cart page
    await inventoryPage.goToCart();
    await expect(authenticatedPage).toHaveURL(new RegExp(`${URLS.cart}$`));

    // Verify initial cart state
    await cartPage.assertCartItemCount(2);
    await cartPage.assertProductInCart(PRODUCTS.backpack.name, PRODUCTS.backpack.price);
    await cartPage.assertProductInCart(PRODUCTS.bikeLight.name, PRODUCTS.bikeLight.price);

    // Remove one product
    await cartPage.removeProductByName(PRODUCTS.backpack.name);

    // Verify cart updates
    await cartPage.assertCartItemCount(1);
    await expect(authenticatedPage.getByText(PRODUCTS.backpack.name).first()).not.toBeVisible();
    await inventoryPage.assertCartBadgeCount('1');

    // Continue shopping
    await cartPage.continueShopping();
    await expect(authenticatedPage).toHaveURL(new RegExp(`${URLS.inventory}$`));

    // Add another product
    await inventoryPage.addProductToCart(PRODUCTS.boltTShirt.dataTest);

    // Verify cart maintains state
    await inventoryPage.assertCartBadgeCount('2');
    await inventoryPage.goToCart();
    await cartPage.assertCartItemCount(2);
    await cartPage.assertProductInCart(PRODUCTS.bikeLight.name, PRODUCTS.bikeLight.price);
    await cartPage.assertProductInCart(PRODUCTS.boltTShirt.name, PRODUCTS.boltTShirt.price);
  });
});
