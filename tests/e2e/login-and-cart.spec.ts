import { test, expect } from '@playwright/test';

test('login puis ajout au panier', async ({ page }) => {
  // 1. Aller sur la page de login
  await page.goto('/login');

  // 2. Remplir le formulaire
  await page.getByLabel('Email').fill('demo@ecoshop.test');
  await page.getByLabel('Mot de passe').fill('password123');

  // 3. Soumettre
  await page.getByRole('button', { name: 'Se connecter' }).click();

  // 4. Redirection vers /products
  await page.waitForURL('**/products');
  await expect(page.getByRole('heading', { name: 'Produits' })).toBeVisible();

  // 5. Ajouter un premier produit au panier
  await page.getByRole('button', { name: /Ajouter au panier/i }).first().click();

  // 6. Vérifier que le panier / total est visible
  await expect(page.getByText(/Total panier/i)).toBeVisible();
});
