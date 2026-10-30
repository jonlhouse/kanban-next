import { useId, useRef, useState } from "react";
import { isBlank } from "@/lib/board";

type ColumnNameProps = {
  name: string;
  onRename: (name: string) => void;
};

// The Column heading, with a Rename action that edits the name in place.
export function ColumnName({ name, onRename }: ColumnNameProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const renameButtonRef = useRef<HTMLButtonElement>(null);
  // Set when Enter or Escape ends the edit, so the blur that follows as the
  // input closes doesn't save again.
  const finishing = useRef(false);
  const errorId = useId();

  function startEditing() {
    finishing.current = false;
    setShowError(false);
    setDraft(name);
  }

  // After Enter or Escape, focus returns to Rename; after clicking away it
  // stays wherever the user clicked.
  function stopEditing({ refocus }: { refocus: boolean }) {
    finishing.current = true;
    setDraft(null);
    setShowError(false);
    if (refocus) {
      // The button is back in the DOM on the next frame.
      requestAnimationFrame(() => renameButtonRef.current?.focus());
    }
  }

  // Enter and clicking away both save a valid name; a blank name shows the
  // error and editing stays active until it is fixed or Escape cancels.
  function trySave(value: string, { refocus }: { refocus: boolean }) {
    if (isBlank(value)) {
      setShowError(true);
      return;
    }
    onRename(value);
    stopEditing({ refocus });
  }

  if (draft === null) {
    return (
      <div className="flex items-start justify-between gap-2 border-b border-border px-3 py-2">
        <h2 className="min-w-0 font-semibold break-words">{name}</h2>
        <button
          ref={renameButtonRef}
          type="button"
          aria-label={`Rename column: ${name}`}
          className="shrink-0 text-sm font-medium text-primary hover:underline"
          onClick={startEditing}
        >
          Rename
        </button>
      </div>
    );
  }

  const invalid = showError && isBlank(draft);

  return (
    <div className="flex flex-col gap-1 border-b border-border px-3 py-2">
      <input
        type="text"
        autoFocus
        onFocus={(event) => event.currentTarget.select()}
        value={draft}
        aria-label="Column name"
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        className={`rounded-md border px-2 py-1 font-semibold outline-primary ${
          invalid ? "border-destructive" : "border-border"
        }`}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            trySave(draft, { refocus: true });
          } else if (event.key === "Escape") {
            event.preventDefault();
            stopEditing({ refocus: true });
          }
        }}
        onBlur={() => {
          if (!finishing.current) trySave(draft, { refocus: false });
        }}
      />
      {invalid && (
        <p id={errorId} className="text-sm text-destructive">
          Enter a column name.
        </p>
      )}
    </div>
  );
}
