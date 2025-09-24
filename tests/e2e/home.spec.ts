import { test, expect } from '@playwright/test';

test('Home page loads and displays coin table', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.getByRole('heading', { name: /cripto/i })).toBeVisible();
  await expect(page.getByText('BTC')).toBeVisible({ timeout: 10000 });
  await expect(page.getByPlaceholder('Pesquisar criptomoeda')).toBeVisible();
});

test('Can search for a coin', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.getByPlaceholder('Pesquisar criptomoeda').fill('ETH');
  await expect(page.getByText(/^ETH$/)).toBeVisible();
});

test('Can view coin details', async ({ page }) => {
  await page.route('**/api/v3/coins/markets**', async (route) => {
    const mockResponse = [
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        current_price: 1500,
        market_cap: 200000000000,
        price_change_percentage_24h: 2.5,
        total_volume: 100000000,
        low_24h: 10000,
        high_24h: 10000,
        market_cap_rank: 200000,
        market_cap_change_percentage_24h: 2000000,
        roi: 0
      },
    ];
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(mockResponse),
    });
  });

  await page.goto('http://localhost:5173');
  await page.waitForSelector('tbody tr', { state: 'visible' });
  await page.getByRole('button', { name: 'Details' }).click();
  await page.waitForURL(/\/coin\/ethereum/);
  await expect(page.getByRole('heading', { name: /ethereum/i })).toBeVisible();
});

test('Favorites navigation menu works and loads favorites page', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.getByRole('link', { name: /favoritos/i }).click();
  await expect(page).toHaveURL(/\/favorites/);
  await expect(page.getByRole('heading', { name: /favoritadas/i })).toBeVisible();
});