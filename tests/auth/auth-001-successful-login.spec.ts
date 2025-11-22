import { test, expect } from '../../fixtures/authenticatedPage';
import { TEST_USERS } from '../../utils/testData';

test.describe('Authentication Tests', { tag: '@auth' }, () => {
  test('Successful Login', { tag: '@smoke' }, async ({ loginPage, inventoryPage }) => {
    // Navigate to login page
    await loginPage.goto();

    // Perform login
    await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);

    // Verify user is redirected to inventory page
    await loginPage.assertLoginSuccess();

    // Verify product list is visible
    await inventoryPage.assertOnInventoryPage();

    // Verify shopping cart icon is present in header
    await expect(inventoryPage.shoppingCartLink).toBeVisible();
  });
});
