# REQ-001-task-priority: Task Priority

Status: Approved
Date: 2026-10-31

## Purpose

A freelance developer managing work for several clients needs to recognize which Tasks deserve attention first. When every Task appears equally important, urgent work can be overlooked; adding Priority should help without making Task capture burdensome.

## Stakeholders

- **Freelance developer:** needs to judge and recognize what to work on next across clients while keeping Task capture quick.

## Business outcomes

- Fewer urgent Tasks noticed too late, assessed through the developer's informal recollection of missed or late-noticed work before and after the change.
- Task capture remains quick, assessed by informally comparing the time and effort needed to add Tasks before and after the change. These are directional indicators, not formal KPI targets.

## Scope

In scope:
- Assigning, changing, and recognizing a Task's Priority using one Board-wide scale.
- Keeping Task capture low-friction and preserving the developer's control of Card order.

Out of scope:
- Saving the Board across sessions; the existing session-only behavior remains unchanged.
- Priority-based filtering, automatic sorting, and a separate ranked view; the existing manually ordered Board remains the focus.
- Separate ratings for importance and urgency; Priority combines both into a judgment of what to work on next.

## Requirements

### REQ-001.001-manage-priority

The developer can assign and change a Task's Priority as their judgment of what to work on next changes.

- Priority: Must
- Business value: The developer can keep work for different clients comparable as circumstances change.
- Acceptance criteria:
  - Given a Task, when the developer assigns or changes its Priority, then the Task reflects the chosen level.

### REQ-001.002-recognize-priority

The developer can distinguish the Priority of every Task on the Board, including without relying on color alone.

- Priority: Must
- Business value: The developer can identify more urgent work at a glance and distinguish levels when color is unavailable or difficult to perceive.
- Acceptance criteria:
  - Given Tasks with different Priorities, when the developer reviews their Cards, then the Priority of each can be distinguished without relying solely on color.

### REQ-001.003-quick-task-capture

The developer can add a Task without having to make a separate Priority choice.

- Priority: Must
- Business value: The developer can capture work quickly without interrupting their flow.
- Acceptance criteria:
  - Given a new Task, when the developer adds it without choosing a Priority, then it receives the default Priority.

### REQ-001.004-preserve-manual-order

Assigning or changing Priority leaves the developer in control of Card order.

- Priority: Must
- Business value: The developer retains an established way of organizing work and avoids unexpected rearrangement.
- Acceptance criteria:
  - Given Cards in a manually chosen order, when the developer assigns or changes a Priority, then their order remains unchanged.

## Business rules

| Name | Description |
| --- | --- |
| BR-001.001-shared-scale | Priority combines importance and urgency in one scale shared across the Board, regardless of client. |
| BR-001.002-levels | The levels, from highest to lowest, are Critical (immediate attention), High (soon), Medium (ordinary work), and Low (can wait). |
| BR-001.003-default | A new Task defaults to Medium; default and explicitly selected Medium have the same meaning. |
| BR-001.004-retention | Moving a Task between Columns or changing its other details does not change its Priority. |

## Constraints

- The Board remains a single-user, desktop-oriented proof of concept.
- Tasks and their Priorities last only for the current page session; refreshing or closing the page discards them.

## Deferred to the spec

- The agreed presentation: an icon on each Card with a distinct shape and visual treatment for each level, descriptive accessible naming, and hover text.
- The agreed symbols: double exclamation for Critical, single exclamation for High, horizontal bar for Medium, and down arrow for Low.
- The agreed interaction: a Priority dropdown in the Add/Edit Task dialog, ordered Critical through Low; changes are made in the dialog, not directly on the Card.
- Detailed behavior, accessibility checks, and tests for the agreed capabilities.

## Open questions

- None.
