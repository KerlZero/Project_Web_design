# Component Library - Design Diagrams

เอกสารนี้เป็น design diagram เท่านั้น ยังไม่ใช่ implementation plan และยังไม่เริ่มทำ feature ใหม่

Base project: `Component Library` web สำหรับเก็บ reusable UI components, snippets, preview และ code ตัวอย่าง

Future feature base: `FUTURE_FEATURES.md`

## 1. Current V1 Flow - View And Copy Component

```mermaid
sequenceDiagram
    actor User as User / Guest
    participant UI as Component Library UI
    participant Store as Browser LocalStorage

    User->>UI: Open website
    UI->>Store: Load component records
    Store-->>UI: Return saved records or seed data
    UI-->>User: Show dashboard, categories, snippets, code library

    User->>UI: Select component card / View Component
    UI->>Store: Increase view count
    UI-->>User: Show component modal

    User->>UI: Switch code tab HTML / CSS / JavaScript / Notes
    UI-->>User: Show selected code block

    User->>UI: Copy code
    UI->>Store: Increase copy count
    UI-->>User: Show copied feedback
```

## 2. Current V1 Flow - Add Component As JSON-Style Data

```mermaid
sequenceDiagram
    actor Admin as Admin / Editor
    participant UI as Add Component UI
    participant Preview as Preview Renderer
    participant Store as Browser LocalStorage
    participant Catalog as Component Catalog

    Admin->>UI: Click Add Component
    UI-->>Admin: Show Add Component form
    Admin->>UI: Fill metadata, category, tags, HTML, CSS, JavaScript, notes
    Admin->>Preview: Click Preview
    Preview-->>Admin: Render temporary component preview
    Admin->>UI: Save to JSON
    UI->>Store: Save component record
    Store-->>UI: Save success
    UI->>Catalog: Refresh component list, snippets, stats
    Catalog-->>Admin: New component is visible
```

## 3. Future Flow - Add Component By AI Agent From URL Or Clip

```mermaid
sequenceDiagram
    actor User as Admin / Dev / UX/UI Design
    participant UI as Component Library UI
    participant Agent as AI Agent
    participant Analyzer as URL / Clip Analyzer
    participant Review as Review Screen
    participant DB as Component Database

    User->>UI: Submit URL or video clip
    UI->>Agent: Send source and requested extraction type
    Agent->>Analyzer: Analyze UI, interaction, layout, and code clues
    Analyzer-->>Agent: Return extracted component candidates
    Agent-->>UI: Generate component records
    UI-->>Review: Show preview, metadata, HTML, CSS, JavaScript, notes
    User->>Review: Approve or edit generated component
    Review->>DB: Save approved component record
    DB-->>UI: Sync saved component to catalog
    UI-->>User: Component is available in Components and Snippets
```

## 4. Future Flow - Login And Permission

```mermaid
sequenceDiagram
    actor User as User
    participant UI as Component Library UI
    participant Auth as Auth Service
    participant DB as Database
    participant Policy as Permission Policy

    User->>UI: Open website
    UI->>Auth: Check session
    Auth-->>UI: No active session
    UI-->>User: Show Guest browsing mode

    User->>UI: Login
    UI->>Auth: Submit credentials
    Auth->>DB: Validate user and role
    DB-->>Auth: User role
    Auth-->>UI: Session and role
    UI->>Policy: Check allowed actions
    Policy-->>UI: Allowed menu/actions by role
    UI-->>User: Show role-based dashboard
```

## 5. Future Flow - Delete Component

```mermaid
sequenceDiagram
    actor Admin as Admin
    participant UI as Code Library UI
    participant Policy as Permission Policy
    participant DB as Component Database
    participant Audit as Audit Log

    Admin->>UI: Click Delete on component
    UI->>Policy: Verify delete permission
    Policy-->>UI: Allowed
    UI-->>Admin: Show confirmation modal
    Admin->>UI: Confirm delete
    UI->>DB: Archive or delete component
    DB-->>UI: Delete success
    UI->>Audit: Log delete action
    UI-->>Admin: Refresh component records
```

## 6. Future Flow - Full Website Design Support

```mermaid
sequenceDiagram
    actor UX as UX/UI Design
    actor Dev as Dev
    participant UI as Component Library UI
    participant DB as Design Database
    participant Preview as Full Website Preview

    UX->>UI: Create full website design record
    UI->>DB: Save pages, sections, layout, style tokens, components
    DB-->>UI: Design saved
    UI->>Preview: Render full website preview
    Preview-->>UX: Show page-level design

    Dev->>UI: Open approved website design
    UI->>DB: Load full design structure
    DB-->>UI: Return pages, sections, components, code snippets
    UI-->>Dev: Show implementation reference
```

## 7. Use Case Diagram

```mermaid
flowchart LR
    Guest[Guest]
    Admin[Admin]
    Dev[Dev]
    UX[UX/UI Design]
    AIAgent[AI Agent]

    subgraph System[Component Library]
        UC1((Browse components))
        UC2((Search and filter))
        UC3((View component preview))
        UC4((Copy code snippet))
        UC5((View JSON preview))
        UC6((Add component))
        UC7((Edit component))
        UC8((Delete component))
        UC9((Manage JSON records))
        UC10((Login))
        UC11((Manage permissions))
        UC12((Generate component from URL or clip))
        UC13((Review AI generated component))
        UC14((Store full website design))
        UC15((View full website preview))
    end

    Guest --> UC1
    Guest --> UC2
    Guest --> UC3
    Guest --> UC4

    Admin --> UC1
    Admin --> UC2
    Admin --> UC3
    Admin --> UC4
    Admin --> UC5
    Admin --> UC6
    Admin --> UC7
    Admin --> UC8
    Admin --> UC9
    Admin --> UC10
    Admin --> UC11
    Admin --> UC13

    Dev --> UC1
    Dev --> UC3
    Dev --> UC4
    Dev --> UC5
    Dev --> UC6
    Dev --> UC7
    Dev --> UC10
    Dev --> UC13
    Dev --> UC15

    UX --> UC1
    UX --> UC3
    UX --> UC6
    UX --> UC7
    UX --> UC10
    UX --> UC13
    UX --> UC14
    UX --> UC15

    AIAgent --> UC12
    UC12 --> UC13
```

## 8. ER Diagram - Database Option

ใช้ในกรณี future version เปลี่ยนจาก browser localStorage / static JSON ไปเป็น database

```mermaid
erDiagram
    USER {
        string id PK
        string display_name
        string email
        string password_hash
        string status
        datetime created_at
        datetime updated_at
    }

    ROLE {
        string id PK
        string name
        string description
    }

    PERMISSION {
        string id PK
        string code
        string description
    }

    USER_ROLE {
        string user_id FK
        string role_id FK
    }

    ROLE_PERMISSION {
        string role_id FK
        string permission_id FK
    }

    CATEGORY {
        string id PK
        string name
        string slug
        string description
        int sort_order
    }

    COMPONENT {
        string id PK
        string category_id FK
        string created_by FK
        string name
        string slug
        string description
        string difficulty
        string behavior
        string status
        int views
        int copy_count
        datetime created_at
        datetime updated_at
    }

    COMPONENT_CODE {
        string id PK
        string component_id FK
        string code_type
        text code_body
        int sort_order
    }

    COMPONENT_TAG {
        string component_id FK
        string tag_id FK
    }

    TAG {
        string id PK
        string name
        string slug
    }

    SNIPPET {
        string id PK
        string component_id FK
        string name
        string description
        int views
        int copy_count
        datetime created_at
    }

    AI_IMPORT_JOB {
        string id PK
        string requested_by FK
        string source_type
        string source_url
        string status
        datetime created_at
        datetime completed_at
    }

    AI_COMPONENT_CANDIDATE {
        string id PK
        string job_id FK
        string reviewed_by FK
        string component_id FK
        string status
        text extracted_payload
        datetime reviewed_at
    }

    WEBSITE_DESIGN {
        string id PK
        string created_by FK
        string name
        string description
        string status
        datetime created_at
        datetime updated_at
    }

    WEBSITE_PAGE {
        string id PK
        string website_design_id FK
        string name
        string route
        int sort_order
    }

    WEBSITE_SECTION {
        string id PK
        string website_page_id FK
        string component_id FK
        string name
        int sort_order
        text layout_config
    }

    AUDIT_LOG {
        string id PK
        string actor_id FK
        string entity_type
        string entity_id
        string action
        datetime created_at
    }

    USER ||--o{ USER_ROLE : has
    ROLE ||--o{ USER_ROLE : assigned_to
    ROLE ||--o{ ROLE_PERMISSION : has
    PERMISSION ||--o{ ROLE_PERMISSION : grants

    CATEGORY ||--o{ COMPONENT : groups
    USER ||--o{ COMPONENT : creates
    COMPONENT ||--o{ COMPONENT_CODE : contains
    COMPONENT ||--o{ COMPONENT_TAG : tagged_by
    TAG ||--o{ COMPONENT_TAG : labels
    COMPONENT ||--o{ SNIPPET : exposes

    USER ||--o{ AI_IMPORT_JOB : requests
    AI_IMPORT_JOB ||--o{ AI_COMPONENT_CANDIDATE : produces
    USER ||--o{ AI_COMPONENT_CANDIDATE : reviews
    COMPONENT ||--o{ AI_COMPONENT_CANDIDATE : approved_as

    USER ||--o{ WEBSITE_DESIGN : creates
    WEBSITE_DESIGN ||--o{ WEBSITE_PAGE : contains
    WEBSITE_PAGE ||--o{ WEBSITE_SECTION : contains
    COMPONENT ||--o{ WEBSITE_SECTION : used_in

    USER ||--o{ AUDIT_LOG : performs
```

## 9. Database Notes

- `COMPONENT` คือ master record ของ component
- `COMPONENT_CODE` แยก HTML, CSS, JavaScript, Notes หรือ code type อื่นในอนาคต
- `SNIPPET` ใช้สำหรับ compact snippet view และ popular snippets
- `AI_IMPORT_JOB` เก็บงานที่มาจาก AI agent เช่น URL หรือ clip
- `AI_COMPONENT_CANDIDATE` เก็บผลที่ AI extract มาให้ user review ก่อน save จริง
- `WEBSITE_DESIGN`, `WEBSITE_PAGE`, `WEBSITE_SECTION` รองรับ future feature: full website design
- `ROLE`, `PERMISSION`, `USER_ROLE`, `ROLE_PERMISSION` รองรับ Admin, Guest, Dev, UX/UI Design
- `AUDIT_LOG` ใช้เก็บประวัติ action สำคัญ เช่น add, edit, delete, approve AI candidate
