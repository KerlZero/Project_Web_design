import { expect, test } from "@playwright/test";
import { forbiddenWords, requiredDesignText, sections } from "../support/test-data.js";

// Purpose:
// Checks the stable product/content contract for the Component Library v1 UI.
// These tests are not pixel-based; they make sure required labels, sections, and
// forbidden legacy wording stay aligned with the approved design direction.
test.describe("Component Library v1 design contract", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the required v1 dashboard content", async ({ page }) => {
    await expect(page).toHaveTitle("Component Library");

    for (const text of requiredDesignText) {
      await expect(page.getByText(text).first()).toBeVisible();
    }
  });

  test("shows all planned primary sections", async ({ page }) => {
    for (const section of sections) {
      await expect(page.getByRole("link", { name: section })).toBeVisible();
    }
  });

  test("keeps forbidden v1 wording out of the UI", async ({ page }) => {
    const bodyText = await page.locator("body").innerText();

    for (const forbiddenWord of forbiddenWords) {
      expect(bodyText).not.toMatch(forbiddenWord);
    }
  });
});
