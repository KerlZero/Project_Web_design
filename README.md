# Component Library Project

โปรเจกต์นี้คือเว็บ **Component Library** สำหรับเก็บตัวอย่าง UI components, snippets, preview และ code อ้างอิง เพื่อนำไปใช้ซ้ำในการ design หรือ coding project อื่นในอนาคต

Theme หลักของเว็บคือ blue-white, sci-fi / tech, management dashboard style และเน้นการแยกหมวดหมู่ชัดเจน

## Project Goal

- เก็บตัวอย่าง component พร้อม preview
- แยก code เป็น HTML, CSS, JavaScript และ Notes
- ใช้เป็น reference สำหรับ design และ development
- รองรับการขยายในอนาคต เช่น AI-assisted component creation, login, permission, full website design และ database

## Current Project Structure

```text
H:\Project Web Design
  Design-System-Library/
    Draft/
    Visual-Mockups/
    Assets/

  SourceCode/
    index.html
    styles.css
    script.js
    assets/

  Requirements/
    README.md
    v1/
      current-bugfix-scope.md
      design-diagrams.md

  QA-Automation/

  FUTURE_FEATURES.md
```

## Main Work Process

```text
Idea / Requirement
   ↓
Design Draft
   ↓
Visual Mockup Version
   ↓
Approved Design Assets
   ↓
Source Code Implementation
   ↓
QA / Visual Check
   ↓
Requirement / Diagram Update
   ↓
Future Feature Backlog
```

## 1. Design Draft Process

Design draft ใช้สำหรับกำหนด concept และโครงสร้างก่อนลง code

Primary file:

- `Design-System-Library/Draft/component-library-design-draft.md`

เนื้อหาที่ควรมีใน design draft:

- Project summary
- Visual style
- Color palette
- Typography
- Information architecture
- Desktop / mobile wireframe
- Component card design
- Modal design
- Add Component process
- Data structure draft
- First version scope

## 2. Visual Mockup Version Process

Visual mockup ใช้เก็บภาพ design version ที่ approved หรือใช้ review

Folder:

- `Design-System-Library/Visual-Mockups/`

Current version:

- `Design-System-Library/Visual-Mockups/v1/component-library-figma-mockup-v1.png`
- `Design-System-Library/Visual-Mockups/v1/plan-v1.md`

Rule สำคัญ:

ทุกครั้งที่มีการแก้ design หรือเพิ่ม function ใหม่ ต้องถามก่อนว่า:

```text
ต้องการให้เก็บเป็น visual mockup version ใหม่ พร้อม plan/change summary ไหม?
```

ถ้า approved ให้สร้าง version ใหม่ เช่น:

```text
Visual-Mockups/
  v1/
  v2/
  v3/
```

แต่ละ version ควรมี:

- Visual mockup image
- Plan หรือ change summary
- Design notes ที่สำคัญ

## 3. Asset Process

Design assets เก็บไว้ที่:

- `Design-System-Library/Assets/`

Source code ใช้งาน asset จาก:

- `SourceCode/assets/`

Asset flow:

```text
UX/UI design asset
   ↓
Store in Design-System-Library/Assets/[version]
   ↓
Approve asset
   ↓
Copy approved asset to SourceCode/assets
   ↓
Use in website implementation
```

ถ้า developer ต้องการ asset แต่ไม่มีไฟล์ ให้ส่งกลับไปที่ UX/UI/design process ก่อน ไม่ควรสร้าง asset แบบสุ่มใน code โดยไม่มี design decision

## 4. Source Code Process

Source code หลักอยู่ที่:

- `SourceCode/index.html`
- `SourceCode/styles.css`
- `SourceCode/script.js`

เว็บปัจจุบันเป็น static frontend prototype ใช้:

- HTML
- CSS
- JavaScript
- Browser localStorage สำหรับ component data แบบ JSON-style

Current implemented areas:

- Dashboard
- Components Catalog
- Snippets
- Code Library / JSON Admin
- View Component modal
- Add / Edit Component modal
- JSON Preview modal
- Delete Component
- Theme toggle
- Copy code action
- Popular snippets based on Views + Copy Count

## 5. Requirement Process

Requirements อยู่ที่:

- `Requirements/`

Current mode:

- `v1 bugfix`

หมายความว่า:

- ทำ bugfix หรือ design alignment ของ v1 ได้
- Future feature ยังไม่เริ่มจนกว่าจะมี explicit approval
- ถ้ามี request ใหม่ ต้องแยกก่อนว่าเป็น bugfix, feature, design clarification, หรือ asset request

Important files:

- `Requirements/README.md`
- `Requirements/v1/current-bugfix-scope.md`
- `Requirements/v1/design-diagrams.md`

## 6. Design Diagram Process

Design diagrams อยู่ที่:

- `Requirements/v1/design-diagrams.md`

Diagram ที่มี:

- Sequence Diagram
  - View and Copy Component
  - Add Component as JSON-style data
  - Add Component by AI Agent from URL / Clip
  - Login and Permission
  - Delete Component
  - Full Website Design Support

- Use Case Diagram
  - Guest
  - Admin
  - Dev
  - UX/UI Design
  - AI Agent

- ER Diagram
  - ใช้สำหรับ future version ที่เลือกใช้ database

## 7. QA Process

QA automation อยู่ที่:

- `QA-Automation/`

ใช้สำหรับตรวจ:

- Visual regression
- Responsive behavior
- Asset rendering
- Production smoke
- User flow
- Design contract

ก่อนปิดงานสำคัญควรเช็คอย่างน้อย:

```text
1. หน้าเว็บโหลดได้
2. ไม่มี JavaScript syntax error
3. UI หลักตรงกับ approved design หรือ diff comments ล่าสุด
4. Component modal ใช้งานได้
5. Add/Edit/Delete/JSON Preview ไม่พัง
6. Responsive layout ไม่แตก
```

## 8. Future Feature Backlog

Future feature อยู่ที่:

- `FUTURE_FEATURES.md`

ยังไม่ implement ใน v1 ยกเว้น user สั่งเริ่ม feature โดยชัดเจน

Current future ideas:

1. Add Component by AI Agent
   - Sync component add to web
   - Add from clip or URL

2. Login website

3. Support full website design

4. Delete Component

5. Permission on website
   - Admin
   - Guest
   - Dev
   - UX/UI Design

## 9. Change Request Rule

เมื่อมี request ใหม่ ให้จัดประเภทก่อน:

```text
Bugfix
Design alignment
Asset request
Feature request
Requirement / diagram update
QA update
```

ถ้าเป็น design change หรือเพิ่ม function:

1. แก้ตาม request เฉพาะ scope ที่ระบุ
2. ถามก่อนว่าจะเก็บเป็น visual mockup version ใหม่หรือไม่
3. ถ้า approved ให้สร้าง folder version ใหม่ใน `Visual-Mockups`
4. Update plan/change summary ของ version นั้น

ถ้าเป็น future feature:

1. เช็ค `FUTURE_FEATURES.md`
2. สร้าง requirement package ก่อน
3. Update diagrams ถ้าจำเป็น
4. ค่อย implement หลัง approval

## 10. Current Recommended Workflow

สำหรับงาน v1 ตอนนี้:

```text
Receive diff comment / design feedback
   ↓
Identify target screen or component
   ↓
Patch only related files
   ↓
Run quick syntax / smoke check
   ↓
Confirm result
   ↓
Ask whether to save visual mockup version if design changed
```

## 11. Important Ownership Notes

- `Design-System-Library` คือพื้นที่ design, mockup, assets
- `SourceCode` คือพื้นที่ implementation
- `Requirements` คือพื้นที่ SA/BA, scope, diagrams
- `QA-Automation` คือพื้นที่ test automation
- `FUTURE_FEATURES.md` คือ backlog idea เท่านั้น ยังไม่ใช่ scope ที่ต้อง implement ทันที

## 12. How To Open The Website

เปิดไฟล์นี้ใน browser:

```text
H:\Project Web Design\SourceCode\index.html
```

หรือใช้ static server จาก folder `SourceCode` ถ้าต้องการทดสอบแบบ HTTP

## 13. Project Status Summary

Current status:

- Project topic: Component Library
- Mode: v1 bugfix / design alignment
- Source code exists
- Visual mockup v1 exists
- Requirements and design diagrams exist
- Future features documented but mostly on hold

Next work should stay focused on v1 bugfix/design alignment unless explicitly starting a new feature version
