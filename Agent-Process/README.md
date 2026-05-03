# Agent Process

This folder defines the working process for SA/BA, UX/UI, Developer, and QA Automation agents.

## Current Operating Mode

The current mode is `v1 bugfix`.

Future backlog ideas are stored, but they must not be implemented until the project owner explicitly starts feature work.

## Main Flow

```text
Request or Issue
  -> SA/BA Agent
  -> Requirements
  -> UX/UI Agent
  -> Design Package and Assets
  -> Developer Agent
  -> SourceCode
  -> QA Automation Agent
  -> Playwright TypeScript QA Loop
```

## Process Documents

- `roles.md`: Agent ownership and responsibilities
- `workflow.md`: End-to-end workflow and routing rules
- `acceptance-gates.md`: Required gates before approval
- `backlog-to-requirement.md`: Future feature requirement process
- `asset-handoff.md`: UX/UI asset generation and Developer integration
- `missing-asset-escalation.md`: What happens when Developer cannot find a required asset
- `qa-loop.md`: Playwright TypeScript QA loop
