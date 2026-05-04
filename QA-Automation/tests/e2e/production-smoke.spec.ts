import { expect, test } from "@playwright/test";
import { sections } from "../support/test-data.js";

// Purpose:
// Production readiness smoke tests for the deployed site.
// This file intentionally avoids API readiness for now; add API/config checks later
// when real production/staging API contracts are available.
test.describe("Production readiness smoke", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads the production app shell and primary navigation", async ({ page }) => {
    await expect(page).toHaveTitle("Component Library");

    for (const section of sections) {
      await expect(page.getByRole("link", { name: section })).toBeVisible();
    }
  });

  test("opens each primary section on the deployed URL", async ({ page }) => {
    for (const section of sections) {
      await page.getByRole("link", { name: section }).click();
      await expect(page.locator(`#${section.toLowerCase()}`)).toHaveClass(/is-visible/);
    }
  });

  test("runs a critical component view flow", async ({ page }) => {
    await page.getByRole("link", { name: "Components" }).click();
    await page.locator("[data-component-id='btn-glow-primary']").getByRole("button", { name: "View Component" }).click();

    const dialog = page.getByRole("dialog", { name: "Glow Button" });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("#modalPreview")).toBeVisible();
  });
});
