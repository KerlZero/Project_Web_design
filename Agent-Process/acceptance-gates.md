# Acceptance Gates

## Requirement Gate

- SA/BA Agent confirms the request is in scope.
- For current work, the request must be a v1 bugfix unless the project owner explicitly starts feature work.
- Acceptance criteria are clear enough for UX/UI, Developer, and QA.

## Design Gate

- UX/UI Agent provides or confirms the design reference.
- Visual mockup and design plan are versioned when the design changes.
- Required assets are listed in the asset manifest.

## Development Gate

- Developer Agent implements only the approved scope.
- Required assets are copied into `SourceCode/assets`.
- Missing required assets are escalated to UX/UI Agent instead of recreated by Developer.

## QA Gate

- Playwright TypeScript tests pass.
- Required flows work.
- Responsive layouts have no horizontal overflow.
- Required assets render without missing requests.
- Visual regression is approved against the current UX/UI baseline.
