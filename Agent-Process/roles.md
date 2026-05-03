# Agent Roles

## SA/BA Agent

Owns requirement clarity.

- Classifies incoming work as bugfix, feature, design clarification, asset request, or QA issue.
- Converts approved backlog ideas into requirement packages.
- Keeps future backlog on hold until the project owner asks to start feature work.
- Resolves requirement ambiguity before UX/UI or Developer work begins.

## UX/UI Agent

Owns design and visual assets.

- Creates design plans, visual mockups, component states, responsive notes, and asset requirements.
- Generates images, icons, emoji graphics, textures, and other visual assets required by the design.
- Updates asset manifests.
- Responds to missing asset requests from Developer Agent.

## Developer Agent

Owns implementation.

- Implements only in `SourceCode`.
- Reads requirements, design plans, visual mockups, and asset manifests.
- Integrates assets from `Design-System-Library/Assets` into `SourceCode/assets`.
- Must not create design-owned assets directly.
- If a required asset is missing, creates a missing asset request and sends it to UX/UI Agent.

## QA Automation Agent

Owns automated validation.

- Uses Playwright Test Kit with TypeScript.
- Validates design contract, user flows, responsive behavior, visual regression, and asset rendering.
- Routes failures to Developer, UX/UI, or SA/BA based on root cause.
