import type { Task } from "@/lib/board";
import { buttonStyles, Dialog } from "./dialog";

type DeleteTaskDialogProps = {
  task: Task;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteTaskDialog({ task, onConfirm, onCancel }: DeleteTaskDialogProps) {
  return (
    <Dialog heading="Delete Task" onCancel={onCancel}>
      <p className="break-words">
        Delete <strong>{task.title}</strong>? This cannot be undone.
      </p>
      <div className="flex justify-end gap-2">
        {/* Cancel first, so it gets the initial focus rather than Delete. */}
        <button type="button" autoFocus className={buttonStyles.secondary} onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className={buttonStyles.destructive} onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Dialog>
  );
}
