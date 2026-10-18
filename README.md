# Foundation UI SaaS Landing Kit

Marketing and landing site for the iQ Key Value platform. Astro renders every page at build time; React islands handle the auth-aware top navigation, animated sections, and the pricing selector.

## About

This is the public marketing surface of the platform — separate from `foundation-ui-app` (the tenant app it links to) and `foundation-ui-platform-admin` (operator-only). It builds to plain static output (`output: "static"`) with no server and no SSR; the only dynamic behaviour is client-side React.

Authentication is shared with `foundation-ui-app` and read-only here. `AuthIsland` looks for the `iqkv_refresh_token` and `iqkv_tenant_key` keys that the app writes to `sessionStorage`, exchanges them at `POST /v1/iam/auth/refresh`, and populates the Zustand auth store from the returned JWT. `TopNav` then renders `UserMenu` instead of the Login / Sign Up links.

### Implemented today

| Area              | What it does                                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home**          | Animated hero, the six platform services, capability sections, CTAs into `foundation-ui-app`                                                       |
| **Platform**      | Service-by-service breakdown — IAM, Gateway, Billing, Audit, CMS, AI Chat                                                                          |
| **Pricing**       | Plan cards from the public plans endpoint (build-time fetch, hardcoded fallback), monthly/annual toggle, quota display, priority-support detection |
| **About**         | Mission, architecture and stack summary, platform links                                                                                            |
| **Legal**         | Terms of service, privacy policy, cookie policy, acceptable use policy                                                                             |
| **Top nav**       | Sticky and animated; auth-aware right side; DEMO badge; mobile dropdown; links to user documentation and `iqkv.dev`                                |
| **Auth**          | Silent sign-in from the shared session, user menu with initials, Dashboard / My Account links, sign-out that clears the shared keys                |
| **Cookie banner** | Shown on first visit; acceptance persisted in `localStorage` under `cookie_consent`                                                                |
| **Theming**       | DaisyUI `light` theme is the active one (`data-theme` on `<html>` and `<body>`); `light` and `dark` palettes are defined in `tailwind.config.mjs`  |
| **Animations**    | Framer Motion for the nav, hero and card transitions                                                                                               |

## Routes

| Path              | Access | Description                                         |
| ----------------- | ------ | --------------------------------------------------- |
| `/`               | Public | Home — hero, six services, capability sections, CTA |
| `/features`       | Public | Platform services detail                            |
| `/pricing`        | Public | Plan catalog with monthly/annual selector           |
| `/about`          | Public | Mission, architecture, links                        |
| `/terms`          | Public | Terms of service                                    |
| `/privacy`        | Public | Privacy policy                                      |
| `/cookies`        | Public | Cookie policy                                       |
| `/acceptable-use` | Public | Acceptable use policy                               |

Every route is a static file in `src/pages/` and shares `BaseLayout.astro`, which renders the head, `AuthIsland`, `TopNav`, the page slot, `Footer`, and the cookie banner.

## Feature status

| Feature                                              | Status                   |
| ---------------------------------------------------- | ------------------------ |
| Static pages (home, platform, pricing, about, legal) | Done                     |
| Auth-aware top nav                                   | Done                     |
| Silent sign-in from the shared session               | Done                     |
| Sign-out clearing the shared session keys            | Done                     |
| Build-time pricing fetch with fallback               | Done                     |
| Monthly / annual plan toggle                         | Done                     |
| Cookie consent banner                                | Done                     |
| Mobile navigation                                    | Done                     |
| Framer Motion animations                             | Done                     |
| Dark theme                                           | Defined (not switchable) |

## Authentication

The session contract is owned by `foundation-ui-app`. This site reads it and never writes it first:

| Key                  | Storage          | Written by          |
| -------------------- | ---------------- | ------------------- |
| `iqkv_refresh_token` | `sessionStorage` | `foundation-ui-app` |
| `iqkv_tenant_key`    | `sessionStorage` | `foundation-ui-app` |

Boot sequence (`src/components/AuthIsland.tsx`):

1. `AuthIsland` mounts first in `BaseLayout.astro` (`client:only="react"`) so the store is populated before `TopNav` reads `isAuthenticated` / `isLoading`.
2. Reads both keys. If either is missing, it marks loading as done and the nav shows Login / Sign Up.
3. Calls `POST {PUBLIC_API_URL}/v1/iam/auth/refresh` with `X-Tenant-ID: <tenant key>`.
4. Writes the rotated `refreshToken` and `tenantKey` back to `sessionStorage` so `foundation-ui-app` also benefits.
5. Decodes the JWT (`src/lib/jwt.ts` — no signature verification, the API gateway verifies), confirms it is a tenant session and still fresh, then populates the store from the payload (`userId`, `email`, `firstName`, `lastName`, `tenant_id`, `authorities`).
6. On a failed refresh, invalid token, or network error, it clears the shared keys and the nav falls back to logged-out.

The access token lives in the Zustand store in memory only — never persisted. `logout()` clears both `sessionStorage` keys, so the main app also considers the user signed out on its next visit.

Login, Sign Up and Dashboard links are built from `PUBLIC_APP_URL` (`/sign-in`, `/signup`, `/account`).

## Pricing data

`src/pages/pricing.astro` fetches `{PUBLIC_API_URL}/v1/billing/internal/plans/public` at build time. If `PUBLIC_API_URL` is unset or the request fails, the page falls back to hardcoded plans and the build continues with a warning.

`PlanSelector` (`client:load`) then renders the monthly/annual toggle and, per plan, `maxUsers` / `maxProjects` (`0` = unlimited) plus the `priority_support` entry from the open feature map. Prices are baked into the static output at build time — rebuild to refresh them.

## Tech stack

- Astro 7 (static output), React 19 islands
- Tailwind CSS 3 + DaisyUI 5 (`light` / `dark` palettes, `btn` / `navbar` / `card` / `badge` classes first)
- Zustand 5 (auth store), Framer Motion, HugeIcons
- TypeScript 6 strict
- ESLint 10 (`eslint-plugin-astro`, React hooks), OxLint, OxFmt
- Husky + lint-staged, commitlint (Conventional Commits), release-it

Pages are always `.astro`; React is used only where interactivity requires it, and static content stays in `.astro` components. See [AGENTS.md](AGENTS.md) for the full architecture rules.

## Prerequisites

- Node.js 22.13.0+
- pnpm 10.33.2 (`packageManager` in `package.json`)

## Quick start

```bash
git clone https://github.com/IQKV/foundation-ui-saas-landing-kit.git
cd foundation-ui-saas-landing-kit

pnpm install

cp .env.example .env.local
# Optional: point PUBLIC_APP_URL / PUBLIC_API_URL at your own deployment

pnpm dev
# → http://localhost:4321
```

## Environment variables

| Variable           | Default (`.env.example`)    | Description                                                    |
| ------------------ | --------------------------- | -------------------------------------------------------------- |
| `PUBLIC_APP_URL`   | `https://app.iqkv.site`     | `foundation-ui-app` base URL — Login, Sign Up, Dashboard links |
| `PUBLIC_API_URL`   | `https://api.iqkv.site/api` | API gateway base URL — auth refresh and the public plans fetch |
| `PUBLIC_SITE_NAME` | `iQ Key Value`              | Site name                                                      |
| `PUBLIC_SITE_URL`  | `https://www.iqkv.site`     | Canonical site URL                                             |

Components read these with `import.meta.env.PUBLIC_*` and a hardcoded fallback. All `PUBLIC_*` values are inlined into the static output — never put secrets in them.

## Scripts

```bash
# Development
pnpm dev                 # Astro dev server (http://localhost:4321)
pnpm preview             # Preview the production build

# Build
pnpm build               # astro check + static build to dist/

# Quality
pnpm lint                # ESLint (Astro, React, hooks)
pnpm lint:eslint:fix     # ESLint --fix
pnpm formatter:check     # OxFmt check
pnpm formatter:write     # OxFmt write

# Release
pnpm release             # release-it, conventional changelog
```

## Project structure

```
src/
├── components/        # React islands (TopNav, AuthIsland, PlanSelector, …) and Astro parts (Footer)
├── layouts/           # BaseLayout.astro — head, nav, footer, cookie banner
├── lib/               # auth-store.ts (Zustand), jwt.ts (decode + validation)
├── pages/             # Astro file-based routes (static output)
└── styles/            # globals.css — Tailwind entry point
```

## Relationship to foundation-ui-app

|            | `foundation-ui-saas-landing-kit`       | `foundation-ui-app`                   |
| ---------- | -------------------------------------- | ------------------------------------- |
| Audience   | Prospects and visitors                 | Signed-in tenant members              |
| Output     | Static HTML built by Astro             | SPA built by Vite                     |
| Session    | Reads the shared `sessionStorage` keys | Owns and writes them                  |
| Auth calls | `POST /v1/iam/auth/refresh` only       | Full IAM flow (sign-in, sign-up, …)   |
| Sign-out   | Clears both shared keys                | Clears the session and calls sign-out |
| Deployment | Public marketing site                  | Public application                    |

## Documentation

- [Architecture](./docs/architecture/README.md)
- [Deployment](./docs/deployment/README.md) · [Node.js guide](./docs/deployment/node.md)
- [API notes](./docs/api/README.md)
- [Agent / project guide](./AGENTS.md)
- [Commit convention](./.github/COMMIT_CONVENTION.md)

## License

Apache License — see [LICENSE](LICENSE).

## Contributing

See [Contributing Guidelines](.github/CONTRIBUTING.md) and [Code of Conduct](.github/CODE_OF_CONDUCT.md).
