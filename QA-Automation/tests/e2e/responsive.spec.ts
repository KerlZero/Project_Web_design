import { expect, test } from "@playwright/test";

// Purpose:
// Guards against layout overflow across Playwright projects.
// The same test runs in desktop and mobile viewports from playwright.config.ts.
test.describe("Responsive layout", () => {
  test("does not create horizontal overflow", async ({ page }) => {
    await page.goto("/");

    const hasOverflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth > root.clientWidth + 1;
    });

    expect(hasOverflow).toBe(false);
  });
});
