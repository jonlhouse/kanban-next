# REQ-002-repeatable-acceptance-checks: Repeatable acceptance checks

Status: Approved
Date: 2026-11-01

## Purpose

Each new spec's acceptance criteria are confirmed once, by hand, and nothing confirms them again after later changes. The Board's owner needs each new spec's accepted behaviour to stay confirmable as work continues, without repeating the checks by hand.

## Stakeholders

- **Board's owner**: needs to trust that behaviour accepted from new specs still holds, and to have new specs built against their checks.

## Business outcomes

- Accepted behaviour from new specs doesn't break unnoticed. Assess this by periodically counting regressions the owner found themselves that a check should have caught.
- Less of the owner's time goes on repeated checking. Assess this by counting the acceptance criteria in each new spec that still have to be checked by hand.
- New specs can be built check-first, as part of this project's skills testbed. Assess this by whether each new spec's criteria had their checks written before the work.

## Scope

In scope:
- Repeatable checks for the acceptance criteria of specs written from now on.
- Showing the practice works before a spec relies on it.
- Making the available kinds of check known to whoever writes or builds a spec.

Out of scope:
- MVP behaviour: it was accepted by hand and isn't brought under these requirements.
- SPEC-001 Task Priority: the owner will re-implement it separately later.
- Requiring checks to run on every change, or enforcing them centrally: checks run as part of the work for now.

## Requirements

### REQ-002.001-repeat-checks

The acceptance criteria of a new spec can be confirmed again after later changes, without repeating them by hand.

- Priority: Must
- Business value: The owner learns when later work breaks accepted behaviour, without spending time rechecking it.
- Acceptance criteria:
  - After a later change, the owner can tell whether a new spec's repeatable checks still hold, without performing them by hand.
  - A check fails when the behaviour it covers no longer meets its criterion.

### REQ-002.002-check-first

The behaviour of a new spec can be built by writing its check before the work.

- Priority: Must
- Business value: The owner gets evidence that each check really tests its criterion, and this project's skills testbed can exercise check-first work.
- Acceptance criteria:
  - A check for a new criterion can be seen failing before the work, then passing after it.

### REQ-002.003-prove-practice

The practice is shown to work before any spec relies on it, including checking that a Card moves between Columns.

- Priority: Must
- Business value: The owner finds out early if the riskiest kind of check can't be relied on, rather than partway through a spec.
- Acceptance criteria:
  - Each kind of check has been seen both passing and failing.
  - Moving a Card between Columns has been checked reliably, or the owner has been told it can't be.

### REQ-002.004-know-check-kinds

Whoever writes or builds a spec can find out which kinds of check are available and what each one can and can't catch.

- Priority: Must
- Business value: The owner gets specs whose criteria use the right kind of check, without having to explain the options each time.
- Acceptance criteria:
  - The kinds of check, how to run each one, and what each one catches and misses are written down where spec authors and builders will find them.

## Business rules

| Name | Description |
| --- | --- |
| BR-002.001-repeatable-default | Every acceptance criterion in a new spec is a repeatable check unless it needs human judgement. Any by-hand check is named as such in the spec. |
| BR-002.002-failing-check-stops | A failing check stops that work until the behaviour is fixed, or the owner agrees the expected behaviour has changed and the spec is updated first. |

## Constraints

- The Board remains a single-person, session-only proof of concept.
- Checks are run locally by whoever is doing the work; no shared or central enforcement is required for now.

## Deferred to the spec

- How the kinds of check map to ADR 0002's unit and browser test levels, and the commands that run them.
- What the proof uses, including the Board behaviour it exercises.
- Where the kinds of check are written down.

## Open questions

- None
