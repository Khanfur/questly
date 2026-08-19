@AGENTS.md

# Project context

Questly is a fan-made Old School RuneScape (OSRS) companion web app (Next.js 16, App Router, React 19,
TypeScript). It is not affiliated with Jagex. See `README.md` for install/dev/test commands and the
noteworthy-packages table.

## Structure

- `app/` — Next.js App Router pages. `app/page.tsx` is the home page — it renders the fixture skill
  list/quests/stats but overlays real values from `useAccountDetails()`'s `hiscores` when present
  (skill levels, `Total Level`, and a computed `Combat Level` via `calculateCombatLevel`), showing a
  skeleton (`loading` prop on `SkillCard`/`StatCard`) until `hiscoresHydrated` is `true` to avoid
  flashing placeholder data. `app/quests/` is the Quest Log page and `app/quests/diaries/` is the
  Achievement Diaries page — both are currently static (fixture-driven, no filtering wired up yet)
  and share the `PageHero`/`ViewToggle` layout. `app/style-guide/` hosts the internal component style
  guide (visit `/style-guide` while `npm run dev` is running).
- `components/layout/` — structural chrome: `container`, `header` (incl. a settings drawer, see
  `useSettingsDrawer`), `footer`.
- `components/theme/` — dark/light theme provider + toggle (`next-themes`).
- `components/ui/` — feature/presentational components, one folder per component
  (e.g. `ask-the-sage`, `chat-head`, `quest-progress`, `skill-card`, `stat-card`, `section-window`,
  `page-hero`, `view-toggle`, `filter-pill-group`, `quest-difficulty-badge`, `quest-list-item`
  (incl. `quest-status-icon`), `quest-tier-group`, `diary-tier-card`, `diary-region-card`).
  `components/ui/shadcn/` holds shadcn/ui-generated primitives (`button`, etc.) — prefer composing
  these rather than hand-rolling new primitives.
- `lib/utils.ts` — shared helpers, notably `cn()` (clsx + tailwind-merge) for conditional class
  names, and `isLocalhost()`.
- `lib/hooks/` — reusable client-side hooks:
  - `useLocalStorage` — generic, JSON-serialized, SSR-safe state synced to `window.localStorage`.
    Returns `[value, setValue, isHydrated]`. The initial read happens in a layout effect (before
    paint) to avoid a same-render flash, and `isHydrated` lets callers show a loading/skeleton state
    until it's `true` — pages using it are commonly prerendered/static, so the very first paint
    (before hydration) still shows `defaultValue`. Writes also broadcast a custom
    `questly:local-storage-change` window event (in addition to the native cross-tab `storage`
    event) so multiple components reading the _same_ key in the _same_ tab stay in sync — e.g. the
    header's account-details form and the home page both read the `questly:hiscores` key
    independently. That side effect is dispatched outside the `setState` call (not from within a
    `setState` updater) to avoid React's "Cannot update a component while rendering a different
    component" warning.
  - `useAccountDetails` — persists the user's OSRS account details (username, membership, account
    type) and fetched `hiscores` via `useLocalStorage`, exposing `hiscoresHydrated` alongside
    `hiscores`.
- `lib/types/` — shared TypeScript types and interfaces. Organized by domain: `skill.ts`, `quest.ts`,
  `diary.ts`, `sage.ts`, `hiscores.ts`, `activity.ts`, `osrs-hiscores.ts`, `account.ts`, etc.
- `lib/fixtures/` — dummy data for development and Storybook. Organized by domain: `skills.ts`,
  `quests.ts`, `quest-log.ts`, `diary-regions.ts`, `sage-suggestions.ts`, `skill-names.ts`,
  `activity-names.ts`, etc.
- `lib/integrations/` — external service integration code, one folder per service, each split into
  `client.ts` (fetch logic), per-feature files (e.g. `hook.ts`/`search.ts`/`summary.ts`/`quests.ts`)
  exposing a `fetchX`/`useX` pair, and an `index.ts` barrel re-exporting the public API + types:
  - `osrs-hiscores/` — OSRS Hiscores (Lite) CSV endpoint; `fetchHiscores`/`useHiscores`, plus
    `calculateCombatLevel(skills)` (`combat-level.ts`) implementing the official
    [combat level formula](https://oldschool.runescape.wiki/w/Combat_level).
  - `osrs-wiki/` — OSRS Wiki (MediaWiki) API; `searchWiki`/`useWikiSearch`,
    `fetchWikiPageSummary`/`useWikiPage`, `fetchQuestList`/`useQuestList`.
    Both integrations default to routing through same-origin proxy routes under `app/api/` (to dodge
    CORS/User-Agent restrictions) but accept a `baseUrl` override for testing or self-hosted proxies.
- `e2e/` — Playwright end-to-end specs (`home.spec.ts`, `navigation.spec.ts`, `style-guide.spec.ts`).
  `style-guide.spec.ts` asserts every documented style-guide section renders — add a new section
  title to its `sectionTitles` list whenever a component is added to the style guide.
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
- Components that render data which may briefly be unknown on mount (e.g. hiscores-derived values)
  accept a `loading?: boolean` prop and render a `bg-muted animate-pulse` skeleton in place of the
  real content — see `SkillCard` and `StatCard`.
- New reusable `components/ui/` components should be showcased in `app/style-guide/page.tsx` (wrap
  each in a `<Section title="...">`) and the section title added to `sectionTitles` in
  `e2e/style-guide.spec.ts` so the "renders every documented section" test stays accurate.

## Commands

- `npm run dev` — start dev server (http://localhost:3000, style guide at `/style-guide`).
- `npm test` / `npm run test:watch` — Jest unit/component tests.
- `npm run test:e2e` / `npm run test:e2e:ui` — Playwright e2e tests.
- `npm run lint` — ESLint. `npm run format` / `format:check` — Prettier.
- `npm run storybook` / `build-storybook` — Storybook dev server / static build.
- `npm run build` — production build.

CI (`.github/workflows/ci.yml`) runs format check → lint → test → build on every push/PR to
`master`; match that order locally before pushing.
