import { expect, test } from "@playwright/test";

test("SPEC-001.001-add-priority: a new Task defaults to Medium Priority", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Add Task" }).click();
  const dialog = page.getByRole("dialog", { name: "Add Task" });
  await expect(dialog.getByLabel("Priority")).toHaveValue("Medium");
  await dialog.getByLabel("Title").fill("Write the report");
  await dialog.getByRole("button", { name: "Add Task" }).click();

  const card = page.getByRole("article").filter({ hasText: "Write the report" });
  await expect(card.getByRole("img", { name: "Medium Priority" })).toHaveText("●");
});

test("SPEC-001.003-recognize-priority: a Card reveals its Priority on hover and keyboard focus", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Add Task" }).click();
  const dialog = page.getByRole("dialog", { name: "Add Task" });
  await dialog.getByLabel("Title").fill("Write the report");
  await dialog.getByRole("button", { name: "Add Task" }).click();

  const card = page.getByRole("article").filter({ hasText: "Write the report" });
  const indicator = card.getByRole("img", { name: "Medium Priority" });
  const tooltip = card.getByRole("tooltip");
  await expect(tooltip).toBeHidden();
  await indicator.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText("Medium");
  await card.getByRole("heading").hover();
  await expect(tooltip).toBeHidden();

  await page.getByRole("button", { name: "Add Task" }).focus();
  for (let i = 0; i < 15 && !(await indicator.evaluate((element) => element === document.activeElement)); i++) {
    await page.keyboard.press("Tab");
  }
  await expect(indicator).toBeFocused();
  await expect(tooltip).toBeVisible();
});

test("SPEC-001.001-add-priority: Priority choices show four ordered icons and names", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Add Task" }).click();
  const priority = page.getByRole("dialog", { name: "Add Task" }).getByLabel("Priority");

  await expect(priority.locator("option")).toHaveText(["▲ Critical", "◆ High", "● Medium", "▼ Low"]);
  await expect(priority.locator("option:checked")).toHaveText("● Medium");
  await priority.selectOption("High");
  await expect(priority.locator("option:checked")).toHaveText("◆ High");
});

test("SPEC-001.001-add-priority: a selected Priority survives an invalid title and is saved", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Add Task" }).click();
  const dialog = page.getByRole("dialog", { name: "Add Task" });
  await dialog.getByLabel("Priority").selectOption("High");
  await dialog.getByRole("button", { name: "Add Task" }).click();

  await expect(dialog.getByText("Enter a task title.")).toBeVisible();
  await expect(dialog.getByLabel("Priority")).toHaveValue("High");
  await dialog.getByLabel("Title").fill("Urgent report");
  await dialog.getByRole("button", { name: "Add Task" }).click();

  const card = page.getByRole("article").filter({ hasText: "Urgent report" });
  await expect(card.getByRole("img", { name: "High Priority" })).toHaveText("◆");
});

test("SPEC-001.003-recognize-priority: moving a Task preserves its Priority and icon", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Add Task" }).click();
  const dialog = page.getByRole("dialog", { name: "Add Task" });
  await dialog.getByLabel("Title").fill("Urgent report");
  await dialog.getByLabel("Priority").selectOption("High");
  await dialog.getByRole("button", { name: "Add Task" }).click();

  const card = page.getByRole("article").filter({ hasText: "Urgent report" });
  await card.dragTo(page.getByRole("region", { name: "To Do" }));
  const moved = page.getByRole("region", { name: "To Do" }).getByRole("article");
  await expect(moved.getByRole("heading", { name: "Urgent report" })).toBeVisible();
  await expect(moved.getByRole("img", { name: "High Priority" })).toHaveText("◆");
});

test("SPEC-001.002-edit-priority: editing Task details preserves the chosen Priority", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Add Task" }).click();
  const addDialog = page.getByRole("dialog", { name: "Add Task" });
  await addDialog.getByLabel("Title").fill("Urgent report");
  await addDialog.getByLabel("Priority").selectOption("High");
  await addDialog.getByRole("button", { name: "Add Task" }).click();

  await page.getByRole("button", { name: "Edit task: Urgent report" }).click();
  const editDialog = page.getByRole("dialog", { name: "Edit Task" });
  await editDialog.getByLabel("Title").fill("Revised report");
  await editDialog.getByRole("button", { name: "Save" }).click();

  const card = page.getByRole("article").filter({ hasText: "Revised report" });
  await expect(card.getByRole("img", { name: "High Priority" })).toHaveText("◆");
});

test("SPEC-001.002-edit-priority: editing a Task selects its Priority and saves a change", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Add Task" }).click();
  const addDialog = page.getByRole("dialog", { name: "Add Task" });
  await addDialog.getByLabel("Title").fill("Write the report");
  await addDialog.getByRole("button", { name: "Add Task" }).click();

  await page.getByRole("button", { name: "Edit task: Write the report" }).click();
  const editDialog = page.getByRole("dialog", { name: "Edit Task" });
  const priority = editDialog.getByLabel("Priority");
  await expect(priority).toHaveValue("Medium");
  await expect(priority.locator("option:checked")).toHaveText("● Medium");
  await expect(priority.locator("option")).toHaveText(["▲ Critical", "◆ High", "● Medium", "▼ Low"]);
  await priority.selectOption("High");
  await editDialog.getByRole("button", { name: "Save" }).click();

  const card = page.getByRole("article").filter({ hasText: "Write the report" });
  await expect(card.getByRole("img", { name: "High Priority" })).toHaveText("◆");
  await card.getByRole("button", { name: "Edit task: Write the report" }).click();
  await expect(page.getByRole("dialog", { name: "Edit Task" }).getByLabel("Priority")).toHaveValue("High");
});

test("SPEC-001.002-edit-priority: canceling a Priority change retains the original Priority", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Add Task" }).click();
  const addDialog = page.getByRole("dialog", { name: "Add Task" });
  await addDialog.getByLabel("Title").fill("Write the report");
  await addDialog.getByRole("button", { name: "Add Task" }).click();

  const card = page.getByRole("article").filter({ hasText: "Write the report" });
  await card.getByRole("button", { name: "Edit task: Write the report" }).click();
  const editDialog = page.getByRole("dialog", { name: "Edit Task" });
  await editDialog.getByLabel("Priority").selectOption("High");
  await editDialog.getByRole("button", { name: "Cancel" }).click();

  await expect(card.getByRole("img", { name: "Medium Priority" })).toHaveText("●");
  await card.getByRole("button", { name: "Edit task: Write the report" }).click();
  await expect(editDialog.getByLabel("Priority")).toHaveValue("Medium");
});

test("SPEC-001.003-recognize-priority: changing Priority preserves manually ordered Cards", async ({ page }) => {
  await page.goto("/");
  for (const title of ["First Task", "Second Task", "Third Task"]) {
    await page.getByRole("button", { name: "Add Task" }).click();
    const dialog = page.getByRole("dialog", { name: "Add Task" });
    await dialog.getByLabel("Title").fill(title);
    await dialog.getByRole("button", { name: "Add Task" }).click();
  }

  const backlog = page.getByRole("region", { name: "Backlog" });
  const cards = backlog.getByRole("article");
  await cards.filter({ hasText: "First Task" }).dragTo(cards.filter({ hasText: "Third Task" }));
  await expect(cards.getByRole("heading")).toHaveText(["Second Task", "Third Task", "First Task"]);

  await page.getByRole("button", { name: "Edit task: Third Task" }).click();
  const dialog = page.getByRole("dialog", { name: "Edit Task" });
  await dialog.getByLabel("Priority").selectOption("High");
  await dialog.getByRole("button", { name: "Save" }).click();

  await expect(page.getByRole("article")).toHaveCount(3);
  await expect(cards.getByRole("heading")).toHaveText(["Second Task", "Third Task", "First Task"]);
  await expect(cards.filter({ hasText: "Third Task" }).getByRole("img", { name: "High Priority" })).toHaveText("◆");
});

test("SPEC-001.004-consistent-level-look: each Priority level has its Card's icon and color in the drop-down", async ({ page }) => {
  await page.goto("/");

  for (const level of ["Critical", "High", "Medium", "Low"]) {
    await page.getByRole("button", { name: "Add Task" }).click();
    const addDialog = page.getByRole("dialog", { name: "Add Task" });
    await addDialog.getByLabel("Title").fill(`${level} report`);
    const addPriority = addDialog.getByLabel("Priority");
    await addPriority.selectOption(level);
    const addOption = addPriority.locator("option:checked");
    const addOptionColor = await addOption.evaluate((element) => getComputedStyle(element).color);
    const addSelectedColor = await addPriority.evaluate((element) => getComputedStyle(element).color);
    const addOptionText = await addOption.innerText();
    await addDialog.getByRole("button", { name: "Add Task" }).click();

    const card = page.getByRole("article").filter({ hasText: `${level} report` });
    const icon = card.getByRole("img", { name: `${level} Priority` });
    const iconText = await icon.innerText();
    const iconColor = await icon.evaluate((element) => getComputedStyle(element).color);
    expect(addOptionText).toBe(`${iconText} ${level}`);
    expect(addOptionColor).toBe(iconColor);
    expect(addSelectedColor).toBe(iconColor);

    await card.getByRole("button", { name: `Edit task: ${level} report` }).click();
    const editDialog = page.getByRole("dialog", { name: "Edit Task" });
    const editPriority = editDialog.getByLabel("Priority");
    await expect(editPriority.locator("option:checked")).toHaveText(`${iconText} ${level}`);
    await expect(editPriority.locator("option:checked")).toHaveCSS("color", iconColor);
    await expect(editPriority).toHaveCSS("color", iconColor);
    await editDialog.getByRole("button", { name: "Cancel" }).click();
  }
});

test("SPEC-001.004-consistent-level-look: a Card's Priority name has no icon or color of its own", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Add Task" }).click();
  const dialog = page.getByRole("dialog", { name: "Add Task" });
  await dialog.getByLabel("Title").fill("Urgent report");
  await dialog.getByLabel("Priority").selectOption("Critical");
  await dialog.getByRole("button", { name: "Add Task" }).click();

  const card = page.getByRole("article").filter({ hasText: "Urgent report" });
  const icon = card.getByRole("img", { name: "Critical Priority" });
  await icon.hover();
  const tooltip = card.getByRole("tooltip");
  await expect(tooltip).toHaveText("Critical");
  await expect(tooltip).toHaveCSS("color", "rgb(255, 255, 255)");
});

test("SPEC-001.004-consistent-level-look: choosing a Priority level by keyboard keeps its name readable and shows its color", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Add Task" }).click();
  const dialog = page.getByRole("dialog", { name: "Add Task" });
  await dialog.getByLabel("Title").fill("Urgent report");
  const priority = dialog.getByRole("combobox", { name: "Priority" });
  await priority.focus();
  await page.keyboard.press("ArrowUp");
  await expect(priority).toHaveValue("High");
  const selectedColor = await priority.evaluate((element) => getComputedStyle(element).color);
  await dialog.getByRole("button", { name: "Add Task" }).click();

  const card = page.getByRole("article").filter({ hasText: "Urgent report" });
  await expect(card.getByRole("img", { name: "High Priority" })).toHaveCSS("color", selectedColor);
});
