import { test, expect } from '@playwright/test';

test('Details page shows coin info and back button', async ({ page }) => {
  await page.goto('http://localhost:5173/coin/btc');
  await expect(page.getByRole('heading')).toBeVisible();
  await expect(page.getByRole('button', { name: /voltar/i })).toBeVisible();
  await page.getByRole('button', { name: /voltar/i }).click();
  await expect(page).toHaveURL('http://localhost:5173/');
});