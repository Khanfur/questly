@AGENTS.md

# Project context

Questly is a fan-made Old School RuneScape (OSRS) companion web app (Next.js 16, App Router, React 19,
TypeScript). It is not affiliated with Jagex. See `README.md` for install/dev/test commands and the
noteworthy-packages table.

## Structure

- `app/` — Next.js App Router pages. `app/page.tsx` is the home page; `app/style-guide/` hosts the
  internal component style guide (visit `/style-guide` while `npm run dev` is running).
- `components/layout/` — structural chrome: `container`, `header` (incl. a settings drawer, see
  `useSettingsDrawer`), `footer`.
- `components/theme/` — dark/light theme provider + toggle (`next-themes`).
- `components/ui/` — feature/presentational components, one folder per component
  (e.g. `ask-the-sage`, `chat-head`, `quest-progress`, `skill-card`, `stat-card`, `section-window`).
  `components/ui/shadcn/` holds shadcn/ui-generated primitives (`button`, etc.) — prefer composing
  these rather than hand-rolling new primitives.
- `lib/utils.ts` — shared helpers, notably `cn()` (clsx + tailwind-merge) for conditional class
  names, and `isLocalhost()`.
- `lib/integrations/` — external service integration code.
- `e2e/` — Playwright end-to-end specs (`home.spec.ts`, `navigation.spec.ts`, `style-guide.spec.ts`).
- `proxy.ts` — request proxy/middleware-adjacent logic (uses `isLocalhost`).

## Conventions

- Components are colocated by feature under `components/ui/<name>/<name>.tsx`, generally paired with
  a `.stories.tsx` (Storybook) and/or test file in the same folder.
- Styling is Tailwind CSS v4 (via `@tailwindcss/postcss`), merged with `cn()` from `lib/utils.ts`
  rather than manual string concatenation.
- OSRS-themed icons come from `@dava96/osrs-icons`; general icons from `lucide-react`.
- Imports are auto-sorted by `@trivago/prettier-plugin-sort-imports` — run `npm run format` rather
  than reordering imports by hand.
- Path alias `@/*` maps to the repo root (see `tsconfig.json`), e.g. `@/components/...`, `@/lib/...`.

## Commands

- `npm run dev` — start dev server (http://localhost:3000, style guide at `/style-guide`).
- `npm test` / `npm run test:watch` — Jest unit/component tests.
- `npm run test:e2e` / `npm run test:e2e:ui` — Playwright e2e tests.
- `npm run lint` — ESLint. `npm run format` / `format:check` — Prettier.
- `npm run storybook` / `build-storybook` — Storybook dev server / static build.
- `npm run build` — production build.

CI (`.github/workflows/ci.yml`) runs format check → lint → test → build on every push/PR to
`master`; match that order locally before pushing.

