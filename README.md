# Kanban Next

A single-page Kanban board for one person to capture tasks and move them through five columns. It is a learning project for exploring agent-generated code, not a production app.

- **What it does:** [`MVP-SPEC.md`](./MVP-SPEC.md) is the specification and single source of truth.
- **Vocabulary:** [`GLOSSARY.md`](./GLOSSARY.md) defines Board, Column, Task and Card.
- **Agent rules:** [`AGENTS.md`](./AGENTS.md).

Changes last only for the page session: a refresh starts again from the empty board. There is no backend and no browser storage.

## Running it

Requires Node.js and the dependencies from `npm install`.

```bash
npm run dev     # development server at http://localhost:3000
npm run lint    # ESLint
npm run build   # production build
npm start       # serve the production build
```

Built with Next.js 16 (App Router, Turbopack), React 19 and Tailwind CSS v4. Tailwind is wired through the `@tailwindcss/turbopack` loader in `next.config.ts`, not PostCSS.

## Layout

```
src/app/            route files only: layout, page (renders <Board />), globals.css (theme colours)
src/components/     Board (client entry point and state), Column, ColumnName, TaskCard, dialogs
src/lib/board.ts    types, the initial Board and the reducer holding every board rule
docs/adr/           architecture decision records
docs/UAT-results.md user acceptance test results for the MVP
docs/uat-add-task-wild-scott.md   the approved plan for the column-rename slice
```

Board state lives in a `useReducer` in `src/components/board.tsx`. Every change (add, edit, delete, rename, move) is an action handled by `boardReducer` in `src/lib/board.ts`.

## Decisions

- [ADR 0001](./docs/adr/0001-native-html5-drag-and-drop.md): Cards move with native HTML5 drag and drop, not a library.

## Troubleshooting

**The dev server shows old or missing styling** (for example a white page background or an invisible Add Task button) while `npm run build` looks right. Turbopack's persistent dev cache is serving a stale `globals.css`. Restarting the server doesn't clear it. Stop `npm run dev`, delete the cache, and start again:

```bash
rm -rf .next/dev/cache
npm run dev
```
