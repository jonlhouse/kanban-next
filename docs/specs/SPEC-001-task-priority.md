# SPEC-001-task-priority: Task Priority

Status: Approved
Date: 2026-10-31
BRD: [REQ-001-task-priority](../brds/REQ-001-task-priority.md)

## Summary

Users can choose Task Priority when adding or editing a Task, and recognize it from an icon on each Card. Priority does not rearrange or hide Cards, and remains unchanged when a Task moves between Columns.

## User stories

### SPEC-001.001-add-priority

As a Board user, I want to choose a Priority while adding a Task or accept the default, so that I can capture work quickly.

- Serves: REQ-001.001-choose-priority, REQ-001.003-default-priority, BR-001.001-one-priority, BR-001.002-levels, BR-001.004-default
- Acceptance:
  - Given a newly opened Add Task dialog, when I inspect Priority, then Medium is selected without requiring a choice.
  - Given the Priority drop-down, when I inspect its options, then Critical, High, Medium, and Low appear in that order, each with its icon and name, and no blank option appears. The selected value also shows its icon and name.
  - Given a valid Task title, when I save without changing Priority, then the new Task has Medium Priority.
  - Given a valid Task title, when I choose a non-default Priority and save, then the new Task has the selected Priority.
  - Given a selected Priority and an invalid Task title, when I attempt to save, then the title error is shown and my selected Priority remains available while I correct the title.

### SPEC-001.002-edit-priority

As a Board user, I want to change a Task's Priority in Edit Task, so that it reflects my current judgment.

- Serves: REQ-001.001-choose-priority, BR-001.001-one-priority, BR-001.002-levels
- Acceptance:
  - Given an existing Task, when I open Edit Task, then its current Priority is selected in the same icon-and-name drop-down used for adding Tasks.
  - Given Edit Task, when I select another Priority and save, then the Task has the selected Priority and its Card shows the corresponding icon.
  - Given Edit Task, when I change Priority and cancel, then the Task retains its original Priority.
  - Given Edit Task, when I change other Task details without changing Priority and save, then its Priority remains unchanged.

### SPEC-001.003-recognize-priority

As a Board user, I want to recognize each Task's Priority on its Card, so that I can compare Tasks across the Board.

- Serves: REQ-001.002-recognize-priority, BR-001.002-levels, BR-001.003-guidance, BR-001.005-movement, BR-001.006-advisory
- Acceptance:
  - Given Tasks on the Board, when I view their Cards, then each Card shows a distinct icon for its Priority, including Medium; the same level uses the same icon in Cards and the drop-down.
  - Given a Card's Priority icon, when I hover over it or focus it with the keyboard, then its Priority name is revealed.
  - Given a Card's Priority indicator, when I use assistive technology, then its Priority name is available; color alone is not used to convey its meaning.
  - Given a Task in a Column, when I move it to another Column, then its Priority and corresponding icon remain unchanged.
  - Given manually ordered Cards, when I change a Task's Priority, then the Cards do not automatically rearrange or disappear.

## Test seams

- **The Add and Edit Task dialogs:** SPEC-001.001, SPEC-001.002
- **Cards on the Board:** SPEC-001.003

Use the Medium default and one non-default level rather than exercising each level separately.

## Deferred to design

- Architecture: How Priority and its presentation are represented, and whether or how to automate checks with a test harness.
- UI: The actual icons, colors and styling, and how the drop-down and discoverable Priority name are implemented accessibly.

## Out of scope

- Sorting or filtering by Priority; manual Card order remains in use.
- Reminders, automatic escalation, or enforcement of a work order.
- Collaboration, persistence, and migration of saved Tasks; the Board is session-only and has no saved Tasks to migrate.
