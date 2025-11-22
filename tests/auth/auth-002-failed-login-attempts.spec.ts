import { test, expect } from '../../fixtures/authenticatedPage';
import { TEST_USERS, ERROR_MESSAGES } from '../../utils/testData';

test.describe('Authentication Tests', { tag: '@auth' }, () => {
  test('Failed Login Attempts', { tag: '@smoke' }, async ({ loginPage }) => {
    // Navigate to login page
    await loginPage.goto();

    // Test invalid username with valid password
    await loginPage.login('invalid_user', TEST_USERS.standard.password);
    await loginPage.assertErrorMessage(ERROR_MESSAGES.invalidCredentials);

    // Test valid username with invalid password
    await loginPage.login(TEST_USERS.standard.username, 'wrong_password');
    await loginPage.assertErrorMessage(ERROR_MESSAGES.invalidCredentials);

    // Test empty username with valid password
    await loginPage.fillUsername('');
    await loginPage.fillPassword(TEST_USERS.standard.password);
    await loginPage.clickLogin();
    await loginPage.assertErrorMessage(ERROR_MESSAGES.usernameRequired);

    // Test locked out user
    await loginPage.login(TEST_USERS.locked.username, TEST_USERS.locked.password);
    await loginPage.assertErrorMessage(ERROR_MESSAGES.lockedUser);
  });
});
