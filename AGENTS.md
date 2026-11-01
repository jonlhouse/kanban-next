# Kanban Next

A learning project: a single-page Kanban board built by agents, used as a testbed for agent skills across the delivery pipeline: business requirements, spec writing, ticket creation and test-driven development.

- What to build: `MVP-SPEC.md`. Change it only with the user's agreement.
- Vocabulary: `GLOSSARY.md`. Use its terms (Board, Column, Task, Card) in code, UI text and commits, and none of the words listed under `_Avoid_`.
- Decisions that are hard to reverse, surprising and a real trade-off (for example the drag-and-drop approach) get a short ADR in `docs/adr/`.
- Propose any new npm dependency, with the alternatives, and wait for approval before installing it.
- Before calling work done, `npm run lint` and `npm run build` pass, and the behaviour has been checked against the relevant `MVP-SPEC.md` bullets.

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
