"use client";

import { useReducer, useState } from "react";
import { boardReducer, initialBoard, type Task } from "@/lib/board";
import { Column } from "./column";
import { DeleteTaskDialog } from "./delete-task-dialog";
import { buttonStyles } from "./dialog";
import { TaskDialog } from "./task-dialog";

type OpenDialog =
  | { kind: "add" }
  | { kind: "edit"; task: Task }
  | { kind: "delete"; task: Task }
  | null;

// The Card being dragged and, while it is over a Column, where it would land.
type DragState = {
  taskId: string;
  target: { columnId: string; beforeTaskId: string | null } | null;
} | null;

export function Board() {
  // In memory only: every page load starts from the empty initial Board.
  const [board, dispatch] = useReducer(boardReducer, initialBoard);
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null);
  const closeDialog = () => setOpenDialog(null);
  const [drag, setDrag] = useState<DragState>(null);

  function setDropTarget(columnId: string, beforeTaskId: string | null) {
    setDrag((current) => {
      if (!current) return current;
      const { target } = current;
      // dragover fires continuously; skip re-renders when nothing moved.
      if (target?.columnId === columnId && target.beforeTaskId === beforeTaskId) return current;
      return { ...current, target: { columnId, beforeTaskId } };
    });
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Board</h1>
        <button
          type="button"
          className={buttonStyles.primary}
          onClick={() => setOpenDialog({ kind: "add" })}
        >
          Add Task
        </button>
      </header>
      {/* Columns share the width equally and wrap onto new rows below 14rem each. */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] items-start gap-4">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onEditTask={(task) => setOpenDialog({ kind: "edit", task })}
            onDeleteTask={(task) => setOpenDialog({ kind: "delete", task })}
            onRenameColumn={(name) =>
              dispatch({ type: "renameColumn", columnId: column.id, name })
            }
            draggingTaskId={drag?.taskId ?? null}
            dropBeforeTaskId={
              drag?.target?.columnId === column.id ? drag.target.beforeTaskId : undefined
            }
            onDragTaskStart={(task) => setDrag({ taskId: task.id, target: null })}
            // Fires after a drop, and also when the Card is released outside a
            // Column or the drag is cancelled, which leaves the Board unchanged.
            onDragTaskEnd={() => setDrag(null)}
            onDragOver={(beforeTaskId) => setDropTarget(column.id, beforeTaskId)}
            onDragLeave={() =>
              setDrag((current) =>
                current?.target?.columnId === column.id ? { ...current, target: null } : current,
              )
            }
            onDrop={(beforeTaskId) => {
              if (drag) {
                dispatch({
                  type: "moveTask",
                  taskId: drag.taskId,
                  toColumnId: column.id,
                  beforeTaskId,
                });
              }
              setDrag(null);
            }}
          />
        ))}
      </div>

      {openDialog?.kind === "add" && (
        <TaskDialog
          heading="Add Task"
          submitLabel="Add Task"
          initialFields={{ title: "", description: "" }}
          onSave={(fields) => {
            dispatch({ type: "addTask", taskId: crypto.randomUUID(), fields });
            closeDialog();
          }}
          onCancel={closeDialog}
        />
      )}
      {openDialog?.kind === "edit" && (
        <TaskDialog
          heading="Edit Task"
          submitLabel="Save"
          initialFields={openDialog.task}
          onSave={(fields) => {
            dispatch({ type: "editTask", taskId: openDialog.task.id, fields });
            closeDialog();
          }}
          onCancel={closeDialog}
        />
      )}
      {openDialog?.kind === "delete" && (
        <DeleteTaskDialog
          task={openDialog.task}
          onConfirm={() => {
            dispatch({ type: "deleteTask", taskId: openDialog.task.id });
            closeDialog();
          }}
          onCancel={closeDialog}
        />
      )}
    </div>
  );
}
