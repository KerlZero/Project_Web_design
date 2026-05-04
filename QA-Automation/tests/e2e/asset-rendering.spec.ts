import { expect, test } from "@playwright/test";

// Purpose:
// Verifies that image/SVG assets referenced by the web UI can be loaded by the browser.
// This catches broken handoffs where UX/UI adds an asset reference but the source file is
// missing from SourceCode/assets or the path in HTML/CSS/JS is incorrect.
test.describe("Asset rendering", () => {
  test("does not request missing image assets", async ({ page }) => {
    const missingAssets: string[] = [];

    // Collect failed image-like responses while the main UI tabs render.
    page.on("response", response => {
      const url = response.url();
      const isAsset = /\.(png|jpe?g|svg|webp|gif)$/i.test(url);
      if (isAsset && response.status() >= 400) {
        missingAssets.push(`${response.status()} ${url}`);
      }
    });

    await page.goto("/");
    await page.getByRole("link", { name: "Components" }).click();
    await page.getByRole("link", { name: "Snippets" }).click();

    expect(missingAssets).toEqual([]);
  });
});
