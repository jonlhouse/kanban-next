# UAT results: Kanban MVP

User acceptance testing of the MVP in `MVP-SPEC.md`, done in the browser by the user against `npm run dev`, one build slice at a time, on 2026-10-30. Slices 1–4 used temporary sample Tasks, which were removed before the spec verification.

## Slice 1: Static Board and theme

**First run: failed.**

| Observation | Cause and outcome |
| --- | --- |
| Page background was white, not `#F8FAFC` | Turbopack's persistent dev cache (`.next/dev/cache`) kept serving the starter `globals.css`. Fixed by deleting the cache, with approval. `npm run build` was never affected. |
| No Add Task button | Same cause: `bg-primary` was missing, so the button was white text on white. |
| No dark mode toggle | Expected: dark mode is out of scope. The page stays light. |
| Only page title is "Board" | Kept as "Board", the glossary term. Column names were visible. |
| Narrow window scrolls sideways | Accepted for slice 1. |

**Second run, with sample Cards added at the user's request: passed.**

| Check | Result |
| --- | --- |
| Theme CSS applied | Pass |
| Sample Cards present | Pass |
| Cards show title and optional description | Pass |
| Add Task in the primary colour, aligned right across from the "Board" title | Pass |

**Layout change requested:**
- the Board fills the width;
- Add Task lines up with the right edge of Column 5;
- Columns have a minimum width and wrap when the window is narrow.

Result: **passed**.

## Slice 2: Add, edit and delete Tasks

| Area | Check | Result |
| --- | --- | --- |
| Add Task | Dialog opens | Pass |
| | Adds the Card to Backlog | Pass |
| | Cancel and clicking away cancel | Pass |
| Edit Task | Dialog opens with the same fields as Add | Pass |
| | Populated with current values | Pass |
| | Save updates title and description | Pass |
| | Cancel and clicking away cancel | Pass |
| | Empty description allowed | Pass |
| | Missing title shows an error | Pass |
| | Error help text present and styled | Pass |
| | New Cards are placed below existing ones | Observed; matches the spec (appended to the first Column) |
| Delete Task | Dialog opens | Pass |
| | Cancel and clicking away cancel | Pass |
| | Delete removes the Card | Pass |
| Trimming | Title and description trimmed | Pass |
| Multi-line | Description line breaks kept | Pass |
| Refresh | Resets the Board | Pass |

## Slice 3: Column rename

All 15 checks passed:
1. Rename button on every Column
2. Input focused with the name selected
3. Enter saves and returns focus to Rename
4. Click-away saves
5. Click-away onto another control saves and that click still works
6. Escape restores the old name
7. Name is trimmed
8. Blank name + Enter shows the error and stays editing
9. Blank name + click-away shows the error and stays editing
10. Blank name + Escape cancels
11. Duplicate names allowed
12. Cards unaffected by a rename
13. Add Task targets the renamed first Column
14. Long names wrap
15. Refresh restores default names

## Slice 4: Drag and drop

All 13 checks passed:
1. Grab cursor and faded original while dragging
2. Reorder within a Column
3. Drop at a chosen position in another Column
4. Drop at the end of a Column
5. Drop on a Column heading puts the Card at the top
6. Empty Column accepts a drop
7. Release outside a Column leaves the Card in place
8. Escape mid-drag cancels
9. Leaving a Column clears its highlight
10. Dropping in place changes nothing
11. Edit, Delete, Rename and Add Task still work after moves
12. Keyboard Tab and Enter/Space still reach and activate controls
13. Refresh discards moves

**Feedback:** the user liked reordering within a Column. A request for a more opaque, jittering drag image was raised and then withdrawn by the user.

## Spec verification (step 4)

All 22 `MVP-SPEC.md` bullets were marked met; none were not met. Two bullets also needed a check in the browser after the sample Tasks were removed:
- the first load shows five empty Columns;
- a refresh returns to the empty default Board.

The user went on to step 5 without reporting individual results for the step 4 manual test script.
