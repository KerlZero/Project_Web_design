import { expect, test } from "@playwright/test";

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
