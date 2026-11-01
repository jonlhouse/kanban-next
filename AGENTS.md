# Kanban Next

A learning project: a single-page Kanban board built by agents, used as a testbed for agent skills across the delivery pipeline: business requirements, spec writing, ticket creation and test-driven development.

- What to build: `MVP-SPEC.md`. Change it only with the user's agreement.
- Vocabulary: `GLOSSARY.md`. Use its terms (Board, Column, Task, Card) in code, UI text and commits, and none of the words listed under `_Avoid_`.
- Decisions that are hard to reverse, surprising and a real trade-off (for example the drag-and-drop approach) get a short ADR in `docs/adr/`.
- Propose any new npm dependency, with the alternatives, and wait for approval before installing it.
- Before calling work done, `npm run lint` and `npm run build` pass, and the behaviour has been checked against the relevant `MVP-SPEC.md` bullets.

## Test levels

| Level | Command | Catches | Misses |
| --- | --- | --- | --- |
| Unit | `npm run test:unit` | Pure logic that needs no DOM, such as `boardReducer` | Anything rendered or wired to the UI |
| Browser | `npm run test:e2e` | Behaviour in real Chromium against a new production build, including layout, focus and native dialogs | Other browsers and whether it looks right; each run pays for a build |

`npm test` runs both levels. Add `-- "name"` to any of the three to run matching tests.

- Put unit tests beside the code they cover, as `src/**/<name>.test.ts`, and browser tests in `e2e/`, as `<area>.spec.ts`. The runners find tests only there, and report "no tests found" as a pass.
- Start each test's name with the story ID it proves, then the behaviour in `GLOSSARY.md` terms: `SPEC-002.005-prove-levels: a new Task goes to the first Column`.

- Specs mark each criterion automated or by-hand. The builder chooses the level for each automated criterion, using the fastest that observes the behaviour, and names the choice in their report.
- Moving a criterion to by-hand needs the owner's agreement.
- A failing test stops the work (`BR-002.002-failing-check-stops`), and a flaky test counts as failing.
- Tests run through `/tdd` and stay out of the done gates (ADR 0002).

## Agent skills

### Issue tracker

GitHub Issues in `jonlhouse/kanban-next`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`, and the work states `in-progress` and `awaiting-pr`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
