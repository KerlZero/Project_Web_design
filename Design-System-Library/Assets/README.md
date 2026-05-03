# Design Assets

This folder stores UX/UI-owned assets for the Component Library project.

## Ownership

UX/UI Agent owns generated assets and the asset manifest.

Developer Agent consumes these assets and copies approved files into `SourceCode/assets`.

## Versioning

Store assets by design version:

```text
Assets/
  v1/
    manifest.json
    images/
    icons/
    emoji/
    textures/
```

## Missing Assets

If Developer Agent cannot find a required asset, the request must go back to UX/UI Agent using the missing asset escalation process.
