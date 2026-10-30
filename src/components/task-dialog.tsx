import { useId, useState } from "react";
import { isBlank, type TaskFields } from "@/lib/board";
import { buttonStyles, Dialog } from "./dialog";

type TaskDialogProps = {
  heading: string;
  submitLabel: string;
  initialFields: TaskFields;
  onSave: (fields: TaskFields) => void;
  onCancel: () => void;
};

// Used for both adding and editing a Task.
export function TaskDialog({
  heading,
  submitLabel,
  initialFields,
  onSave,
  onCancel,
}: TaskDialogProps) {
  const [title, setTitle] = useState(initialFields.title);
  const [description, setDescription] = useState(initialFields.description);
  const [showTitleError, setShowTitleError] = useState(false);
  const titleId = useId();
  const titleErrorId = useId();
  const descriptionId = useId();
  const titleInvalid = showTitleError && isBlank(title);

  return (
    <Dialog heading={heading} onCancel={onCancel}>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (isBlank(title)) {
            setShowTitleError(true);
            return;
          }
          onSave({ title, description });
        }}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor={titleId} className="font-medium">
            Title
          </label>
          <input
            id={titleId}
            type="text"
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-invalid={titleInvalid}
            aria-describedby={titleInvalid ? titleErrorId : undefined}
            className={`rounded-md border px-3 py-2 outline-primary ${
              titleInvalid ? "border-destructive" : "border-border"
            }`}
          />
          {titleInvalid && (
            <p id={titleErrorId} className="text-sm text-destructive">
              Enter a task title.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor={descriptionId} className="font-medium">
            Description <span className="font-normal">(optional)</span>
          </label>
          <textarea
            id={descriptionId}
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="rounded-md border border-border px-3 py-2 outline-primary"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" className={buttonStyles.secondary} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={buttonStyles.primary}>
            {submitLabel}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
