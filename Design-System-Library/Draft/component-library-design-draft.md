# Design Draft: Tech Component Reference Library

## 1. Project Summary

This is a new project direction, separate from the old portfolio topic.

The website will be a personal/internal web library for collecting reusable UI design components with working code examples. The goal is to use it as a reference when designing or coding other projects.

Reference concept: W3Schools How To, which presents HTML/CSS/JavaScript code snippets grouped by UI/function categories such as modals, progress bars, loaders, cards, alerts, sticky headers, dark mode toggles, and similar how-to patterns.

## 2. Product Goal

Create a management-style component library website where each function/component is easy to find, preview, inspect, and reuse.

Primary goal:

- Store UI component examples with preview and separated code blocks
- Help quickly reuse design patterns and source code in future projects
- Organize components by clear categories
- Make each component understandable before copying code

Secondary goal:

- Build a sci-fi / tech themed design system
- Keep the interface clean, structured, and professional
- Support future growth into many component categories

## 3. Target Users

Primary user:

- Developer or designer who wants quick reference examples for HTML, CSS, and JavaScript components

Secondary users:

- Stakeholder reviewing component structure
- Future project team member who needs reusable UI/function references

## 4. Visual Style Direction

### Theme

Blue and white sci-fi tech management interface.

The design should feel like a clean technical control panel, not a playful tutorial page. It should be useful, structured, and easy to scan.

### Mood Keywords

- Clean
- Technical
- Organized
- Futuristic
- Practical
- Reference-oriented
- Fast to search

### Color Palette Draft

Primary palette:

- Page background: `#F4FAFF`
- Main surface: `#FFFFFF`
- Secondary surface: `#EAF6FF`
- Primary blue: `#0B78D0`
- Bright cyan accent: `#00B8FF`
- Deep navy text: `#0B1F33`
- Muted text: `#5D738A`
- Border: `#CFE4F5`
- Code background: `#081827`
- Code text: `#EAF6FF`

Sci-fi accents:

- Glow cyan: `rgba(0, 184, 255, 0.32)`
- Grid line: `rgba(11, 120, 208, 0.08)`
- Active category background: `#DDF2FF`
- Success: `#18A957`
- Warning: `#F5A524`
- Error: `#E5484D`

### Color Usage

- White should dominate the main content area for readability
- Blue should guide navigation, active states, selected filters, and primary buttons
- Cyan should be used sparingly for glow, focus, active preview, and tech detail
- Dark navy should be used for code blocks and modal code panels
- Avoid making every component blue; reserve accent color for hierarchy

### Typography

Recommended fonts:

- Main UI font: `Inter`
- Code font: `JetBrains Mono`

Type scale:

- Page title: 40-48px desktop / 30-34px mobile
- Section heading: 28-32px desktop / 24-28px mobile
- Card title: 18-20px
- Body text: 15-16px
- Metadata/code labels: 12-13px
- Code text: 13-14px

Typography rules:

- Keep headings clear and compact
- Use monospaced font only for code, IDs, tags, and file labels
- Do not use decorative fonts
- Code should be readable with enough line height

## 5. Information Architecture

### Main Navigation

Top navigation:

- Dashboard
- Components
- Snippets
- Collections
- Guidelines

Utility actions:

- Search
- Theme toggle
- Add Component

### Sidebar Categories

Main categories:

- Buttons
- Loaders
- Progress
- Navigation
- Cards
- Modals
- Forms
- Alerts
- Tabs
- Tooltips
- Toggles
- Tables
- Effects
- Layout
- Utilities

Suggested first version categories:

- Buttons
- Loading Bar
- Progress Bar
- Modal
- Cards
- Alerts
- Forms

### Component Detail Code Tabs

Each component modal should separate code by:

- Preview
- HTML
- CSS
- JavaScript
- Notes

## 6. Page Structure

```text
[App Shell]
Top Header
Left Sidebar
Main Content Area
Right Detail / Quick Info Panel optional

[Dashboard Area]
Hero / intro summary
Quick stats
Search bar
Featured components
Recent components

[Components Area]
Category filter
Component grid/list
Preview cards
Status tags
Open modal action

[Component Modal]
Large preview
Component description
Code tabs: HTML / CSS / JS
Copy code buttons
Usage notes
Related components
```

## 7. Desktop Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Top Header                                                                  │
│ [Logo] Tech UI Library      [Search components...]     [Theme] [+ Add]      │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┬──────────────────────────────────────┬───────────────┐
│ Sidebar              │ Main Content                         │ Quick Panel   │
│                      │                                      │               │
│ Dashboard            │ ┌──────────────────────────────────┐ │ Library Stats │
│ Components           │ │ Hero Summary                      │ │ Total: 42     │
│ Snippets             │ │ Reusable UI components with code  │ │ HTML: 42      │
│ Collections          │ │ [Browse Components] [Add New]     │ │ CSS: 42       │
│ Guidelines           │ └──────────────────────────────────┘ │ JS: 18        │
│                      │                                      │               │
│ Categories           │ ┌────────┐ ┌────────┐ ┌────────┐    │ Popular       │
│ - Buttons            │ │Buttons │ │Loaders │ │Progress│    │ Buttons       │
│ - Loading Bar        │ └────────┘ └────────┘ └────────┘    │ Modal         │
│ - Progress Bar       │                                      │ Progress      │
│ - Modal              │ ┌──────────────────────────────────┐ │               │
│ - Cards              │ │ Component Grid                   │ │               │
│ - Alerts             │ │ ┌─────────┐ ┌─────────┐          │ │               │
│ - Forms              │ │ │ Button  │ │ Loader  │          │ │               │
│                      │ │ │ Preview │ │ Preview │          │ │               │
│                      │ │ │ [Open]  │ │ [Open]  │          │ │               │
│                      │ │ └─────────┘ └─────────┘          │ │               │
│                      │ └──────────────────────────────────┘ │               │
└──────────────────────┴──────────────────────────────────────┴───────────────┘
```

## 8. Component Card Wireframe

Each card represents one reusable function/component.

```text
┌────────────────────────────────────┐
│ Category tag              Difficulty│
│                                    │
│ Component Name                     │
│ Short description                  │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ Live preview area              │ │
│ │ Example button/progress/modal  │ │
│ └────────────────────────────────┘ │
│                                    │
│ HTML CSS JS             [Open Code]│
└────────────────────────────────────┘
```

Card content:

- Component name
- Category
- Short description
- Preview area
- Code type badges: HTML, CSS, JS
- Complexity tag: Basic / Intermediate / Advanced
- Open button

Card behavior:

- Hover: border turns blue, subtle cyan glow
- Click card or Open Code: opens modal
- Keyboard focus: visible blue/cyan outline

## 9. Modal Wireframe

The modal is the main place where the user studies and copies code.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Modal Header                                                               │
│ Button Hover Glow                                           [Close]        │
│ Category: Buttons | Difficulty: Basic | Uses: HTML + CSS                   │
├──────────────────────────────────────┬─────────────────────────────────────┤
│ Preview Panel                         │ Code Panel                          │
│                                      │ ┌──────┬─────┬────────────┬──────┐ │
│ ┌──────────────────────────────────┐ │ │HTML  │CSS  │JavaScript  │Notes │ │
│ │ Live component preview           │ │ └──────┴─────┴────────────┴──────┘ │
│ │                                  │ │                                     │
│ │ [Sample Button]                  │ │ Code block                           │
│ │                                  │ │                                     │
│ └──────────────────────────────────┘ │ [Copy HTML] [Copy All]              │
│                                      │                                     │
│ Usage summary                        │                                     │
│ Related: Primary Button, Icon Button │                                     │
└──────────────────────────────────────┴─────────────────────────────────────┘
```

Modal requirements:

- Separate HTML, CSS, JavaScript clearly
- If JavaScript is not needed, show "No JavaScript required"
- Include copy buttons for each tab
- Include Copy All button
- Include usage notes for when to use the component
- Modal should be large on desktop and full-screen style on mobile

## 10. Mobile Wireframe

```text
┌────────────────────────────┐
│ Top Bar                    │
│ [Logo]        [Search/Menu]│
└────────────────────────────┘

┌────────────────────────────┐
│ Search                     │
│ [Search components...]     │
└────────────────────────────┘

┌────────────────────────────┐
│ Category Chips             │
│ [Buttons] [Loaders] [More] │
└────────────────────────────┘

┌────────────────────────────┐
│ Hero / Summary             │
│ Component reference library│
│ [Browse] [Add Component]   │
└────────────────────────────┘

┌────────────────────────────┐
│ Component Cards            │
│ Card 1                     │
│ Card 2                     │
│ Card 3                     │
└────────────────────────────┘

┌────────────────────────────┐
│ Modal                      │
│ Full-screen drawer style   │
│ Preview                    │
│ Tabs: HTML CSS JS Notes    │
│ Code block                 │
└────────────────────────────┘
```

Mobile rules:

- Sidebar becomes a slide-out menu or horizontal category chips
- Component cards stack one per row
- Modal becomes full-screen or bottom-sheet style
- Code block must scroll horizontally
- Copy buttons should stay visible near code tabs

## 11. Key Screens

### Screen 1: Dashboard

Purpose:

- Give overview of the component library
- Show quick access to categories
- Show recent or featured components

Sections:

- Hero summary
- Search
- Category shortcuts
- Featured component cards
- Recent additions
- Quick stats

### Screen 2: Component Catalog

Purpose:

- Browse all components by category
- Search/filter by function

Sections:

- Page title
- Search and filters
- Category tabs/chips
- Component grid
- Empty state

Filters:

- Category
- Code type: HTML / CSS / JS
- Difficulty
- Interactive / Static
- Recently added

### Screen 3: Component Detail Modal

Purpose:

- View example
- Read usage notes
- Copy HTML/CSS/JS

Sections:

- Modal title and metadata
- Preview
- Code tabs
- Copy actions
- Notes
- Related components

### Screen 4: Add Component Form

Purpose:

- Future function for adding a new component into the library

Fields:

- Component name
- Category
- Description
- Difficulty
- HTML code
- CSS code
- JavaScript code
- Notes
- Tags

First version note:

- This can be a design-only screen first
- Actual saving function can come later

## 12. Component Data Structure Draft

Each component should eventually be stored with a consistent structure:

```text
Component ID
Name
Category
Description
Difficulty
Tags
HTML code
CSS code
JavaScript code
Preview type
Usage notes
Related components
Created date
Updated date
```

Example:

```text
ID: btn-glow-primary
Name: Glow Primary Button
Category: Buttons
Description: A blue sci-fi button with hover glow.
Difficulty: Basic
Code: HTML + CSS
JavaScript: Not required
Tags: button, hover, cyan, sci-fi
```

## 13. First Component Categories

### Buttons

Examples:

- Primary button
- Secondary button
- Icon button
- Glow hover button
- Loading button
- Copy button

### Loading Bar

Examples:

- Thin top loading bar
- Indeterminate loading bar
- Step loading bar
- Page loading indicator

### Progress Bar

Examples:

- Basic progress bar
- Circular progress
- Skill bar
- Multi-step progress

### Modal

Examples:

- Basic modal
- Code preview modal
- Confirmation modal
- Full-screen mobile modal

### Cards

Examples:

- Component card
- Profile card
- Product card
- Feature card

### Alerts

Examples:

- Success alert
- Warning alert
- Error alert
- Info callout

### Forms

Examples:

- Text input
- Search input
- Select dropdown
- Toggle switch
- Validation message

## 14. Interaction Design

### Search

User can search by:

- Component name
- Category
- Tag
- Code type

Search behavior:

- Results update instantly
- Matching terms can be highlighted
- Empty state suggests categories

### Category Selection

Desktop:

- Left sidebar category list

Mobile:

- Horizontal chips or slide-out menu

Active state:

- Blue text
- Light blue background
- Left accent line or small active dot

### Open Code Modal

Trigger:

- Click component card
- Click Open Code button

Modal content:

- Preview on left
- Code tabs on right
- Copy actions

### Copy Code

Buttons:

- Copy HTML
- Copy CSS
- Copy JS
- Copy All

Feedback:

- Button label changes to "Copied"
- Small toast appears bottom-right

## 15. Visual Component System

### App Shell

- Fixed top bar
- Left sidebar on desktop
- Content area with max readable width
- Optional right-side quick panel

### Buttons

- Primary: filled blue
- Secondary: white with blue border
- Ghost: transparent
- Danger: red only for destructive actions
- Icon button: square 40px

### Cards

- White surface
- Thin blue-gray border
- 8px radius
- Preview area with soft blue grid
- Metadata badges

### Code Blocks

- Dark navy background
- Monospace font
- Syntax-like color accents
- Horizontal scroll
- Copy button at top-right

### Badges

- HTML: blue
- CSS: cyan
- JS: amber
- Basic: green
- Intermediate: blue
- Advanced: red

### Modal

- Large desktop modal
- Full-screen mobile modal
- Split preview/code layout on desktop
- Code tabs visible at top

## 16. Accessibility Notes

- Use strong contrast for blue text and buttons
- All cards that open modal must be keyboard accessible
- Modal must trap focus when implemented
- Escape key should close modal
- Copy buttons need clear labels
- Code tabs need active state and keyboard support
- Avoid using color alone to communicate code type

## 17. Draft File Structure For Future Code

This is only a future suggestion. Do not implement yet.

```text
Design-System-Library/
  docs/
    design-draft.md
    component-data-model.md
  src/
    index.html
    styles.css
    script.js
    data/
      components.js
```

## 18. First Version Scope

Recommended first build after design approval:

- Dashboard layout
- Sidebar categories
- Search input
- Component cards
- Modal with preview and code tabs
- Copy code button
- At least 6 real component examples:
  - Glow Primary Button
  - Loading Bar
  - Progress Bar
  - Basic Modal
  - Alert Box
  - Search Input

Not recommended for first version:

- User login
- Database
- Online editor
- Drag-and-drop builder
- Complex saving system

## 19. Stakeholder Review Checklist

Review these before coding:

- Is the project direction correct: component reference library?
- Is the blue-white sci-fi tech theme acceptable?
- Is the management layout with sidebar/categories correct?
- Are the first categories enough?
- Should the first version include Add Component form or only static examples?
- Should modal code tabs include Copy All?
- Should preview and code be side-by-side or stacked?

## 20. Next Step

After this draft is approved, create a high-fidelity design plan with:

- Final screen-by-screen layout
- Final component card design
- Final modal design
- Final color tokens
- Final sample data list
- Then start coding the first version
