import { expect, test } from "@playwright/test";

// Purpose:
// Exercises user-facing behavior instead of pure visual matching.
// These tests verify that navigation, filters, modals, and admin action buttons
// still work after design or source-code changes.
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

  test("snippet section view all opens components with matching criteria", async ({ page }) => {
    await page.getByRole("link", { name: "Snippets" }).click();

    // "View all" carries the snippet section criteria into the Components tab.
    await page.locator(".snippet-section", { has: page.getByRole("heading", { name: "Buttons" }) })
      .getByRole("button", { name: "View all" })
      .click();

    await expect(page.locator("#components")).toHaveClass(/is-visible/);
    await expect(page.locator("#categoryFilter")).toHaveValue("Buttons");
    await expect(page.getByRole("heading", { name: "Glow Button" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Loading Bar" })).toBeHidden();
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

  test("code table action buttons work for view, edit, duplicate, json, export, and delete", async ({ page }) => {
    await page.getByRole("link", { name: "Code" }).click();
    const glowButtonRow = page.getByRole("row", { name: /btn-glow-primary\s+Glow Button/ });

    // View opens the read-only component modal from the Code tab.
    await glowButtonRow.getByLabel("View component").click();
    await expect(page.getByRole("dialog", { name: "Glow Button" })).toBeVisible();
    await page.getByRole("button", { name: "Close modal" }).click();

    // Edit opens the Add/Edit modal without creating a new item until saved.
    await glowButtonRow.getByLabel("Edit component").click();
    await expect(page.getByRole("dialog", { name: "Edit Component" })).toBeVisible();
    await page.getByRole("button", { name: "Close add component" }).click();

    // Duplicate should immediately append a copy to the in-memory component table.
    await glowButtonRow.getByLabel("Duplicate component").click();
    await expect(page.locator("#adminTable")).toContainText("Glow Button Copy");

    // JSON preview and export validate both modal rendering and clipboard fallback behavior.
    await glowButtonRow.getByLabel("JSON preview").click();
    await expect(page.getByRole("dialog", { name: "Component JSON" })).toBeVisible();
    await expect(page.locator("#jsonModalCode")).toContainText('"id": "btn-glow-primary"');
    await page.getByRole("button", { name: "Close JSON preview" }).click();

    await glowButtonRow.getByLabel("Export JSON").click();
    await expect(page.locator("#toast")).toContainText("JSON copied");

    // Delete confirms the browser dialog, then checks the target row is removed from the table.
    page.once("dialog", dialog => dialog.accept());
    const alertRow = page.getByRole("row", { name: /alert-info\s+Alert Box/ });
    await alertRow.getByLabel("Delete component").click();
    await expect(page.locator("#adminTable")).not.toContainText("alert-info");
  });
});
