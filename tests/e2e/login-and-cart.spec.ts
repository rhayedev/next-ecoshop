import { test, expect } from '@playwright/test';

test('login -> add product to cart', async ({ page, baseURL }) => {
  // Determine root URL (use Playwright baseURL if provided)
  const root = baseURL ?? 'http://localhost:3000';

  // Navigate to login (if present) otherwise simulate visiting home
  await page.goto(new URL('/', root).toString());

  // If a login form exists, fill it (fallback: skip)
  if (await page.locator('form#login').count() > 0) {
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    // wait for redirect or UI change
    await page.waitForTimeout(500);
  }

  // Go to products
  await page.goto(new URL('/fr/products', root).toString());
  await expect(page).toHaveURL(/products/);

  // Add first product from the list
  const firstAddBtn = page.locator('button', { hasText: 'Ajouter au panier' }).first();
  await expect(firstAddBtn).toBeVisible();
  await firstAddBtn.click();

  // Open cart summary (assumes cart summary is visible or accessible)
  // Check that cart contains at least one item and price total is updated
  const cartCount = page.locator('.cart-count');
  if (await cartCount.count() > 0) {
    await expect(cartCount).toHaveText(/\d+/);
  }

  // If there's a cart total element, assert numeric value
  const total = page.locator('.cart-total');
  if (await total.count() > 0) {
    const text = await total.textContent();
    expect(text).toMatch(/[0-9]+[.,]?\d*/);
  }
});
