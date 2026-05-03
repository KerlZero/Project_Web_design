# QA Automation

Playwright Test Kit for validating the Component Library website.

## Scope

This folder is separate from `SourceCode`.

- `SourceCode` owns the website implementation.
- `QA-Automation` owns automated QA tests and reports.
- Tests serve the website from `../SourceCode`.

## Commands

```bash
npm install
npm run test:e2e
```

Use snapshot updates only after UX/UI approves a new visual baseline:

```bash
npm run test:e2e:update
```

## Test Coverage

- Design contract
- User flows
- Responsive layout
- Asset rendering
- Visual regression
