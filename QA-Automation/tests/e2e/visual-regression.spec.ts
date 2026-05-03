import { expect, test } from "@playwright/test";

test.describe("Visual regression", () => {
  test("matches approved dashboard snapshot", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot("dashboard-v1.png", { fullPage: true });
  });
});
