# REQ-001-task-priority: Task Priority

Status: Approved
Date: 2026-10-31

## Purpose

A freelance developer managing work for several clients needs to recognize which Tasks deserve attention first. When all Tasks appear equally important, urgent work can be overlooked and started too late.

## Stakeholders

- **Board user**: needs to judge and recognize Task Priority quickly without slowing down Task capture.

## Business outcomes

- Fewer urgent Tasks are started too late. Assess this by periodically comparing the number started too late before and after the change, without requiring the Board to collect the measurements.
- Capturing a Task does not require a separate Priority decision.

## Scope

In scope:
- Choosing, changing, and recognizing Task Priority across the Board.
- A default Priority for Tasks without an explicit choice, including existing Tasks without Priority.

Out of scope:
- Enforcing a work order, reminders, and automatic escalation: Priority is an indicator, not an instruction.
- Collaboration and persistence across sessions: these remain outside the current Board's scope.

## Requirements

### REQ-001.001-choose-priority

A Board user can choose a Task's Priority and revise it as circumstances change.

- Priority: Must
- Business value: The Board user can express and update their judgment as client work becomes more or less pressing.
- Acceptance criteria:
  - The user can assign any of the four agreed Priority levels to a Task and later change it to another.
  - Changing Priority does not require approval.

### REQ-001.002-recognize-priority

A Board user can recognize and compare Task Priorities across the Board at a glance.

- Priority: Must
- Business value: The user can distinguish urgent work from less pressing work before deciding what to tackle next.
- Acceptance criteria:
  - The user can distinguish Critical, High, Medium, and Low Tasks across the Board.
  - Tasks may have the same Priority; the user decides which to tackle among them.

### REQ-001.003-default-priority

A Board user can capture a Task without making a separate Priority decision.

- Priority: Must
- Business value: The user can keep adding Tasks quickly without an extra decision for each one.
- Acceptance criteria:
  - A Task created without an explicit Priority has Medium Priority.
  - Existing Tasks without a Priority have Medium Priority.

## Business rules

| Name | Description |
| --- | --- |
| BR-001.001-one-priority | Each Task has exactly one Priority, shared as an attribute of the Task rather than varying by user. |
| BR-001.002-levels | Priority levels, from highest to lowest, are Critical, High, Medium, and Low. |
| BR-001.003-guidance | Critical suggests work needing immediate attention; Low suggests work that can generally wait. The levels guide judgment rather than prescribe it. |
| BR-001.004-default | Medium is the default when no Priority has been chosen. |
| BR-001.005-movement | Moving a Task between Columns does not change its Priority; a user may change it deliberately. |
| BR-001.006-advisory | Priority is an indicator and does not dictate which Task a user must undertake. |

## Constraints

- The current Board remains a single-person, session-only proof of concept; Priority does not require collaboration or persistence.

## Deferred to the spec

- Where and how Priority is displayed, chosen, and changed, including during Task creation.
- Whether and how Tasks can be sorted or filtered by Priority.
- Visual and accessible presentation of the levels.
- How existing Tasks without Priority receive the default.

## Open questions

- None
