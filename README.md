# Kanban Next

A single-page Kanban board for one person to capture tasks and move them through five columns. It is a learning project for exploring agent-generated code, not a production app.

- **What it does:** [`MVP-SPEC.md`](./MVP-SPEC.md) is the specification and single source of truth.
- **Vocabulary:** [`GLOSSARY.md`](./GLOSSARY.md) defines Board, Column, Task and Card.
- **Agent rules:** [`AGENTS.md`](./AGENTS.md).

Changes last only for the page session: a refresh starts again from the empty board. There is no backend and no browser storage.

## Running it

Requires Node.js and the dependencies from `npm install`. The browser tests also need Chromium, downloaded once per machine:

```bash
npm install
npx playwright install chromium
```

If a browser test then reports missing system packages, run `sudo npx playwright install-deps chromium`.

So that Claude Code agents can run the test commands without permission prompts, run `claude` in the repo once and accept the trust dialog. Until then it ignores the rules in `.claude/settings.json`.

```bash
npm run dev     # development server at http://localhost:3000
npm run lint    # ESLint
npm run build   # production build
npm start       # serve the production build
npm test        # all tests; add -- "name" to run one by name
npm run test:unit   # unit tests only
npm run test:e2e    # browser tests only, against a new production build on port 3100
```

Built with Next.js 16 (App Router, Turbopack), React 19 and Tailwind CSS v4. Tailwind is wired through the `@tailwindcss/turbopack` loader in `next.config.ts`, not PostCSS.

## Layout

```
src/app/            route files only: layout, page (renders <Board />), globals.css (theme colours)
src/components/     Board (client entry point and state), Column, ColumnName, TaskCard, dialogs
src/lib/board.ts    types, the initial Board and the reducer holding every board rule
src/**/*.test.ts    unit tests
e2e/                browser tests
scripts/            the runner behind the test commands
docs/adr/           architecture decision records
docs/UAT-results.md user acceptance test results for the MVP
docs/uat-add-task-wild-scott.md   the approved plan for the column-rename slice
```

Board state lives in a `useReducer` in `src/components/board.tsx`. Every change (add, edit, delete, rename, move) is an action handled by `boardReducer` in `src/lib/board.ts`.

## Decisions

- [ADR 0001](./docs/adr/0001-native-html5-drag-and-drop.md): Cards move with native HTML5 drag and drop, not a library.
- [ADR 0002](./docs/adr/0002-unit-and-browser-test-levels.md): Automated tests are unit tests on pure logic and tests in a real browser, and run locally.

## Troubleshooting

**The dev server shows old or missing styling** (for example a white page background or an invisible Add Task button) while `npm run build` looks right. Turbopack's persistent dev cache is serving a stale `globals.css`. Restarting the server doesn't clear it. Stop `npm run dev`, delete the cache, and start again:

```bash
rm -rf .next/dev/cache
npm run dev
```
