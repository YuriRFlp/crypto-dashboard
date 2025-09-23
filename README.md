
# Crypto Dashboard

An interactive cryptocurrency dashboard built with Vue 3, TypeScript, Vite, Pinia, Element Plus, and Tailwind CSS. It displays real-time market data, charts, and allows users to search, view details, and favorite coins. Data is fetched from the CoinGecko API.

## Features
- Home page with searchable, paginated coin table
- Favorites page for tracking favorite coins
- Details page with price, market cap, and historical chart
- Responsive design (mobile & desktop)
- State management with Pinia
- API integration with CoinGecko
- Unit tests (Vitest, @testing-library/vue)
- E2E tests (Playwright)

## Project Structure
- `src/components/` — UI components (CoinTable, CoinChart, HeaderBar, SearchBar)
- `src/pages/` — Main pages (Home, Favorites, Details)
- `src/store/` — Pinia store for coins and favorites
- `src/services/` — CoinGecko API service
- `src/interfaces/` — TypeScript interfaces
- `tests/unit/` — Unit tests for components
- `tests/e2e/` — E2E tests (Playwright)

## Getting Started

### Prerequisites
- Node.js >= 18

### Install dependencies
```sh
npm install
```

### Run the development server
```sh
npm run dev
```
App will be available at http://localhost:5173

### Build for production
```sh
npm run build
```

### Preview production build
```sh
npm run preview
```

## Testing

### Run all tests (unit + E2E)
```sh
npm run tests
```
This runs both unit tests (Vitest, @testing-library/vue) and E2E tests (Playwright).
Unit tests are in `tests/unit/`, E2E tests are in `tests/e2e/`. (Add test suites to those files to enable.)

## API & Data
- Uses CoinGecko public API for coin data and historical prices
- See `src/services/coinGeckoService.ts` for API logic

## Customization
- Styling: Tailwind CSS (`src/style.css`, `tailwind.config.cjs`)
- UI: Element Plus components
- State: Pinia store (`src/store/coinStore.ts`)

## License
MIT
