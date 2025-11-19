import { test, expect } from '@playwright/test';

test("affiche une UI d’erreur si l’API produits tombe", async ({ page }) => {
  // On intercepte l'appel API et on le fait échouer
  await page.route('**/api/products**', route => route.abort());

  // On va sur la page produits
  await page.goto('/products');

  // On s'attend à voir un message d'erreur
  await expect(page.getByText(/Erreur/i)).toBeVisible();

  // Et un bouton "Réessayer"
  await expect(page.getByRole('button', { name: /Réessayer/i })).toBeVisible();
});
