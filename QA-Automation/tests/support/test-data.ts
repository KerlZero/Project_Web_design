export const sections = ["Dashboard", "Components", "Snippets", "Code", "Categories"] as const;

export const forbiddenWords = [/\bdownload(s|ed|ing)?\b/i, /\bdeveloper(s)?\b/i];

export const requiredDesignText = [
  "Component Library",
  "Featured Categories",
  "Recent components",
  "Library Stats",
  "Popular Snippets"
] as const;
