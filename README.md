# Questly

An Old School RuneScape companion built for your personal journey,

Questly keeps every skill, quest and diary in one parchment — a free, fan-made companion for Old School RuneScape.

Questly is a fan-made companion app and is not affiliated with Jagex.

## Installation

Clone and install the project using the following commands, assuming:

1. you're in your projects root folder
2. you're using `nvm` to manage node versions

```
git clone git@github.com:Khanfur/questly.git
cd questly
nvm use
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
While running a development server you can access the style guide at [http://localhost:3000/style-guide](http://localhost:3000/style-guide).

## Testing

Run unit/component tests with Jest:

```bash
npm test
```

Run end-to-end tests with Playwright (starts the dev server automatically):

```bash
npm run test:e2e
```

## Continuous Integration

Every push to `main` and every pull request targeting `main` triggers the `CI` workflow (`.github/workflows/ci.yml`), which runs the following steps in order:

1. **Checkout** — checks out the repository
2. **Setup Node.js** — installs the Node version from `.nvmrc` with npm caching
3. **Install dependencies** — `npm ci`
4. **Check formatting** — `npm run format:check`
5. **Run ESLint** — `npm run lint`
6. **Run tests** — `npm test -- --ci`
7. **Build** — `npm run build`

The `CI` check is a required status check on `main`, so pull requests cannot be merged until all of the above steps pass.

## Noteworthy packages

### Framework & Core

| Package      | Type          | Notes                                            | Link                            |
| ------------ | ------------- | ------------------------------------------------ | ------------------------------- |
| `next`       | dependency    | Next.js framework — SSR/SSG, routing, API routes | https://nextjs.org/             |
| `react`      | dependency    | Core React library (v19.2.8)                     | https://reactjs.org/            |
| `react-dom`  | dependency    | React DOM renderer (v19.2.8)                     | https://reactjs.org/            |
| `typescript` | devDependency | Type checking                                    | https://www.typescriptlang.org/ |

### UI Components / Primitives

| Package              | Type       | Notes                                     | Link                                 |
| -------------------- | ---------- | ----------------------------------------- | ------------------------------------ |
| `@base-ui/react`     | dependency | Unstyled, accessible component primitives | https://base-ui.com/                 |
| `shadcn`             | dependency | CLI for shadcn/ui component scaffolding   | https://shadcn.com/                  |
| `lucide-react`       | dependency | General-purpose icon set                  | https://lucide.dev/                  |
| `@dava96/osrs-icons` | dependency | Niche OSRS-themed icon set                | https://github.com/Dava96/osrs-icons |

### Styling

| Package                | Type          | Notes                                       | Link                                       |
| ---------------------- | ------------- | ------------------------------------------- | ------------------------------------------ |
| `tailwindcss`          | devDependency | Tailwind CSS v4                             | https://tailwindcss.com/                   |
| `@tailwindcss/postcss` | devDependency | Tailwind v4's PostCSS plugin                | https://tailwindcss.com/docs/using-postcss |
| `postcss`              | dependency    | PostCSS core                                | https://postcss.org/                       |
| `tw-animate-css`       | dependency    | Animation utilities for Tailwind            | https://github.com/benface/tw-animate-css  |
| `tailwind-merge`       | dependency    | Resolves conflicting Tailwind class strings | https://tailwind-merge.vercel.app/         |

### Dev Tooling

| Package              | Type          | Notes                       | Link                                          |
| -------------------- | ------------- | --------------------------- | --------------------------------------------- |
| `eslint`             | devDependency | Linting                     | https://eslint.org/                           |
| `eslint-config-next` | devDependency | Next.js-specific lint rules | https://nextjs.org/docs/basic-features/eslint |
| `prettier`           | devDependency | Code formatting             | https://prettier.io/                          |

### Testing

| Package      | Type          | Notes                                  | Link                      |
| ------------ | ------------- | -------------------------------------- | ------------------------- |
| `jest`       | devDependency | Unit/component testing                 | https://jestjs.io/        |
| `playwright` | devDependency | End-to-end browser testing (`e2e/`)    | https://playwright.dev/   |
| `storybook`  | devDependency | Component development & visual testing | https://storybook.js.org/ |
