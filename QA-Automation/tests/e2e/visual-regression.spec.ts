import { expect, test } from "@playwright/test";

// Purpose:
// Pixel-regression snapshots for the approved desktop UI.
// Tab snapshots are full-page so the active sidebar/tab state is visible.
// Modal snapshots intentionally target only the modal container to keep them stable.
test.describe("Visual regression", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    // Mobile screenshots are skipped by request; responsive behavior is covered separately.
    test.skip(testInfo.project.name.includes("mobile"), "Visual snapshots are approved on desktop only.");
    await page.goto("/");
    await page.mouse.move(0, 0);
  });

  test("matches approved dashboard snapshot", async ({ page }) => {
    await page.mouse.move(0, 0);
    await expect(page).toHaveScreenshot("dashboard-v1.png", { fullPage: true });
  });

  test("matches approved components snapshot", async ({ page }) => {
    await page.getByRole("link", { name: "Components" }).click();
    await page.mouse.move(0, 0);
    await expect(page).toHaveScreenshot("components-v1.png", { fullPage: true });
  });

  test("matches approved snippets snapshot", async ({ page }) => {
    await page.getByRole("link", { name: "Snippets" }).click();
    await page.mouse.move(0, 0);
    await expect(page).toHaveScreenshot("snippets-v1.png", { fullPage: true });
  });

  test("matches approved code snapshot", async ({ page }) => {
    await page.getByRole("link", { name: "Code" }).click();
    await page.mouse.move(0, 0);
    await expect(page).toHaveScreenshot("code-v1.png", { fullPage: true });
  });

  test("matches approved categories snapshot", async ({ page }) => {
    await page.getByRole("link", { name: "Categories" }).click();
    await page.mouse.move(0, 0);
    await expect(page).toHaveScreenshot("categories-v1.png", { fullPage: true });
  });

  test("matches approved view component modal snapshot", async ({ page }) => {
    await page.getByRole("link", { name: "Components" }).click();
    await page.locator("[data-component-id='btn-glow-primary']").getByRole("button", { name: "View Component" }).click();
    await page.addStyleTag({
      content: "#componentModal { background: #06121f !important; backdrop-filter: none !important; overflow: hidden !important; }"
    });
    await page.mouse.move(0, 0);
    await expect(page.locator("#componentModal")).toHaveScreenshot("view-component-modal-v1.png");
  });

  test("matches approved add component modal snapshot", async ({ page }) => {
    await page.getByRole("button", { name: "Add Component" }).click();
    await page.addStyleTag({
      content: "#addModal .modal { max-height: none !important; overflow: visible !important; }"
    });
    await page.mouse.move(0, 0);
    await expect(page.locator("#addModal .modal")).toHaveScreenshot("add-component-modal-v1.png");
  });
});
