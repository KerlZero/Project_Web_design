# Asset Handoff

## Purpose

Some components, CSS classes, and visual states require images, icons, emoji graphics, or textures. UX/UI Agent owns asset creation. Developer Agent owns asset integration.

## UX/UI Agent Provides

- Generated asset files
- Asset manifest
- Usage target such as component, page, selector, or CSS class
- Alt text or accessibility note
- Required or optional status

## Developer Agent Consumes

- Source asset path
- Target asset path
- `usedBy` selector or component mapping
- Asset type and format
- Required flag

## Recommended Folders

```text
Design-System-Library/Assets/v1/
  manifest.json
  images/
  icons/
  emoji/
  textures/

SourceCode/assets/
  images/
  icons/
  emoji/
  textures/
```

## Developer Rule

Developer Agent must not invent or replace required design-owned assets. Missing required assets must be escalated to UX/UI Agent.
