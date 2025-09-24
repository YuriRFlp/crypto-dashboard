import { test, expect } from '@playwright/test';

test('Favorites page loads and displays favorite coins', async ({ page }) => {
  await page.goto('http://localhost:5173/favorites');
  await expect(page.getByRole('heading', { name: /favoritadas/i })).toBeVisible();

  if (await page.getByText(/no data/i).isVisible()) {
    await expect(page.getByText(/no data/i)).toBeVisible();
  } else {
    const rows = await page.locator('.el-table__row');
    await expect(rows).toHaveCountGreaterThan(0);

    const firstFavoriteBtn = rows.first().getByRole('button', { name: /favorite/i });
    await firstFavoriteBtn.click();

    await expect(rows.first()).not.toBeVisible();
  }
});