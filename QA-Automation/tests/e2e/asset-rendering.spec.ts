import { expect, test } from "@playwright/test";

test.describe("Asset rendering", () => {
  test("does not request missing image assets", async ({ page }) => {
    const missingAssets: string[] = [];

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
