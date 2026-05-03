# Workflow

## Current v1 Bugfix Flow

```text
Bug report or issue
  -> SA/BA Agent classifies scope
  -> Developer Agent fixes SourceCode
  -> QA Automation Agent runs Playwright TypeScript tests
  -> Pass: approve bugfix
  -> Fail: route back by root cause
```

## Future Feature Flow

```text
Project owner starts feature work
  -> SA/BA Agent reads _feature.md and FUTURE_FEATURES.md
  -> SA/BA Agent creates requirement package
  -> UX/UI Agent creates design package and assets
  -> Developer Agent implements
  -> QA Automation Agent validates
  -> Repeat until approved
```

## Routing Rules

- Requirement unclear: route to SA/BA Agent.
- Design unclear: route to UX/UI Agent.
- Required asset not created: route to UX/UI Agent.
- Asset exists but is not integrated: route to Developer Agent.
- Code, layout, or behavior mismatch: route to Developer Agent.
- Visual baseline needs to change: require UX/UI approval before update.

## Backlog Guardrail

Backlog items in `FUTURE_FEATURES.md` are not active work. They become active only after the project owner asks to start that feature.
