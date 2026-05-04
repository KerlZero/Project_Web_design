// Shared literals used by non-visual contract tests.
// Keeping them here prevents each spec from drifting when the approved v1 copy changes.
export const sections = ["Dashboard", "Components", "Snippets", "Code", "Categories"] as const;

export const forbiddenWords = [/\bdownload(s|ed|ing)?\b/i, /\bdeveloper(s)?\b/i];

export const requiredDesignText = [
  "Component Library",
  "Featured Categories",
  "Recent components",
  "Library Stats",
  "Popular Snippets"
] as const;
