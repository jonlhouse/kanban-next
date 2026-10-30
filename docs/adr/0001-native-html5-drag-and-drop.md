---
status: accepted
---

# Native HTML5 drag and drop for moving cards

Cards are moved with the browser's native HTML5 drag-and-drop events, not a library. The MVP is desktop-only and mouse-only, so native events cover every requirement without a dependency: reordering within a column and placing a card at a chosen position in another column use an insertion index computed from the pointer against card midpoints; an empty column accepts drops because the whole column body is a drop target; and releasing outside a target leaves the card in place because no `drop` event fires.

## Considered Options

- **`@dnd-kit` (core, sortable, utilities):** animated reordering and a built-in keyboard sensor, but three dependencies and extra code to move cards between columns. Rejected for this proof of concept.

## Consequences

- No keyboard dragging. When keyboard support is needed, add a non-drag "Move to…" action on the card rather than switching libraries; it works alongside native drag and drop.
- The drag image is browser-controlled and there is no animated reflow. If either becomes a requirement, revisit this decision.
