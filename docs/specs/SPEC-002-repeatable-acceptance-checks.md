# SPEC-002-repeatable-acceptance-checks: Repeatable acceptance checks

Status: Approved
Date: 2026-11-01
BRD: [REQ-002-repeatable-acceptance-checks](../brds/REQ-002-repeatable-acceptance-checks.md)

## Summary

Whoever builds a spec can write automated tests for its acceptance criteria and run them unattended, at the unit or browser level, with one command. A failed run says what broke and gives enough evidence to diagnose it. `AGENTS.md` describes the test levels and how a builder chooses between them. ADR 0002 records the tools and levels.

## User stories

### SPEC-002.001-run-tests

As a builder, I want to run the automated tests with one command and no one present, so that I can confirm accepted behaviour after any change.

- Serves: REQ-002.001-repeat-checks
- Acceptance:
  - Given tests at both levels, when I run `npm test`, then both levels run.
  - Given tests at both levels, when I run `npm run test:unit` or `npm run test:e2e`, then only that level runs.
  - Given a test's name, when I run any of the three commands with that name, then only the matching test runs.
  - Given any of the three commands, when I run it, then it shows no prompt or visible browser window, starts and stops what it needs, exits by itself, and ends in a clear pass or fail.
  - Given a fresh clone whose workspace has been trusted once, when an agent runs any of the three commands, then the agent gets no permission prompt.
  - Given no tests exist, when I run any of the three commands, then it passes and says no tests were found.

### SPEC-002.002-diagnose-failures

As a builder, I want a failed run to say what broke, so that I can act on it without help.

- Serves: REQ-002.001-repeat-checks, BR-002.002-failing-check-stops
- Acceptance:
  - Given behaviour that no longer meets its criterion, when I run its test, then the run fails.
  - Given a failed test, when the run ends, then the output names the story the test cites and what went wrong.
  - Given a failed browser test, when the run ends, then a screenshot of the failure is available.
  - Given a test that fails intermittently, when it fails, then it isn't retried and the run fails.

### SPEC-002.003-test-current-code

As a builder, I want browser tests to run against the code as it is now, so that a pass can't come from stale code or another server.

- Serves: REQ-002.001-repeat-checks
- Acceptance:
  - Given a code change that hasn't been built, when I run the browser tests, then they run against a new production build that includes the change.
  - Given a development server on port 3000, when I run the browser tests, then they don't use it, and it keeps running.

### SPEC-002.004-set-up

As someone using this repo, I want documented install commands, so that I can get the tests running on a new machine.

- Serves: REQ-002.001-repeat-checks
- Acceptance:
  - Given a fresh clone, when I follow the README's install commands, then all three test commands can run.
  - Given a machine missing system packages the browser needs, when setup or a browser test run reaches that point, then it stops and gives the exact command a person needs to run.
  - Given the README, when I read its setup steps, then it tells me how to trust the workspace so agents can run the test commands without prompting.

### SPEC-002.005-prove-levels

As the Board's owner, I want each test level seen failing and passing, so that I know it works before a spec relies on it.

- Serves: REQ-002.002-check-first, REQ-002.003-prove-practice
- Acceptance:
  - Given the unit proof test, a new Task goes to the first Column, when that behaviour is temporarily broken, then the test fails; when it is restored, then the test passes.
  - Given the browser proof test, adding a Task shows its Card on the Board, when that behaviour is temporarily broken, then the test fails; when it is restored, then the test passes.
  - Given the proof is complete, when I read the build report, then it records each test failing and passing.
  - Given the proof is complete, when I run `npm test`, then both proof tests are still in the suite and pass.

### SPEC-002.006-choose-a-level

As someone writing or building a spec, I want the test levels and the rule for choosing between them written down, so that each criterion gets a suitable test.

- Serves: REQ-002.004-know-check-kinds, BR-002.001-repeatable-default
- Acceptance:
  - Given `AGENTS.md`, when I read it, then it names the unit and browser levels, the command for each, and what each catches and misses.
  - Given `AGENTS.md`, when I read it, then it says specs mark each criterion automated or by-hand, that the builder chooses the level for each automated criterion, using the fastest that observes the behaviour, and names the choice in their report.
  - Given `AGENTS.md`, when I read it, then it says moving a criterion to by-hand needs the owner's agreement.
  - Given `AGENTS.md`, when I read it, then it gives the location and naming conventions for tests at each level.

## Test seams

- Running the commands and setup in a terminal: SPEC-002.001, SPEC-002.002, SPEC-002.003, SPEC-002.004; manual, run by the builder, with the owner's agreement because the harness can't sensibly test itself.
- Proof tests: SPEC-002.005; automated (one unit test, one browser test).
- Reading `AGENTS.md` and the README: SPEC-002.006; manual, run by the builder, with the owner's agreement.

## Deferred to design

- Architecture: Configuration files, test locations, the browser tests' port, and where failure evidence is saved.
- Architecture: The wording of `AGENTS.md` and the README, and how test commands are pre-approved in a checked-in `.claude/settings.json`.

## Out of scope

- Tests for other MVP behaviour; the proof tests exist only to show the harness works.
- SPEC-001 Task Priority: the owner will re-implement it separately later.
- CI, required checks, or a done gate in `AGENTS.md`: tests run through `/tdd` for now.
- Firefox and WebKit, and screenshot comparison tests.
- Automated drag: the first spec that needs it finds out whether it can be driven (ADR 0002).
