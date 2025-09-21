# Copilot Instructions for AI Agents

## Project Overview
- This is a Vue 3 + TypeScript + Vite project for a cryptocurrency dashboard.
- Uses Vue Single File Components (`.vue`) with `<script setup>` syntax.
- Main app entry: `src/main.ts`, root component: `src/App.vue`.
- Pages are in `src/pages/`, layouts in `src/layouts/`, and reusable components in `src/components/`.
- State management is handled via Pinia stores (see `src/store/coinStore.ts`).
- API/data logic is in `src/services/`.
- TypeScript interfaces are in `src/interfaces/`.
- Routing is managed in `src/router/index.ts`.

## Developer Workflows
- **Start dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`
- **Run all tests:** `npm test` (uses Playwright for e2e and Vitest for unit tests)
- **Test locations:**
  - Unit: `tests/unit/`
  - E2E: `tests/e2e/`

## Project Conventions
- Use `<script setup lang="ts">` in all Vue SFCs.
- Use Pinia for state (avoid Vuex).
- Use composables for shared logic (if needed, place in `src/composables/`).
- Use Tailwind CSS for styling (`src/style.css`, `tailwind.config.cjs`).
- Prefer named exports for services and stores.
- Use TypeScript types for all API/service data.
- Place assets in `src/assets/` or `public/` as appropriate.

## Integration & Patterns
- API calls and data fetching logic should go in `src/services/`.
- State shared across components should be managed in Pinia stores.
- Use the layout system (`src/layouts/`) for page-level wrappers.
- Route definitions and navigation guards are in `src/router/index.ts`.
- Use `src/interfaces/` for all shared types/interfaces.

## Examples
- See `src/components/CoinTable.vue` for a typical data table pattern.
- See `src/pages/Details.vue` for a page-level component using store and service.
- See `src/store/coinStore.ts` for Pinia usage.

## External Dependencies
- Vue 3, Vite, TypeScript, Pinia, Playwright, Vitest, Tailwind CSS.

---
For more, see `README.md` and config files in the project root.
