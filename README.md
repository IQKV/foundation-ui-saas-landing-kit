# SaaS Landing Kit 🚀

A modern, performant SaaS landing page kit built with Astro, React, Tailwind CSS, and shadcn/ui components. Features integrated authentication with a clean top navigation bar that adapts based on user login status.

## Features

- ⚡ **Lightning Fast** - Built with Astro for optimal performance
- 🔐 **Authentication Ready** - Integrated auth with login/logout functionality
- 📱 **Responsive** - Mobile-first design that works on all devices
- 🎯 **Type Safe** - Full TypeScript support
- 🔄 **React Islands** - Interactive components with partial hydration

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [React](https://react.dev/) - UI components
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

### Prerequisites

- Node.js >= 22.13.0
- pnpm >= 10.32.1

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── TopNav.tsx       # Main navigation with auth
│   └── UserMenu.tsx     # User dropdown menu
├── layouts/
│   └── BaseLayout.astro # Base page layout
├── lib/
│   ├── auth-store.ts    # Authentication state
│   └── utils.ts         # Utility functions
├── pages/
│   ├── index.astro      # Home page
│   ├── features.astro   # Features page
│   ├── pricing.astro    # Pricing page
│   └── about.astro      # About page
└── styles/
    └── globals.css      # Global styles
```

## Authentication

The kit includes a simple authentication integration:

- **Login/Sign Up Links** - Shown when user is not authenticated
- **User Menu** - Shown when user is authenticated with avatar and logout option
- **State Management** - Uses Zustand with localStorage persistence

To integrate with your auth service, update the auth URLs in `src/components/TopNav.tsx`.

## Customization

### Adding New Pages

Create a new `.astro` file in `src/pages/`:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
---

<BaseLayout title="New Page">
  <div class="container mx-auto px-4 py-16">
    <h1>New Page</h1>
  </div>
</BaseLayout>
```

### Styling

- Global styles: `src/styles/globals.css`
- Tailwind config: `tailwind.config.mjs`
- Component styles: Use Tailwind utility classes

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (includes type checking)
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:eslint` - Lint JavaScript/TypeScript/Astro files
- `pnpm lint:eslint:fix` - Fix ESLint issues automatically
- `pnpm formatter:check` - Check code formatting
- `pnpm formatter:write` - Format code with oxfmt

## Code Quality

The project includes comprehensive linting and formatting:

### ESLint

- Configured for TypeScript, React, and Astro
- React Hooks rules enabled
- Automatic fixing on save (in VS Code)

### Prettier

- Consistent code formatting
- Astro file support
- Runs on pre-commit via Husky

### Pre-commit Hooks

- Automatic linting and formatting via lint-staged
- Commit message validation via commitlint
- Branch name validation

## License

Apache-2.0

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for contribution guidelines.
