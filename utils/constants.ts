export const URLS = {
  base: 'https://www.saucedemo.com',
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkoutStepOne: '/checkout-step-one.html',
  checkoutStepTwo: '/checkout-step-two.html',
  checkoutComplete: '/checkout-complete.html',
} as const;

export const TIMEOUTS = {
  short: 5000,
  medium: 10000,
  long: 30000,
} as const;

export const PRODUCTS = {
  backpack: {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
    dataTest: 'add-to-cart-sauce-labs-backpack',
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
    dataTest: 'add-to-cart-sauce-labs-bike-light',
  },
  boltTShirt: {
    name: 'Sauce Labs Bolt T-Shirt',
    price: '$15.99',
    dataTest: 'add-to-cart-sauce-labs-bolt-t-shirt',
  },
  fleeceJacket: {
    name: 'Sauce Labs Fleece Jacket',
    price: '$49.99',
    dataTest: 'add-to-cart-sauce-labs-fleece-jacket',
  },
  onesie: {
    name: 'Sauce Labs Onesie',
    price: '$7.99',
    dataTest: 'add-to-cart-sauce-labs-onesie',
  },
  tShirtRed: {
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: '$15.99',
    dataTest: 'add-to-cart-test.allthethings()-t-shirt-(red)',
  },
} as const;
