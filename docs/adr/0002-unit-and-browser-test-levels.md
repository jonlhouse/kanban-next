---
status: accepted
---

# Unit and browser test levels, run locally

The Board's automated tests have two levels and no component level: Vitest unit tests on pure logic that needs no DOM, such as `boardReducer`, and Playwright tests in Chromium against the production build. The Board's riskiest behaviour depends on a real browser: drop position is computed from card layout, cards move with native drag and drop (ADR 0001), and dialogs use the native `<dialog>`. Simulated-DOM component tests would need fakes for these and miss the failures that matter, so React Testing Library and jsdom are deliberately left out, although the Next.js Vitest guide installs them.

Tests cover the acceptance criteria of new specs only. The MVP is not backfilled: `MVP-SPEC.md` is frozen and was accepted by manual UAT. Tests run locally, through `/tdd` and `/implement`. `AGENTS.md` names the test levels and their commands but adds no done gate, and there is no CI or required check for now.

## Considered Options

- **Unit, simulated DOM and browser:** the classic pyramid, rejected for the reasons above.
- **Browser only:** simplest, but rule failures take longer to run and diagnose.
- **Playwright only, also running unit tests in its runner:** one less dependency, but a less conventional setup.
- **Jest or Cypress:** no advantage over Vitest for pure logic, or over Playwright for the browser level.
- **Firefox and WebKit as well as Chromium:** slower, for a single-person proof of concept.
- **CI with a required check:** the stronger guard against regressions, deferred for now.

## Consequences

- MVP behaviour can regress without a test catching it, including checks that exist only in `docs/UAT-results.md`.
- Ad hoc edits run no tests.
- The Firefox drag workaround in `task-card.tsx` is not exercised.
- Playwright can drive native drag: `dragTo` moves and reorders Cards in the SPEC-001 browser tests.
