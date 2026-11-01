import { expect, test } from "@playwright/test";

test("SPEC-002.005-prove-levels: adding a Task shows its Card on the Board", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Add Task" }).click();
  await page.getByLabel("Title").fill("Write the report");
  await page.getByRole("dialog").getByRole("button", { name: "Add Task" }).click();

  const backlog = page.getByRole("region", { name: "Backlog" });
  await expect(backlog.getByRole("heading", { name: "Write the report" })).toBeVisible();
});
