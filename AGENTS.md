# AGENTS.md — portfolio-glow-up-57

## Stack
React 18 + TypeScr  ipt + Vite 7 + Tailwind CSS 3 + shadcn/ui + React Router 6 + TanStack React Query 5 + Supabase + Vitest + motion (framer-motion v12) + Zod + react-hook-form.

## Commands
```sh
npm run dev          # dev server on :8080
npm run build        # production build
npm run build:dev    # dev-mode build
npm run preview      # preview production build
npm run lint         # ESLint (flat config, eslint.config.js)
npm run test         # vitest run
npm run test:watch   # vitest watch
```

## Path alias
`@/` → `./src/` (configured in Vite resolve.alias + tsconfig paths).

## Architecture
- **Entry**: `src/main.tsx` → `App.tsx` (providers: QueryClient, TooltipProvider, BrowserRouter).
- **Layout**: `MainLayout` (Navbar + Footer + WhatsAppFloat) — used by all category pages.
- **Routes**: `/` (Index), `/trabajos/:slug` for 5 categories, `*` → NotFound.
- **Category pages**: thin wrappers (`Bodas.tsx`, etc.) that call `<CategoryPage category={getCategory("bodas")!} />`.
- **Data**: Static TypeScript arrays in `src/data/`, images served from Supabase Storage. Photos live in `portfolio-photos` bucket.

## shadcn/ui
- components.json: `components: "@/components"`, `utils: "@/lib/utils"`, `ui: "@/components/ui"`.
- Add new components with `npx shadcn@latest add <name>`.
- All Radix primitives are already installed (accordion, dialog, dropdown-menu, etc.).

## Testing
- Vitest + jsdom + @testing-library/react.
- Setup: `src/test/setup.ts` (imports jest-dom, mocks matchMedia).
- Test files: `src/**/*.{test,spec}.{ts,tsx}`.

## Supabase
- Client: `src/integrations/supabase/client.ts` — **auto-generated, do not edit**.
- Env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (in `.env`, gitignored).
- Types: `src/integrations/supabase/types.ts` (auto-generated).
- Migrations: `supabase/migrations/`.

## Quirks & conventions
- **CSS**: All colors are HSL tokens in `src/index.css`. No ad-hoc color values in components.
- **TypeScript**: very loose — `strict: false`, `noImplicitAny: false`, `strictNullChecks: false`. Unused locals/vars do not error.
- **ESLint**: `@typescript-eslint/no-unused-vars: off`, `react-refresh/only-export-components: warn`.
- **Fonts**: Cormorant Garamond (display, serif) via `.font-display` class and `h1`–`h4`; Inter (body, sans-serif) on `body`.
- **Animations**: `motion/react` (framer-motion v12). Reusable `ScrollReveal` component with presets.
- **Images**: Gallery pages preload first 3 images on mount. `imageOptimization.ts` for preloading & Supabase URL helpers.
