import type { DragEvent } from "react";
import type { Column as ColumnData, Task } from "@/lib/board";
import { ColumnName } from "./column-name";
import { TaskCard } from "./task-card";

type ColumnProps = {
  column: ColumnData;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onRenameColumn: (name: string) => void;
  // Drag and drop (see docs/adr/0001-native-html5-drag-and-drop.md).
  draggingTaskId: string | null;
  // Where a dropped Card would land in this Column; undefined when this Column
  // isn't the drop target, null for the end of the Column.
  dropBeforeTaskId: string | null | undefined;
  onDragTaskStart: (task: Task) => void;
  onDragTaskEnd: () => void;
  onDragOver: (beforeTaskId: string | null) => void;
  onDragLeave: () => void;
  onDrop: (beforeTaskId: string | null) => void;
};

// The Card the pointer is above the middle of, or null for the end of the Column.
function beforeTaskIdAt(event: DragEvent<HTMLElement>): string | null {
  const cards = event.currentTarget.querySelectorAll<HTMLElement>("[data-task-id]");
  for (const card of cards) {
    const { top, height } = card.getBoundingClientRect();
    if (event.clientY < top + height / 2) return card.dataset.taskId ?? null;
  }
  return null;
}

export function Column({
  column,
  onEditTask,
  onDeleteTask,
  onRenameColumn,
  draggingTaskId,
  dropBeforeTaskId,
  onDragTaskStart,
  onDragTaskEnd,
  onDragOver,
  onDragLeave,
  onDrop,
}: ColumnProps) {
  const isDropTarget = dropBeforeTaskId !== undefined;
  const lastTask = column.tasks.at(-1);

  return (
    <section
      aria-label={column.name}
      className={`flex min-w-0 flex-col rounded-lg border bg-surface ${
        isDropTarget ? "border-primary ring-1 ring-primary" : "border-border"
      }`}
      // Only Card drags are accepted, so dragging text or files in does nothing.
      onDragOver={(event) => {
        if (draggingTaskId === null) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        onDragOver(beforeTaskIdAt(event));
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onDragLeave();
        }
      }}
      onDrop={(event) => {
        if (draggingTaskId === null) return;
        event.preventDefault();
        onDrop(beforeTaskIdAt(event));
      }}
    >
      <ColumnName name={column.name} onRename={onRenameColumn} />
      <ol className="flex min-h-32 flex-1 flex-col gap-2 p-2">
        {column.tasks.map((task) => (
          <li key={task.id} data-task-id={task.id} className="relative">
            {/* Drop indicators sit in the gap between Cards so they don't shift the layout. */}
            {dropBeforeTaskId === task.id && <DropIndicator position="-top-[5px]" />}
            <TaskCard
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task)}
              isDragging={draggingTaskId === task.id}
              onDragStart={() => onDragTaskStart(task)}
              onDragEnd={onDragTaskEnd}
            />
            {dropBeforeTaskId === null && task === lastTask && (
              <DropIndicator position="-bottom-[5px]" />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function DropIndicator({ position }: { position: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 h-0.5 rounded-full bg-primary ${position}`}
    />
  );
}
