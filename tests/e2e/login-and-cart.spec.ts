import { test, expect } from '@playwright/test';

test('login puis ajout au panier', async ({ page }) => {
  // 1. Aller sur la page de login
  await page.goto('/fr/login');

  // 2. Remplir le formulaire
  await page.getByLabel('Email').fill('demo@ecoshop.test');
  await page.getByLabel('Mot de passe').fill('password123');

  // 3. Soumettre
  await page.getByRole('button', { name: /se connecter/i }).click();

  // 4. Attendre la redirection
  await page.waitForURL('**/fr/products');

  // 5. Vérifier qu’on est bien sur la page produits
  await expect(
    page.getByRole('heading', { name: /nos produits/i })
  ).toBeVisible();

  // 6. Cliquer sur "Ajouter au panier"
  await page
    .getByRole('button', { name: /ajouter au panier/i })
    .first()
    .click();

  // ✅ 7. Vérifier que le panier s’affiche
  await expect(
    page.getByText(/total panier/i)
  ).toBeVisible();
});
