# Kanban proof of concept: MVP specification

## Purpose and scope

Build a desktop-only, single-page proof of concept for one person to capture
tasks and move them through a board. This is a learning exercise intended to
explore agent-generated code, not a production-ready product.

See [GLOSSARY.md](./GLOSSARY.md) for the project's domain terminology.

## Board and columns

- The page starts with one board and five empty columns, in this fixed order:
  Backlog, To Do, In Progress, Review, Done.
- Columns cannot be added, removed, or reordered.
- Each column has an explicit edit action for renaming its title in place.
  Enter or clicking away saves a valid name; Escape cancels the edit and
  retains the previous name.
- A name containing only whitespace is invalid. Show visible feedback and keep
  editing active until the name is corrected or the edit is canceled. Duplicate
  column names are allowed.
- Column names have no special effect on tasks or workflow. Renaming a column
  does not alter its tasks.

## Tasks and cards

- A top-level **Add Task** action opens a dialog with a single-line title field
  and a multiline description field.
- A task title is required, cannot be whitespace-only, and is trimmed of
  surrounding whitespace. The description is optional. No arbitrary field
  length limit is specified for this proof of concept.
- Saving a new task appends its card to the first column, regardless of that
  column's current name.
- A card displays the task's title and, when present, its description.
- A task can be edited in a dialog using the same fields as creation. Saving
  updates the task; canceling leaves it unchanged.
- A task can be deleted after confirmation in a dialog. Confirmed deletion is
  immediate and cannot be undone. Canceling leaves the task unchanged.
- Invalid task titles produce visible feedback and leave the dialog open.

## Drag and drop

- With a mouse, users can drag cards between columns and reorder cards within a
  column or at a chosen position in another column.
- Empty columns accept dropped cards.
- Releasing a card outside a valid drop target leaves it in its original
  position.
- Keyboard-only operation, including a non-drag way to move tasks, is not
  required for this proof of concept. Normal browser keyboard behavior should
  not be intentionally disabled.

## Session behavior

All changes exist only for the current page session. Refreshing or closing the
page discards them; every new load starts with the initial empty board. Do not
use browser storage or a backend for persistence.

## Visual design and technology

- Use the project's existing Tailwind CSS installation.
- Use a light theme with violet as the primary brand color:

  | Role | Color |
  | --- | --- |
  | Primary | `#6D28D9` |
  | Page background | `#F8FAFC` |
  | Surfaces | `#FFFFFF` |
  | Text | `#0F172A` |
  | Borders | `#CBD5E1` |
  | Destructive actions | `#B91C1C` |

- Desktop browsers are the target; mobile support and dark mode are outside
  this MVP.

## Out of scope

Authentication, collaboration or sharing, backend logic or APIs, persistence,
additional boards, configurable column count or order, undo, and additional
task properties such as dates, labels, and assignees are not part of this MVP.
