# Component Library Visual Mockup Plan - v1

## Summary

Create a design-only Figma-style mockup set for a website named **Component Library**.

The design should act as a reusable component reference library for UI patterns, snippets, and code examples.

Theme:

- Blue and white
- Sci-fi / tech
- Management dashboard style
- Clean category separation
- Strong focus on preview + reusable code reference

## Key Design Decisions

- Website name: **Component Library**
- Include main areas: Dashboard, Components, Snippets, Code, Categories
- Library Stats are allowed, but must not include metrics or wording related to download or developer
- Popular Snippets ranking is based on **Views + Copy Count**
- Add Component uses **JSON File Admin** process
- Component records should support HTML, CSS, JavaScript, Preview, Notes, Tags, Category, Views, and Copy Count

## Artboards Included

1. **Dashboard**
   - Header with logo, search, theme toggle, and `+ Add Component`
   - Sidebar navigation
   - Intro panel
   - Featured categories
   - Recent components
   - Library Stats
   - Popular Snippets

2. **Components Catalog**
   - Category and code filters
   - Component cards with preview
   - Badges for HTML, CSS, JavaScript
   - `View Component` action

3. **View Component Modal**
   - Preview panel
   - Code tabs: HTML, CSS, JavaScript, Notes
   - Copy buttons for each code type and Copy All
   - Metadata: category, tags, difficulty, views, copy count

4. **Add Component**
   - Form fields for metadata
   - Code input areas
   - Preview panel
   - Actions: Preview, Save to JSON, Cancel
   - Shows that the record is added to `components.json`

5. **Snippets**
   - Compact reusable snippet cards
   - Groups: Buttons, Effects, Forms, Layout
   - Views and Copy Count indicators
   - Copy Code action

6. **Code Library / JSON Admin**
   - Admin/reference table
   - Columns: Component ID, Name, Category, Updated, Code Type, Actions
   - Actions: View, Edit, Duplicate, Export JSON
   - JSON record preview panel

## Add Component Process

1. User clicks `+ Add Component`
2. Add Component screen or modal opens
3. User fills metadata and separated HTML/CSS/JavaScript/Notes fields
4. User clicks `Preview`
5. System renders a preview from the entered code
6. User clicks `Save to JSON`
7. New record is added to `components.json`
8. Component appears in Components Catalog, Snippets search, and selected category
9. Views and Copy Count feed Popular Snippets ranking

## Acceptance Criteria

- Mockup clearly shows all 6 screens
- Website name appears as **Component Library**
- No `download` or `developer` wording
- Components, Snippets, and Code areas are visible
- View Component modal clearly separates Preview, HTML, CSS, JavaScript, and Notes
- Add Component flow clearly shows JSON/admin save direction
- Popular Snippets logic is based on Views + Copy Count
