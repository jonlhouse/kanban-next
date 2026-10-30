import { useRef } from "react";
import type { Task } from "@/lib/board";

type TaskCardProps = {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
};

export function TaskCard({
  task,
  onEdit,
  onDelete,
  isDragging,
  onDragStart,
  onDragEnd,
}: TaskCardProps) {
  const pendingDragStart = useRef<ReturnType<typeof setTimeout>>(undefined);

  return (
    <article
      draggable
      onDragStart={(event) => {
        // Firefox only starts a drag when some data is set.
        event.dataTransfer.setData("text/plain", task.title);
        event.dataTransfer.effectAllowed = "move";
        // Update state after the browser has captured the drag image, so the
        // image isn't the faded "dragging" style.
        pendingDragStart.current = setTimeout(onDragStart, 0);
      }}
      onDragEnd={() => {
        clearTimeout(pendingDragStart.current);
        onDragEnd();
      }}
      className={`cursor-grab rounded-md border border-border bg-surface p-3 shadow-sm ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h3 className="font-medium break-words">{task.title}</h3>
      {task.description && (
        <p className="mt-1 text-sm break-words whitespace-pre-line">
          {task.description}
        </p>
      )}
      <div className="mt-2 flex justify-end gap-3 text-sm font-medium">
        <button
          type="button"
          aria-label={`Edit task: ${task.title}`}
          className="text-primary hover:underline"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          type="button"
          aria-label={`Delete task: ${task.title}`}
          className="text-destructive hover:underline"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
