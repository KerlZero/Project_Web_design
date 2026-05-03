import { expect, test } from "@playwright/test";

test.describe("Component Library v1 user flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("filters the component catalog", async ({ page }) => {
    await page.getByRole("link", { name: "Components" }).click();
    await page.locator("#categoryFilter").selectOption("Buttons");

    await expect(page.getByRole("heading", { name: "Glow Button" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Loading Bar" })).toBeHidden();
  });

  test("opens component modal with preview and code tabs", async ({ page }) => {
    await page.getByRole("link", { name: "Components" }).click();
    await page.locator("[data-component-id='btn-glow-primary']").getByRole("button", { name: "View Component" }).click();

    const dialog = page.getByRole("dialog", { name: "Glow Button" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Preview" })).toBeVisible();

    await dialog.getByRole("button", { name: "CSS", exact: true }).click();
    await expect(page.locator("#modalCode")).toContainText(".glow-button");
  });

  test("edits an existing component without creating a duplicate", async ({ page }) => {
    await page.getByRole("link", { name: "Code" }).click();
    await page.locator("[data-edit='btn-glow-primary']").click();

    const dialog = page.getByRole("dialog", { name: "Edit Component" });
    await expect(dialog).toBeVisible();
    await dialog.getByLabel("Name").fill("Glow Button Edited");
    await dialog.getByRole("button", { name: "Save to JSON" }).scrollIntoViewIfNeeded();
    await dialog.getByRole("button", { name: "Save to JSON" }).click();

    await expect(page.getByRole("heading", { name: "Glow Button Edited" })).toHaveCount(1);
  });
});
