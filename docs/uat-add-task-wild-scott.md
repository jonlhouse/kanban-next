# Slice 3: Column rename

## Context
Slices 1 and 2 passed UAT (static board and theme; add, edit and delete tasks). Slice 3 builds the column-rename bullets from `MVP-SPEC.md` › Board and columns:
- each column has an explicit edit action that renames its title in place;
- Enter or clicking away saves a valid name, and Escape cancels and keeps the old name;
- a whitespace-only name is invalid: show visible feedback and keep editing active until the name is fixed or the edit is cancelled;
- duplicate names are allowed, and renaming doesn't change the column's tasks.

Answers you gave earlier that apply here: column names are **trimmed** (Q2). With a blank name, Enter and clicking away only show the error and editing stays active; Escape still cancels (Q4).

## Changes

### `src/lib/board.ts`
- Add `{ type: "renameColumn"; columnId: string; name: string }` to `BoardAction`.
- In `boardReducer`, return `board` unchanged if `isBlank(name)`. Otherwise replace that column's `name` with `name.trim()` and keep `tasks` as they are. Reuse the existing `isBlank`, and don't check for duplicates.

### New `src/components/column-name.tsx`
`ColumnName({ name, onRename })` owns its own editing state.
- **Not editing:** `<h2>` with the name (`break-words`), plus a **Rename** text button styled like the card's Edit button (`text-primary hover:underline`, `aria-label="Rename column: {name}"`).
- **Editing:** a text input with the current name, focused and fully selected when it opens. It has an `aria-label`, plus `aria-invalid`/`aria-describedby` when invalid.
  - **Enter:** if valid, call `onRename(draft)` and leave edit mode. If blank, show "Enter a column name." in `text-destructive` with a red border, and stay in edit mode.
  - **Blur (clicking away):** same as Enter. When invalid, the input stays open with the error, but focus isn't pulled back. Stealing focus would fight clicks on other controls.
  - **Escape:** throw away the draft and leave edit mode with the old name.
  - A ref guard stops the blur that happens as the input closes from saving a second time. After leaving edit mode, focus goes back to the Rename button.
- Each column edits on its own, so two columns could both be in edit mode at once. That's acceptable.

### `src/components/column.tsx`
Replace the `<h2>` header with `<ColumnName>` in the same bordered header row (`flex items-center justify-between gap-2`). Add an `onRenameColumn` prop.

### `src/components/board.tsx`
Pass `onRenameColumn={(name) => dispatch({ type: "renameColumn", columnId: column.id, name })}`. Tasks still go to the first column after it's renamed; the reducer already uses `columns[0]`.

## Verification
1. Run `npm run lint`, `npx tsc --noEmit` and `npm run build`.
2. Extend the throwaway `/tmp/reducer-check.mts` (Node 24 `--experimental-strip-types`) to check:
   - rename trims the name;
   - a blank name leaves the board unchanged;
   - a duplicate name is allowed;
   - the column's tasks are unchanged;
   - add still targets the renamed first column.
3. Restart `npm run dev`, then confirm the dev log is clean and the served CSS and markup include the new classes and the Rename buttons.
4. UAT script for you:
   - **Rename button:** shown on each column.
   - **Opening an edit:** the input is focused with the text selected.
   - **Saving:** Enter saves, and so does clicking elsewhere.
   - **Escape:** after typing, Escape restores the old name.
   - **Trimming:** "  Doing  " becomes "Doing".
   - **Blank name:**
     - Enter and click-away show the error and the input stays open;
     - typing a valid name and pressing Enter saves;
     - Escape cancels.
   - **Duplicates:** two columns can both be called "Done".
   - **Tasks unaffected:** renaming leaves the column's cards in place.
   - **First column:** after renaming Backlog, Add Task still adds to that column.
   - **Long names:** they wrap.
   - **Refresh:** column names go back to the defaults.
