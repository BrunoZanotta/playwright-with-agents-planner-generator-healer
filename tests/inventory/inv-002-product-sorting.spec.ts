import { test, expect } from '../../fixtures/authenticatedPage';

test.describe('Product Inventory Tests', { tag: '@inventory' }, () => {
  test('Product Sorting', { tag: '@regression' }, async ({ authenticatedPage, inventoryPage }) => {
    // Verify initial sort (Name A to Z)
    await expect(inventoryPage.sortDropdown).toHaveValue('az');
    let names = await inventoryPage.getProductNames();
    expect(names).toEqual([...names].sort());

    // Test Name (Z to A) sorting
    await inventoryPage.selectSortOption('za');
    names = await inventoryPage.getProductNames();
    expect(names).toEqual([...names].sort().reverse());

    // Test Price (low to high) sorting
    await inventoryPage.selectSortOption('lohi');
    let prices = (await inventoryPage.getProductPrices()).map(price => parseFloat(price.replace('$', '')));
    expect(prices).toEqual([...prices].sort((a, b) => a - b));

    // Test Price (high to low) sorting
    await inventoryPage.selectSortOption('hilo');
    prices = (await inventoryPage.getProductPrices()).map(price => parseFloat(price.replace('$', '')));
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });
});
