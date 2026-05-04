import { expect, test } from "@playwright/test";

// Purpose:
// Encodes measurable rules from the approved visual mockup/reference image.
// Use this when a UI detail can be verified through DOM structure, computed CSS,
// asset loading, or layout position instead of maintaining a pixel snapshot.
test.describe("Visual mockup v1 contract", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("dashboard follows the approved v1 composition on desktop", async ({ page }) => {
    test.skip((page.viewportSize()?.width || 0) < 760, "Desktop composition contract is covered by desktop project.");

    const hero = page.locator(".hero-panel");
    const stats = page.getByText("Library Stats").locator("xpath=ancestor::aside[contains(@class, 'content-card')]");
    const popular = page.getByText("Popular Snippets").locator("xpath=ancestor::aside[contains(@class, 'content-card')]");

    await expect(page.locator(".sidebar-info-card")).toHaveCount(0);
    await expect(page.locator(".sidebar-block")).toHaveCount(0);
    await expect(hero).toBeVisible();
    await expect(hero.locator(".hero-panel-asset")).toBeVisible();
    await expect(page.locator(".nav-item .nav-icon")).toHaveCount(5);
    await expect(page.locator(".hero-feature-row .feature-icon img")).toHaveCount(3);
    await expect(page.locator("#shortcutGrid .shortcut-icon-img")).toHaveCount(6);
    await expect(page.locator("#statsList .stat-icon-img")).toHaveCount(5);

    // The generated hero panel asset must be present and decoded by the browser.
    const heroAssetLoaded = await hero.locator(".hero-panel-asset").evaluate(image => {
      return image instanceof HTMLImageElement && image.naturalWidth > 0;
    });
    expect(heroAssetLoaded).toBe(true);

    const heroBox = await hero.boundingBox();
    const statsBox = await stats.boundingBox();
    const popularBox = await popular.boundingBox();
    expect(heroBox).not.toBeNull();
    expect(statsBox).not.toBeNull();
    expect(popularBox).not.toBeNull();
    expect(statsBox!.x).toBeGreaterThan(heroBox!.x + heroBox!.width);
    expect(popularBox!.x).toBeGreaterThan(heroBox!.x + heroBox!.width);
  });

  test("dashboard controls match the approved v1 visual details", async ({ page }) => {
    const viewAllButton = page.locator(".dashboard-featured-card .link-button", { hasText: "View all" });
    const themeToggle = page.locator("#themeToggle");

    await expect(viewAllButton).toBeVisible();
    await expect(themeToggle).toBeVisible();

    const viewAllStyle = await viewAllButton.evaluate(element => {
      const style = getComputedStyle(element);
      return {
        borderRadius: style.borderRadius,
        minHeight: style.minHeight,
        textTransform: style.textTransform
      };
    });

    expect(viewAllStyle.borderRadius).toBe("8px");
    expect(viewAllStyle.minHeight).toBe("36px");
    expect(viewAllStyle.textTransform).toBe("uppercase");

    const toggleStyle = await themeToggle.evaluate(element => {
      const style = getComputedStyle(element);
      const thumb = getComputedStyle(element, "::before");
      const scene = getComputedStyle(element, "::after");
      return {
        width: style.width,
        minHeight: style.minHeight,
        borderRadius: style.borderRadius,
        backgroundColor: style.backgroundColor,
        backgroundImage: style.backgroundImage,
        borderWidth: style.borderWidth,
        thumbWidth: thumb.width,
        thumbHeight: thumb.height,
        sceneOpacity: scene.opacity
      };
    });

    expect(toggleStyle.width).toBe("96px");
    expect(toggleStyle.minHeight).toBe("44px");
    expect(toggleStyle.borderRadius).toBe("999px");
    expect(toggleStyle.backgroundColor).toBe("rgba(0, 0, 0, 0)");
    expect(toggleStyle.backgroundImage).toContain("radial-gradient");
    expect(toggleStyle.backgroundImage).toContain("linear-gradient");
    expect(toggleStyle.borderWidth).toBe("0px");
    expect(toggleStyle.thumbWidth).toBe("36px");
    expect(toggleStyle.thumbHeight).toBe("36px");
    expect(toggleStyle.sceneOpacity).toBe("0.96");
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

    await expect(page.locator("#componentGrid .card-usage")).toHaveCount(0);

    // badge-row spans should size to their text, while the row still spans the card width.
    const firstCard = page.locator("#componentGrid .component-card").first();
    const layout = await firstCard.evaluate(card => {
      const badgeRow = card.querySelector(".badge-row") as HTMLElement;
      const badge = badgeRow.querySelector("span") as HTMLElement;
      const actionRow = card.querySelector(".card-action-row") as HTMLElement;
      const cardBox = card.getBoundingClientRect();
      const badgeBox = badgeRow.getBoundingClientRect();
      const firstBadgeBox = badge.getBoundingClientRect();
      return {
        badgeWidth: Math.round(badgeBox.width),
        cardInnerWidth: Math.round(cardBox.width - 32),
        firstBadgeWidth: Math.round(firstBadgeBox.width),
        actionJustify: getComputedStyle(actionRow).justifyContent
      };
    });

    expect(layout.badgeWidth).toBeGreaterThanOrEqual(layout.cardInnerWidth - 2);
    expect(layout.firstBadgeWidth).toBeLessThan(92);
    expect(layout.actionJustify).toBe("flex-end");
  });

  test("snippets and modals follow the current visual contract", async ({ page }) => {
    await page.getByRole("link", { name: "Snippets" }).click();

    await expect(page.locator(".snippet-card small")).toHaveCount(0);
    await expect(page.locator(".snippet-copy .snippet-copy-icon")).toHaveCount(16);

    // The copy button should fill the snippet card width and use the approved asset icon.
    const snippetCopyStyle = await page.locator(".snippet-copy").first().evaluate(element => {
      const style = getComputedStyle(element);
      return {
        borderRadius: style.borderRadius,
        minHeight: style.minHeight,
        width: style.width,
        parentWidth: `${Math.round((element.parentElement as HTMLElement).getBoundingClientRect().width)}px`,
        backgroundColor: style.backgroundColor
      };
    });

    expect(snippetCopyStyle.borderRadius).toBe("8px");
    expect(snippetCopyStyle.minHeight).toBe("34px");
    expect(Math.round(parseFloat(snippetCopyStyle.width))).toBe(Math.round(parseFloat(snippetCopyStyle.parentWidth)));
    expect(snippetCopyStyle.backgroundColor).toBe("rgb(238, 248, 255)");

    await page.getByRole("button", { name: "Add Component" }).click();
    const addDialog = page.getByRole("dialog", { name: "Add Component" });
    await expect(addDialog).toBeVisible();
    await expect(addDialog.locator(".add-preview-panel .live-preview")).toBeVisible();
    await expect(addDialog.locator(".add-preview-panel .live-preview")).toContainText("Preview appears here");
    await addDialog.getByRole("button", { name: "Close add component" }).click();

    await page.getByRole("link", { name: "Components" }).click();
    await page.locator("[data-component-id='btn-glow-primary']").getByRole("button", { name: "View Component" }).click();
    const viewDialog = page.getByRole("dialog", { name: "Glow Button" });
    await expect(viewDialog).toBeVisible();
    await expect(viewDialog.locator("#modalPreview")).toBeVisible();
    await expect(viewDialog.locator(".related-box")).toHaveCount(0);
    await expect(viewDialog.locator("#modalMeta")).not.toContainText("Views:");
    await expect(viewDialog.locator("#modalMeta")).not.toContainText("Copy Count:");

    const modalPreviewMinHeight = await viewDialog.locator("#modalPreview").evaluate(element => getComputedStyle(element).minHeight);
    expect(modalPreviewMinHeight).toBe("415px");
  });
});
