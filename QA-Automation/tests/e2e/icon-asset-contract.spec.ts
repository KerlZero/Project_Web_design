import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

type AssetManifest = {
  assets: Array<{
    id: string;
    type: string;
    source: string;
    target: string;
    required: boolean;
  }>;
};

test.describe("Icon asset handoff contract", () => {
  test("required v1 icon assets exist in design and source handoff folders", async () => {
    const manifestPath = resolve("..", "Design-System-Library", "Assets", "v1", "manifest.json");
    const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as AssetManifest;
    const requiredIcons = manifest.assets.filter(asset => asset.type === "icon" && asset.required);

    expect(requiredIcons.length).toBeGreaterThanOrEqual(20);

    for (const asset of requiredIcons) {
      expect(existsSync(resolve("..", asset.source)), `${asset.id} source missing`).toBe(true);
      expect(existsSync(resolve("..", asset.target)), `${asset.id} target missing`).toBe(true);
    }
  });

  test("renders navigation, feature, category, stat, and search icons from assets", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".nav-item .nav-icon")).toHaveCount(5);
    await expect(page.locator(".hero-feature-row .feature-icon img")).toHaveCount(3);
    await expect(page.locator("#shortcutGrid .shortcut-icon-img")).toHaveCount(6);
    await expect(page.locator("#statsList .stat-icon-img")).toHaveCount(5);
    await expect(page.locator(".search-wrap .search-icon-img")).toHaveCount(1);

    const brokenIcons = await page.locator("img[src^='assets/icons/']").evaluateAll(images => {
      return images
        .filter(image => image instanceof HTMLImageElement && image.naturalWidth === 0)
        .map(image => image.getAttribute("src"));
    });

    expect(brokenIcons).toEqual([]);
  });
});
