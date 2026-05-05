# Feature Intake

This file is the first intake point for future feature ideas.

## Current Rule

- Current work mode is `v1 bugfix`.
- Do not implement future backlog items automatically.
- Future features start only when the project owner explicitly asks to start feature work.

## Backlog Source

- Main backlog file: `FUTURE_FEATURES.md`
- SA/BA Agent must analyze backlog ideas into requirements before UX/UI, Developer, or QA work begins.

## Feature Start Checklist

When the project owner asks to start a feature:

1. SA/BA Agent reads this file and `FUTURE_FEATURES.md`.
2. SA/BA Agent classifies the requested feature.
3. SA/BA Agent creates a requirement package under `Requirements/`.
4. UX/UI Agent starts design only after the requirement package is ready.
5. Developer Agent starts implementation only after design and asset handoff are ready.
6. QA Automation Agent validates the implementation with Playwright TypeScript tests.
