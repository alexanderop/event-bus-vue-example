# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Vitesse** (Vue 3 + Vite) starter template - an opinionated setup focused on fast development with modern tooling. It uses file-based routing, auto-imports, SSG (Static Site Generation), and TypeScript.

## Development Commands

```bash
# Development server (runs on http://localhost:3333)
pnpm dev

# Build for production (generates static site via vite-ssg)
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Unit tests (Vitest)
pnpm test:unit

# E2E tests (Cypress)
pnpm test:e2e

# Run single test file
pnpm test basic.test.ts
```

## Architecture

### Module System

The app uses a custom **UserModule** system (`src/types.ts`). All `.ts` files in `src/modules/` are auto-loaded at startup via `src/main.ts`. Each module exports an `install` function:

```ts
import type { UserModule } from '~/types'

export const install: UserModule = ({ app, router, isClient }) => {
  // setup code
}
```

Core modules: `i18n.ts`, `pinia.ts`, `nprogress.ts`, `pwa.ts`

### File-Based Routing

- Routes auto-generated from `src/pages/` via `unplugin-vue-router`
- `.vue` and `.md` files become routes
- Dynamic routes: `[param].vue` syntax
- Type-safe routes via `src/typed-router.d.ts`

### Auto-Imports

- Vue Composition API, VueUse, Vue Router composables auto-imported
- Components from `src/components/` auto-registered
- Composables from `src/composables/` auto-imported
- Pinia stores from `src/stores/` auto-imported
- Type definitions: `src/auto-imports.d.ts`, `src/components.d.ts`

### Layouts

- Layout system via `vite-plugin-vue-layouts`
- Layouts in `src/layouts/` (default, home, 404)
- Specify layout in page frontmatter or via route meta

### Path Alias

`~/` maps to `src/` directory (configured in `vite.config.ts`)

### SSG (Static Site Generation)

Built with `vite-ssg` - generates static HTML at build time. The `createApp` export in `src/main.ts` is the entry point.

## Styling

- **UnoCSS** for atomic CSS (configured in `uno.config.ts`)
- Icons via UnoCSS preset-icons (e.g., `<div class="i-carbon-sun" />`)
- Tailwind reset included

## Testing

- **Vitest** for unit tests (`test/**/*.test.ts`)
- **Cypress** for E2E tests (`cypress/e2e/**/*.spec.ts`)
- Test environment: jsdom

## Code Style

- `<script setup>` syntax
- ESLint with @antfu/eslint-config (single quotes, no semicolons)
- Pre-commit hook runs `pnpm lint-staged`
