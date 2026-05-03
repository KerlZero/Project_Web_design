# QA Automation Loop

## Purpose

QA Automation Agent validates the implementation with Playwright Test Kit written in TypeScript.

## QA Scope

- Design contract
- User flows
- Visual regression
- Responsive behavior
- Asset rendering
- Missing asset or 404 detection

## Recommended Test Groups

```text
QA-Automation/tests/e2e/
  design-contract.spec.ts
  user-flow.spec.ts
  visual-regression.spec.ts
  asset-rendering.spec.ts
  responsive.spec.ts
```

## Result Routing

- Pass: approve build.
- Code or layout mismatch: route to Developer Agent.
- Design ambiguity: route to UX/UI Agent.
- Requirement ambiguity: route to SA/BA Agent.
- Asset missing from design package: route to UX/UI Agent.
- Asset exists but not integrated: route to Developer Agent.

## Snapshot Rule

Visual snapshots may be updated only after UX/UI Agent approves the new visual baseline.
