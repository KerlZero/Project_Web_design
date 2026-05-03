# Backlog To Requirement Process

## Input

- `_feature.md`
- `FUTURE_FEATURES.md`
- Current project context
- Explicit project owner instruction to start a feature

## Rule

SA/BA Agent must not start backlog analysis for implementation unless the project owner explicitly asks to start feature work.

## SA/BA Output

For each approved feature, create a requirement package containing:

- Goal
- User roles
- User stories
- Functional requirements
- Non-functional requirements
- Acceptance criteria
- Dependencies
- Risks and open questions

## Example

Backlog idea:

```text
Add Component By AI Agent
```

Requirement output:

```text
As an Admin, I want AI to generate a component record so that I can add reusable UI faster.
```

Acceptance direction:

```text
Given generated component data
When the user reviews and approves it
Then the component is saved into the component library data source.
```
