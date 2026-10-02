# AI Agent Development Guide

## Project Overview

**iQ Foundation SaaS Landing Kit** — A static marketing and landing site for the iQ Key Value platform. Built with Astro (static output), React islands, Tailwind CSS, and DaisyUI. Shares the auth session with `foundation-ui-app` via `sessionStorage`.

**Key characteristics:**

- Static site generation — all pages are `.astro` files, output is plain HTML
- React islands for interactive components (`client:only`, `client:load`)
- Tailwind CSS + DaisyUI for styling — no custom CSS framework
- Shared auth session: reads `iqkv_refresh_token` + `iqkv_tenant_key` from sessionStorage (written by `foundation-ui-app`)
- No backend, no SSR — all dynamic behavior is client-side React
- ESLint (with `eslint-plugin-astro`) + OxFmt — linting and formatting enforced in pre-commit

## Tech Stack

### Core

- **Astro 7** — static site generator; pages live in `src/pages/` as `.astro` files
- **React 19** — used only for interactive islands (`src/components/*.tsx`)
- **TypeScript 6** — strict type safety across `.astro` and `.tsx` files
- **PNPM 10.33.2** — required package manager

### UI & Styling

- **Tailwind CSS v3** — utility-first styling
- **DaisyUI v5** — Tailwind component library; use DaisyUI classes (`btn`, `navbar`, `badge`, etc.) before writing custom Tailwind utilities
- **Framer Motion** — animation for React components (`motion.div`, `motion.a`)
- **HugeIcons** — icon set (`@hugeicons/react`)

### State & Auth

- **Zustand v5** — auth state only (`src/lib/auth-store.ts`); no other client state stores exist
- **AuthIsland** (`src/components/AuthIsland.tsx`) — bootstraps auth on every page load; must be rendered before `TopNav` in `BaseLayout.astro`
- **JWT utilities** (`src/lib/jwt.ts`) — `decodeJwt`, `isTenantSession`, `isTokenFresh`; no signature verification (handled by the API gateway)

### Development & Quality

- **ESLint 10** — with `eslint-plugin-astro`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- **OxFmt** — formatting enforced in pre-commit on all `.js`, `.jsx`, `.ts`, `.tsx`, `.astro`, `.css`, `.json`, `.md` files
- **OxLint** — type-aware linting on staged `.js`, `.jsx`, `.ts`, `.tsx`, `.astro` files
- **Commitlint** — conventional commits via `cz-conventional-changelog`
- **Husky + lint-staged** — pre-commit runs `oxlint`, `oxfmt`, and `sort-package-json`

## Project Structure

```
src/
├── components/        # React islands and Astro components
│   ├── AnimatedCard.tsx
│   ├── AnimatedHero.tsx
│   ├── AnimatedSection.tsx
│   ├── AuthIsland.tsx     # Auth bootstrap island — render before TopNav
│   ├── FeatureCard.tsx
│   ├── Footer.astro
│   ├── Icon.tsx
│   ├── IconBox.tsx
│   ├── PlanSelector.tsx
│   ├── TopNav.tsx         # Reads auth store; shows UserMenu or Login/Sign Up
│   └── UserMenu.tsx
├── layouts/
│   └── BaseLayout.astro   # Root layout: AuthIsland → TopNav → slot → Footer
├── lib/
│   ├── auth-store.ts      # Zustand auth store (user, accessToken, isLoading)
│   └── jwt.ts             # JWT decode utilities
├── pages/                 # Astro file-based routes (static output)
│   ├── index.astro
│   ├── features.astro
│   ├── pricing.astro
│   ├── about.astro
│   ├── terms.astro
│   ├── privacy.astro
│   ├── cookies.astro
│   └── acceptable-use.astro
└── styles/
    └── globals.css        # Tailwind base import
```

## Architecture Rules

### Astro vs React split

- **Pages** (`src/pages/`) are always `.astro` — no React pages.
- **Static content** (headers, footers, layout, legal text) belongs in `.astro` components.
- **Interactive UI** (nav with auth state, animated sections, pricing selector) belongs in `.tsx` React components rendered as islands.
- Use `client:only="react"` for components that must not SSR (anything reading `sessionStorage` or browser APIs). Use `client:load` for components that can hydrate normally.

### Auth session

- The auth session is owned by `foundation-ui-app`. This project reads it; it never writes it first.
- Session keys: `iqkv_refresh_token`, `iqkv_tenant_key` (in `sessionStorage`).
- `AuthIsland` is the only place that calls the IAM refresh endpoint (`POST /v1/iam/auth/refresh`).
- After a successful refresh, both the new `refreshToken` and `tenantKey` are written back to `sessionStorage` so `foundation-ui-app` also benefits.
- Access token is kept in memory only (Zustand store) — never persisted.
- `logout()` in the auth store clears both sessionStorage keys so the main app also considers the user signed out.

### Routing

- File-based static routing via Astro. File name = URL path (e.g., `pricing.astro` → `/pricing`).
- No dynamic routes (`[slug].astro`) currently exist. Add them only when genuinely needed.
- All pages use `BaseLayout.astro` for consistent head, nav, footer, and cookie banner.

### Styling

- DaisyUI component classes first (`btn`, `navbar`, `badge`, `skeleton`, `menu`, `dropdown`, `card`).
- Tailwind utilities for layout and spacing adjustments.
- Do not add new CSS files. `globals.css` is the only stylesheet entry point.
- Theme is `data-theme="light"` set on `<html>` and `<body>` in `BaseLayout.astro`.

### Environment variables

All env vars are public (no server secrets). Prefix: `PUBLIC_`.

```env
PUBLIC_APP_URL=https://app.iqkv.site      # foundation-ui-app URL (Login / Sign Up links)
PUBLIC_API_URL=https://api.iqkv.site/api  # API gateway (auth refresh, pricing endpoint)
PUBLIC_SITE_NAME=iQ Key Value
PUBLIC_SITE_URL=https://www.iqkv.site
```

Access in components: `import.meta.env.PUBLIC_*` with a hardcoded fallback for missing values.

## Execution Discipline

- Root cause first. Fix the real entry point, not a bypass around it.
- Read the relevant files before editing. Do not assume current state.
- After two identical failures without new evidence, change approach — do not retry blindly.
- Check prerequisites early (`astro check`, `tsc --noEmit`). Parallelize independent work.
- Behavior proven and required gates green: finish. No speculative scope growth.

## Security

- Keep credentials and tokens out of commits, logs, and shared text.
- `PUBLIC_*` env vars are embedded in the built static output — never put secrets in them.
- Access token stays in Zustand memory only. Never write it to `localStorage` or `sessionStorage`.
- Do not add new `sessionStorage` keys beyond `iqkv_refresh_token` and `iqkv_tenant_key` — these are a contract shared with `foundation-ui-app`.
- Flag unusual package names before installing. Use exact or pinned versions.

## AI Agent Development Guidelines

### Code generation principles

1. **Astro-first**: prefer `.astro` for new content; reach for React only when interactivity requires it
2. **DaisyUI-first**: use existing DaisyUI component classes before writing custom Tailwind utilities
3. **Type-first**: define TypeScript interfaces before implementation
4. **Auth contract**: never break the `AuthIsland` → Zustand → `TopNav` flow; `AuthIsland` must always mount before `TopNav`
5. **No new state stores**: the single Zustand store in `src/lib/auth-store.ts` covers auth; add to it rather than creating parallel stores

### Communication & output standards

- Be direct. No lengthy preambles.
- Avoid: "I'll now proceed to...", "Let me...", "I'm going to..."
- Summaries: 2–3 sentences maximum after task completion.
- Never automatically create `SUMMARY.md`, `REVIEW.md`, `CHANGES.md`, or similar files.

### Approval workflow (MANDATORY)

**Ask before applying.** For any file creation, modification, or deletion:

```
1. ANALYZE  → understand the request
2. PRESENT  → describe changes, show key code snippets, list affected files
3. WAIT     → stop and wait for explicit approval
4. APPLY    → only after approval
5. VERIFY   → run quality gates, report concisely
```

**Approval phrases:** "Yes", "Proceed", "Apply", "Do it", "Go ahead", "Looks good"

Operations NOT requiring approval: reading files, searching code, explaining concepts, running type checks.

### When presenting changes

```markdown
## Proposed Changes

**Goal**: one sentence

**Files**:
- `src/components/Foo.tsx` — new island for X
- `src/pages/bar.astro` — add Foo island

**Key changes**:
- brief bullet 1
- brief bullet 2

Proceed?
```

## Commit Standards

Format: `type(scope): subject`

- Subject: imperative, lowercase, no trailing period, ≤ 72 chars
- Types: `feat`, `fix`, `improvement`, `enhancement`, `refactor`, `docs`, `style`, `chore`, `perf`, `ci`, `build`, `revert`
- Scope: affected area (e.g., `nav`, `auth`, `pricing`, `layout`, `deps`)
- For `fix`: describe the symptom and trigger, not the code change
  - ✅ `fix(nav): login button missing when auth check times out`
  - ❌ `fix(nav): add loading guard to TopNav render`

Examples:
- `feat(pricing): add monthly/annual toggle to plan selector`
- `fix(auth): logout clears stale session after token expiry`
- `chore(deps): update astro to v7.3.5`
- `style(nav): align dropdown shadow with DaisyUI base theme`

## Development Scripts

```bash
# Development
pnpm dev              # Start dev server (http://localhost:4321)
pnpm build            # Type-check + build static output to dist/
pnpm preview          # Preview production build

# Code quality
pnpm lint             # Run ESLint
pnpm lint:eslint:fix  # Fix ESLint issues
pnpm formatter:check  # Check formatting with OxFmt
pnpm formatter:write  # Format with OxFmt

# Release
pnpm release          # Create release with release-it
```

## Verification After Changes

Run before presenting a result:

```bash
pnpm formatter:check  # formatting
pnpm lint             # ESLint
pnpm build            # astro check + build (catches type errors and broken imports)
```

Report results in 2–3 sentences. Generate a commit message for multi-file changes.
