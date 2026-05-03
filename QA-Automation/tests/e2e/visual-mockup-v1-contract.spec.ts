import { expect, test } from "@playwright/test";

test.describe("Visual mockup v1 contract", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("dashboard follows the approved v1 composition on desktop", async ({ page }) => {
    test.skip((page.viewportSize()?.width || 0) < 760, "Desktop composition contract is covered by desktop project.");

    const hero = page.locator(".hero-panel");
    const stats = page.getByText("Library Stats").locator("xpath=ancestor::aside[contains(@class, 'content-card')]");
    const popular = page.getByText("Popular Snippets").locator("xpath=ancestor::aside[contains(@class, 'content-card')]");

    await expect(page.getByLabel("Component Library summary")).toBeVisible();
    await expect(hero).toBeVisible();
    await expect(page.locator(".nav-item .nav-icon")).toHaveCount(5);
    await expect(page.locator(".hero-feature-row .feature-icon img")).toHaveCount(3);
    await expect(page.locator("#shortcutGrid .shortcut-icon-img")).toHaveCount(6);
    await expect(page.locator("#statsList .stat-icon-img")).toHaveCount(5);

    const heroBackground = await hero.evaluate(element => getComputedStyle(element).backgroundImage);
    expect(heroBackground).toContain("linear-gradient");

    const heroBox = await hero.boundingBox();
    const statsBox = await stats.boundingBox();
    const popularBox = await popular.boundingBox();
    expect(heroBox).not.toBeNull();
    expect(statsBox).not.toBeNull();
    expect(popularBox).not.toBeNull();
    expect(statsBox!.x).toBeGreaterThan(heroBox!.x + heroBox!.width);
    expect(popularBox!.x).toBeGreaterThan(heroBox!.x + heroBox!.width);
  });

  test("components catalog mirrors the mockup filter and preview structure", async ({ page }) => {
    await page.getByRole("link", { name: "Components" }).click();

    const categoryPills = page.getByLabel("Component categories");
    await expect(categoryPills).toBeVisible();
    await expect(categoryPills.getByRole("button", { name: "All" })).toBeVisible();
    await expect(categoryPills.getByRole("button", { name: "Buttons" })).toBeVisible();
    await expect(page.locator(".search-wrap .search-icon-img")).toBeVisible();

    await expect(page.locator("#componentGrid .component-card")).toHaveCount(6);

    const firstPreview = page.locator("#componentGrid .component-card .card-preview").first();
    const previewBackground = await firstPreview.evaluate(element => getComputedStyle(element).backgroundImage);
    expect(previewBackground).toContain("linear-gradient");
  });
});
