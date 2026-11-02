import { expect, test } from "vitest";
import { boardReducer, initialBoard } from "./board";

test("SPEC-002.005-prove-levels: a new Task goes to the first Column", () => {
  const board = boardReducer(initialBoard, {
    type: "addTask",
    taskId: "task-1",
    fields: { title: "Write the report", description: "", priority: "Medium" },
  });

  expect(board.columns.map((column) => column.tasks.map((task) => task.title))).toEqual([
    ["Write the report"],
    [],
    [],
    [],
    [],
  ]);
});
