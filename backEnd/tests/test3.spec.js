import { test, expect } from '@playwright/test';
import { chromium } from '@playwright/test';

let browser;
let context;
let page; 

test.beforeAll( async () => {
      console.log("RUNNING BEFORE ALL HOOKS");
   
})
test.afterAll( async()=> {
    console.log("RUNNING AFTER ALL HOOKS")
})


test.only("E2E Saucedemo Checkout Flow", async ({ page }) => {
  // Go to the homepage
  await page.goto("https://www.saucedemo.com/");

  // Wait for the username field
  const username = page.locator('[data-test="username"]');
  await username.waitFor({ state: "visible", timeout: 60000 });
  await username.fill("standard_user");

  const password = page.locator('[data-test="password"]');
  await password.waitFor({ state: "visible", timeout: 60000 });
  await password.fill("secret_sauce");

  const loginButton = page.locator('[data-test="login-button"]');
  await loginButton.waitFor({ state: "visible", timeout: 60000 });

  // Click login and wait for inventory page
  await Promise.all([
    page.waitForURL(/.*inventory.html/, { timeout: 60000 }),
    loginButton.click(),
  ]);

  // Add multiple items to cart
  const items = [
    "add-to-cart-sauce-labs-backpack",
    "add-to-cart-sauce-labs-bike-light",
    "add-to-cart-sauce-labs-bolt-t-shirt",
    "add-to-cart-sauce-labs-fleece-jacket",
    "add-to-cart-sauce-labs-onesie",
  ];

  for (const item of items) {
    const button = page.locator(`[data-test="${item}"]`);
    await button.waitFor({ state: "visible", timeout: 50000 });
    await button.click();
  }

  // Go to cart
  const cartLink = page.locator('[data-test="shopping-cart-link"]');
  await Promise.all([
    page.waitForURL(/.*cart.html/, { timeout: 60000 }),
    cartLink.click(),
  ]);

  const cartTitle = page.locator('span[data-test="title"]');
  await cartTitle.waitFor({ state: "visible", timeout: 50000 });
  await expect(cartTitle).toHaveText("Your Cart");

  // Checkout step one
  const checkoutButton = page.locator('[data-test="checkout"]');
  await Promise.all([
    page.waitForURL(/.*checkout-step-one.html/, { timeout: 60000 }),
    checkoutButton.click(),
  ]);

  // Fill in checkout info
  await page.locator('[data-test="firstName"]').fill("ifeanyi");
  await page.locator('[data-test="lastName"]').fill("victor");
  await page.locator('[data-test="postalCode"]').fill("400100");

  // Continue to step two
  const continueButton = page.locator('[data-test="continue"]');
  await Promise.all([
    page.waitForURL(/.*checkout-step-two.html/, { timeout: 60000 }),
    continueButton.click(),
  ]);

  // Finish checkout
  const finishButton = page.locator('[data-test="finish"]');
  await Promise.all([
    page.waitForURL(/.*checkout-complete.html/, { timeout: 60000 }),
    finishButton.click(),
  ]);

  // Verify order completion
  const successHeader = page.locator('h2[data-test="complete-header"]');
  await successHeader.waitFor({ state: "visible", timeout: 50000 });
  await expect(successHeader).toHaveText(/Thank you for your order!/i);
});


// test.only('test', async ({page}) => {
//   await page.goto("https://www.saucedemo.com/");

//   await page.waitForLoadState("domcontentloaded");
//   await page.waitForLoadState("networkidle");

//   await expect(page).toHaveURL("https://www.saucedemo.com");

//   // Wait for username field to be visible
//   const username = page.locator('[data-test="username"]');
//   await username.waitFor({ state: "visible", timeout: 50000 });
//   await username.fill("standard_user");

//   const password = page.locator('[data-test="password"]');
//   await password.waitFor({ state: "visible", timeout: 50000 });
//   await password.fill("secret_sauce");

//   const loginButton = page.locator('[data-test="login-button"]');
//   await loginButton.waitFor({ state: "visible", timeout: 50000 });
//   await loginButton.click();

//   await page.waitForLoadState("domcontentloaded");
//   await page.waitForLoadState("networkidle");
//   await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

//   await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//   await page.waitForLoadState("networkidle");
//   await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
//   await page.waitForLoadState("networkidle");
//   await page
//     .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
//     .click();
//   await page.waitForLoadState("networkidle");
//   await page
//     .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
//     .click();
//   await page.waitForLoadState("networkidle");
//   await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

//   //click the cart
//   await page.locator('[data-test="shopping-cart-link"]').click();

//   await page.waitForLoadState("domcontentloaded");
//   await page.waitForLoadState("networkidle");
//   await page.waitForURL("https://www.saucedemo.com/cart.html");

//   const cartElement = page.locator('span[data-test="title"]');

//   await cartElement.waitFor({ state: "visible" });

//   await expect(cartElement).toHaveText("Your Cart");
//   await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

//   await page.locator('[data-test="checkout"]').click();

//   await page.waitForLoadState("domcontentloaded");
//   await page.waitForLoadState("networkidle");
//   await expect(page).toHaveURL(
//     "https://www.saucedemo.com/checkout-step-one.html"
//   );

//   await page.locator('[data-test="firstName"]').click();
//   await page.locator('[data-test="firstName"]').fill("ifeanyi");
//   await page.locator('[data-test="lastName"]').click();
//   await page.locator('[data-test="lastName"]').fill("victor");
//   await page.locator('[data-test="postalCode"]').click();
//   await page.locator('[data-test="postalCode"]').fill("400100");
//   await page.locator('[data-test="continue"]').click();

//   await page.waitForLoadState("domcontentloaded");
//   await page.waitForLoadState("networkidle");
//   await expect(page).toHaveURL(
//     "https://www.saucedemo.com/checkout-step-two.html"
//   );

//   await page.locator('[data-test="finish"]').click();

//   await page.waitForLoadState("domcontentloaded");
//   await page.waitForLoadState("networkidle");
//   await expect(page).toHaveURL(
//     "https://www.saucedemo.com/checkout-complete.html"
//   );

//   await expect(
//     await page.locator('h2[data-test="complete-header"]')
//   ).toHaveText(/Thank you for your order!/i);
// });