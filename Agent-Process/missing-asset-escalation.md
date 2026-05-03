# Missing Asset Escalation

## Trigger

Developer Agent triggers this process when a required asset is referenced by design, component notes, CSS, or the asset manifest but the asset file is missing or unclear.

## Developer Action

Developer Agent pauses only the blocked integration work and creates a missing asset request.

## Missing Asset Request Template

```json
{
  "requestId": "missing-asset-001",
  "requestedBy": "Developer Agent",
  "status": "needs-ux-ui-asset",
  "asset": {
    "id": "empty-state-component-icon",
    "type": "icon",
    "component": "Components Catalog Empty State",
    "usedBy": [".empty-state"],
    "expectedFormat": "svg or png",
    "expectedSize": "128x128",
    "visualPurpose": "Show empty search result in the approved visual style",
    "required": true,
    "temporaryFallbackAllowed": false
  },
  "reason": "The design requires this asset, but no matching file exists in the manifest or asset folder."
}
```

## UX/UI Action

- Create or generate the missing asset.
- Save it under the current asset version.
- Update `manifest.json`.
- Return the updated asset package to Developer Agent.

## QA Routing

- If asset exists but is not used correctly, route to Developer Agent.
- If asset does not exist or manifest is incomplete, route to UX/UI Agent.
