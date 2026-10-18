# Project Name

<!-- TEMPLATE: Replace the title above. Remove this comment block when done. -->

<details>
  <summary><strong>How to use this template (click to expand)</strong></summary>

1. Replace the title with your site name.
2. Update the short description below.
3. Add CI/license badges after the title.
4. Fill in each section with real content; remove placeholder text.
5. Delete this guidance block when finished.

</details>

Short description of what this site does and who it is for.

<!-- Badge examples (optional):
![CI](https://img.shields.io/github/actions/workflow/status/ORG/REPO/build-nodejs-project.yml?label=CI)
![License](https://img.shields.io/github/license/ORG/REPO)
-->

## About

Describe the purpose of the site, the platform surface it covers, and how visitors reach the product.

## Feature Status

| Feature | Status | Notes |
| ------- | ------ | ----- |
|         |        |       |

## Tech Stack

- Astro 7 (static output) · React 19 islands
- Tailwind CSS 3 · DaisyUI 5
- Zustand 5 · Framer Motion · HugeIcons
- TypeScript 6 · ESLint 10 · OxLint · OxFmt

Pages are always `.astro`; interactivity is added per React island (`client:only`, `client:load`). See [AGENTS.md](AGENTS.md).

## Prerequisites

- Node.js `>=22.13.0`
- pnpm `10.33.2`

## Quick Start

```bash
git clone https://github.com/IQKV/<repo>.git
cd <repo>

pnpm install

cp .env.example .env.local
# Edit .env.local — set PUBLIC_APP_URL and PUBLIC_API_URL

pnpm dev
# → http://localhost:4321
```

## Environment Variables

| Variable           | Default (`.env.example`) | Description                                      |
| ------------------ | ------------------------ | ------------------------------------------------ |
| `PUBLIC_APP_URL`   |                          | Base URL of the main app (Login / Sign Up links) |
| `PUBLIC_API_URL`   |                          | API gateway base URL (auth refresh, plans)       |
| `PUBLIC_SITE_NAME` |                          | Site name                                        |
| `PUBLIC_SITE_URL`  |                          | Canonical site URL                               |

All `PUBLIC_*` values are inlined into the static output — never put secrets here.

## Scripts

```bash
pnpm dev                 # Astro dev server (http://localhost:4321)
pnpm build               # astro check + static build to dist/
pnpm preview             # Preview the production build
pnpm lint                # ESLint
pnpm formatter:check     # OxFmt check
pnpm formatter:write     # OxFmt write
```

## Project Structure

```
src/
├── components/        # React islands and Astro components
├── layouts/           # BaseLayout.astro — head, nav, footer
├── lib/               # Auth store, JWT utilities
├── pages/             # Astro file-based routes (static output)
└── styles/            # globals.css — Tailwind entry point
```

## Deployment

`pnpm build` emits a fully static site to `dist/`. Serve it from any static host, or from the provided `Dockerfile` (nginx), which copies `dist/` into the image and needs no Node.js runtime.

## Documentation

- [Architecture](./docs/architecture/README.md)
- [Deployment](./docs/deployment/README.md)
- [API notes](./docs/api/README.md)
- [Agent / project guide](./AGENTS.md)

## License

Apache License — see [LICENSE](LICENSE).

## Contributing

See [Contributing Guidelines](.github/CONTRIBUTING.md) and [Code of Conduct](.github/CODE_OF_CONDUCT.md).

---

<details>
  <summary><strong>Pre-publish checklist (remove before merging)</strong></summary>

- [ ] Title and description updated
- [ ] Badges added
- [ ] Feature Status table populated
- [ ] Environment variables documented
- [ ] Pages and project structure reflect the actual site
- [ ] Links verified

</details>
