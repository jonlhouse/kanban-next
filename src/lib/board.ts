import type { Priority } from "./priority";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
};

export type Column = {
  id: string;
  name: string;
  tasks: Task[];
};

export type Board = {
  columns: Column[];
};

export type TaskFields = Pick<Task, "title" | "description" | "priority">;

// Fixed IDs keep the server prerender and the browser's first render identical.
export const initialBoard: Board = {
  columns: [
    { id: "backlog", name: "Backlog", tasks: [] },
    { id: "to-do", name: "To Do", tasks: [] },
    { id: "in-progress", name: "In Progress", tasks: [] },
    { id: "review", name: "Review", tasks: [] },
    { id: "done", name: "Done", tasks: [] },
  ],
};

export type BoardAction =
  | { type: "addTask"; taskId: string; fields: TaskFields }
  | { type: "editTask"; taskId: string; fields: TaskFields }
  | { type: "deleteTask"; taskId: string }
  | { type: "renameColumn"; columnId: string; name: string }
  // beforeTaskId null means the end of the Column.
  | { type: "moveTask"; taskId: string; toColumnId: string; beforeTaskId: string | null };

export function isBlank(text: string) {
  return text.trim() === "";
}

// Titles and descriptions are stored trimmed; a whitespace-only description
// becomes empty, so the Card shows no description.
function cleanTaskFields({ title, description, priority }: TaskFields): TaskFields {
  return { title: title.trim(), description: description.trim(), priority };
}

export function boardReducer(board: Board, action: BoardAction): Board {
  switch (action.type) {
    case "addTask": {
      if (isBlank(action.fields.title)) return board;
      // New Tasks always go to the end of the first Column, whatever its name.
      const [first, ...rest] = board.columns;
      const task = { id: action.taskId, ...cleanTaskFields(action.fields) };
      return { columns: [{ ...first, tasks: [...first.tasks, task] }, ...rest] };
    }
    case "editTask": {
      if (isBlank(action.fields.title)) return board;
      const fields = cleanTaskFields(action.fields);
      return {
        columns: board.columns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) =>
            task.id === action.taskId ? { ...task, ...fields } : task,
          ),
        })),
      };
    }
    case "deleteTask":
      return {
        columns: board.columns.map((column) => ({
          ...column,
          tasks: column.tasks.filter((task) => task.id !== action.taskId),
        })),
      };
    case "renameColumn": {
      // Duplicate Column names are allowed; renaming never touches its Tasks.
      if (isBlank(action.name)) return board;
      const name = action.name.trim();
      return {
        columns: board.columns.map((column) =>
          column.id === action.columnId ? { ...column, name } : column,
        ),
      };
    }
    case "moveTask": {
      const { taskId, toColumnId, beforeTaskId } = action;
      const task = board.columns.flatMap((column) => column.tasks).find((t) => t.id === taskId);
      if (!task || beforeTaskId === taskId) return board;
      if (!board.columns.some((column) => column.id === toColumnId)) return board;
      return {
        columns: board.columns.map((column) => {
          const tasks = column.tasks.filter((t) => t.id !== taskId);
          if (column.id === toColumnId) {
            const index = tasks.findIndex((t) => t.id === beforeTaskId);
            tasks.splice(index === -1 ? tasks.length : index, 0, task);
          }
          return { ...column, tasks };
        }),
      };
    }
  }
}
