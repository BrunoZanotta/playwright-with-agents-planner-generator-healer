import { test, expect } from '../../fixtures/authenticatedPage';
import { PRODUCTS } from '../../utils/constants';
import { CHECKOUT_DATA } from '../../utils/testData';

test.describe('Checkout Process Tests', { tag: '@checkout' }, () => {
  test('Checkout Information', { tag: '@smoke' }, async ({ authenticatedPage, inventoryPage, cartPage, checkoutPage }) => {
    // Add product to cart
    await inventoryPage.addProductToCart(PRODUCTS.backpack.dataTest);

    // Navigate to cart and proceed to checkout
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Verify we're on the checkout information page
    await checkoutPage.assertOnCheckoutInfoPage();

    // Fill in personal information
    await checkoutPage.fillCheckoutInformation(
      CHECKOUT_DATA.valid.firstName,
      CHECKOUT_DATA.valid.lastName,
      CHECKOUT_DATA.valid.postalCode
    );

    // Submit information
    await checkoutPage.clickContinue();

    // Verify checkout overview page loads
    await checkoutPage.assertOnCheckoutOverviewPage();

    // Verify order summary elements
    await checkoutPage.assertOrderSummaryVisible();
    await checkoutPage.assertPaymentMethod('SauceCard #31337');
    await checkoutPage.assertShippingMethod('Free Pony Express Delivery!');

    // Verify item details
    await checkoutPage.assertProductInOverview(PRODUCTS.backpack.name);
    await checkoutPage.assertProductPriceInOverview(PRODUCTS.backpack.price);
  });
});
