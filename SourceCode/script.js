const seedComponents = [
  {
    id: "btn-glow-primary",
    name: "Glow Button",
    category: "Buttons",
    difficulty: "Basic",
    behavior: "Interactive",
    tags: ["button", "hover", "cyan"],
    description: "A primary action button with a restrained cyan hover glow.",
    updated: "2026-05-01",
    views: 1240,
    copyCount: 342,
    html: '<button class="glow-button">Launch Action</button>',
    css: `.glow-button {
  border: 0;
  border-radius: 8px;
  padding: 12px 18px;
  background: linear-gradient(135deg, #0b78d0, #00b8ff);
  color: white;
  font-weight: 800;
  box-shadow: 0 12px 30px rgba(0, 184, 255, 0.24);
}`,
    js: "// No JavaScript required.",
    notes: "Use for the main action on a screen or modal."
  },
  {
    id: "load-top-bar",
    name: "Loading Bar",
    category: "Loading Bar",
    difficulty: "Basic",
    behavior: "Static",
    tags: ["loading", "status", "bar"],
    description: "A thin top loading indicator for page or async states.",
    updated: "2026-05-01",
    views: 930,
    copyCount: 211,
    html: '<div class="loading-bar"><span></span></div>',
    css: `.loading-bar {
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: #d9efff;
}
.loading-bar span {
  display: block;
  width: 62%;
  height: 100%;
  background: linear-gradient(90deg, #0b78d0, #00b8ff);
}`,
    js: "// Optional: update span width from app state.",
    notes: "Use when a process has visible but not exact progress."
  },
  {
    id: "progress-basic",
    name: "Progress Bar",
    category: "Progress Bar",
    difficulty: "Basic",
    behavior: "Static",
    tags: ["progress", "steps", "status"],
    description: "A labeled progress bar with percentage text.",
    updated: "2026-05-01",
    views: 870,
    copyCount: 198,
    html: '<div class="progress-demo"><b>Progress</b><span>72%</span><div><i></i></div></div>',
    css: `.progress-demo {
  display: grid;
  gap: 8px;
}
.progress-demo div {
  height: 10px;
  border-radius: 999px;
  background: #d9efff;
}
.progress-demo i {
  display: block;
  width: 72%;
  height: 100%;
  border-radius: inherit;
  background: #0b78d0;
}`,
    js: "// No JavaScript required for static progress.",
    notes: "Use for measurable completion such as setup or upload steps."
  },
  {
    id: "modal-basic",
    name: "Basic Modal",
    category: "Modal",
    difficulty: "Intermediate",
    behavior: "Interactive",
    tags: ["modal", "dialog", "overlay"],
    description: "A dialog pattern for focused details or confirmation.",
    updated: "2026-05-01",
    views: 1460,
    copyCount: 388,
    html: '<button data-open-modal>Open Modal</button><div class="modal-demo">Modal content</div>',
    css: `.modal-demo {
  border: 1px solid #cfe4f5;
  border-radius: 8px;
  padding: 16px;
  background: white;
  box-shadow: 0 24px 70px rgba(11, 120, 208, 0.18);
}`,
    js: `document.querySelector("[data-open-modal]")
  .addEventListener("click", () => {
    console.log("Open modal");
  });`,
    notes: "Use for detail views, forms, or code previews that should not navigate away."
  },
  {
    id: "alert-info",
    name: "Alert Box",
    category: "Alerts",
    difficulty: "Basic",
    behavior: "Static",
    tags: ["alert", "message", "info"],
    description: "A compact notification block for contextual messages.",
    updated: "2026-05-01",
    views: 760,
    copyCount: 156,
    html: '<div class="info-alert"><strong>Info</strong><p>Component saved successfully.</p></div>',
    css: `.info-alert {
  border: 1px solid #8bd8ff;
  border-left: 4px solid #00b8ff;
  border-radius: 8px;
  padding: 12px 14px;
  background: #eef9ff;
  color: #0b1f33;
}`,
    js: "// No JavaScript required.",
    notes: "Use for status feedback after user actions."
  },
  {
    id: "input-search",
    name: "Search Input",
    category: "Forms",
    difficulty: "Basic",
    behavior: "Interactive",
    tags: ["search", "input", "filter"],
    description: "A search field with icon space and focus highlight.",
    updated: "2026-05-01",
    views: 1120,
    copyCount: 274,
    html: '<label class="search-demo"><img class="search-icon-img" src="assets/icons/search.svg" alt=""><input placeholder="Search..."></label>',
    css: `.search-demo {
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid #cfe4f5;
  border-radius: 8px;
  padding: 10px 12px;
  background: white;
}
.search-demo input {
  width: 100%;
  border: 0;
  outline: 0;
}`,
    js: `document.querySelector(".search-demo input")
  .addEventListener("input", event => {
    console.log(event.target.value);
  });`,
    notes: "Use for filtering component catalogs or admin tables."
  }
];

const categories = ["Buttons", "Loading Bar", "Progress Bar", "Modal", "Cards", "Alerts", "Forms", "Effects", "Layout"];
const storageKey = "component-library-v1-visual-aligned";
const iconPath = "assets/icons/";

let components = loadComponents();
let activeComponent = components[0];
let activeCodeTab = "html";
let editingComponentId = null;

const selectors = {
  categoryList: document.querySelector("#categoryList"),
  categoryPills: document.querySelector("#categoryPills"),
  shortcutGrid: document.querySelector("#shortcutGrid"),
  statsList: document.querySelector("#statsList"),
  recentComponents: document.querySelector("#recentComponents"),
  popularDashboard: document.querySelector("#popularDashboard"),
  componentGrid: document.querySelector("#componentGrid"),
  categoryFilter: document.querySelector("#categoryFilter"),
  codeFilter: document.querySelector("#codeFilter"),
  difficultyFilter: document.querySelector("#difficultyFilter"),
  behaviorFilter: document.querySelector("#behaviorFilter"),
  globalSearch: document.querySelector("#globalSearch"),
  snippetGroups: document.querySelector("#snippetGroups"),
  adminTable: document.querySelector("#adminTable"),
  jsonModal: document.querySelector("#jsonModal"),
  jsonModalCode: document.querySelector("#jsonModalCode"),
  categoryDashboard: document.querySelector("#categoryDashboard"),
  modal: document.querySelector("#componentModal"),
  addModal: document.querySelector("#addModal"),
  toast: document.querySelector("#toast")
};

function loadComponents() {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return [...seedComponents];
  try {
    const parsed = JSON.parse(stored);
    const ids = new Set(parsed.map(item => item.id));
    const missingSeeds = seedComponents.filter(item => !ids.has(item.id));
    return [...parsed, ...missingSeeds];
  } catch {
    return [...seedComponents];
  }
}

function saveComponents() {
  localStorage.setItem(storageKey, JSON.stringify(components));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getCodeTypes(component) {
  const types = ["HTML", "CSS"];
  if (hasRunnableJavaScript(component.js)) types.push("JavaScript");
  return types;
}

function hasRunnableJavaScript(value) {
  return Boolean(value && !value.includes("No JavaScript required"));
}

function showToast(message) {
  selectors.toast.textContent = message;
  selectors.toast.classList.add("is-visible");
  window.setTimeout(() => selectors.toast.classList.remove("is-visible"), 1800);
}

function renderPreview(component) {
  switch (component.category) {
    case "Buttons":
      return '<button class="sample-glow" type="button">Launch Action</button>';
    case "Loading Bar":
      return '<div class="mini-progress animated"><span style="width: 62%"></span></div>';
    case "Progress Bar":
      return '<div class="progress-widget"><div><strong>Progress</strong><span>72%</span></div><div class="mini-progress"><span style="width: 72%"></span></div></div>';
    case "Modal":
      return '<div class="mini-modal"><strong>Dialog</strong><span>Focused content panel</span></div>';
    case "Alerts":
      return '<div class="mini-alert"><strong>Info</strong><span>Component saved successfully.</span></div>';
    case "Forms":
      return '<label class="mini-search"><img class="search-icon-img" src="assets/icons/search.svg" alt="" aria-hidden="true"><input value="button" aria-label="Example search"></label>';
    default:
      return '<div class="mini-tile">Component Preview</div>';
  }
}

function componentCard(component) {
  const badges = getCodeTypes(component).map(type => `<span>${type}</span>`).join("");
  return `
    <article class="component-card" data-component-id="${component.id}" tabindex="0">
      <div class="card-meta">
        <span>${component.category}</span>
        <span>${component.difficulty}</span>
      </div>
      <h3>${escapeHtml(component.name)}</h3>
      <p>${escapeHtml(component.description)}</p>
      <div class="card-preview">${renderPreview(component)}</div>
      <div class="card-footer">
        <div class="badge-row">${badges}</div>
        <div class="card-action-row">
          <button class="text-action" type="button" data-view="${component.id}">View Component</button>
        </div>
      </div>
    </article>
  `;
}

function renderBaseNavigation() {
  if (selectors.categoryList) {
    selectors.categoryList.innerHTML = categories.map(category => (
      `<button type="button" data-category-jump="${category}">${category}</button>`
    )).join("");
  }

  selectors.categoryFilter.innerHTML = [
    '<option value="all">All</option>',
    ...categories.map(category => `<option value="${category}">${category}</option>`)
  ].join("");

  selectors.categoryPills.innerHTML = [
    '<button class="is-active" type="button" data-pill-category="all">All</button>',
    ...categories.map(category => `<button type="button" data-pill-category="${category}">${category}</button>`)
  ].join("");

  document.querySelector('[name="category"]').innerHTML = categories
    .map(category => `<option>${category}</option>`)
    .join("");
}

function renderDashboard() {
  const stats = [
    ["Total Components", components.length, "stat-total"],
    ["HTML Blocks", components.filter(item => item.html).length, "stat-html"],
    ["CSS Blocks", components.filter(item => item.css).length, "stat-css"],
    ["JS Blocks", components.filter(item => hasRunnableJavaScript(item.js)).length, "stat-js"],
    ["Updated Items", components.filter(item => item.updated === "2026-05-01").length, "stat-updated"]
  ];

  selectors.statsList.innerHTML = stats.map(([label, value, icon]) => `
    <div class="stat-row"><span><img class="stat-icon-img" src="${iconPath}${icon}.svg" alt="" aria-hidden="true">${label}</span><strong>${value}</strong></div>
  `).join("");

  const featured = [
    ["Buttons", "42", "button"],
    ["Loading Bar", "18", "loading-bar"],
    ["Progress Bar", "16", "progress-bar"],
    ["Modals", "23", "modal"],
    ["Alerts", "19", "alert"],
    ["Forms", "31", "form"]
  ];

  selectors.shortcutGrid.innerHTML = featured.map(([category, count, icon]) => {
    const filterCategory = category === "Modals" ? "Modal" : category;
    return `
      <button class="shortcut-card" type="button" data-shortcut="${filterCategory}">
        <img class="shortcut-icon-img" src="${iconPath}${icon}.svg" alt="" aria-hidden="true">
        <strong>${category}</strong>
        <small>${count} components</small>
      </button>
    `;
  }).join("");

  selectors.recentComponents.innerHTML = [...components]
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .slice(0, 3)
    .map(componentCard)
    .join("");

  selectors.popularDashboard.innerHTML = getPopularComponents().slice(0, 5).map((item, index) => `
    <button class="popular-row" type="button" data-view="${item.id}">
      <span>${index + 1}</span>
      <div><strong>${escapeHtml(item.name)}</strong><small>${item.views} views / ${item.copyCount} copies</small></div>
    </button>
  `).join("");
}

function getPopularComponents() {
  return [...components].sort((a, b) => (b.views + b.copyCount) - (a.views + a.copyCount));
}

function getFilteredComponents() {
  const query = selectors.globalSearch.value.trim().toLowerCase();
  const category = selectors.categoryFilter.value;
  const codeType = selectors.codeFilter.value;
  const difficulty = selectors.difficultyFilter.value;
  const behavior = selectors.behaviorFilter.value;

  return components.filter(component => {
    const haystack = [component.name, component.category, component.description, ...(component.tags || [])].join(" ").toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesCategory = category === "all" || component.category === category;
    const matchesCode = codeType === "all" || getCodeTypes(component).includes(codeType);
    const matchesDifficulty = difficulty === "all" || component.difficulty === difficulty;
    const matchesBehavior = behavior === "all" || component.behavior === behavior;
    return matchesQuery && matchesCategory && matchesCode && matchesDifficulty && matchesBehavior;
  });
}

function renderComponents() {
  const list = getFilteredComponents();
  document.querySelectorAll("[data-pill-category]").forEach(button => {
    button.classList.toggle("is-active", button.dataset.pillCategory === selectors.categoryFilter.value);
  });
  selectors.componentGrid.innerHTML = list.length
    ? list.map(componentCard).join("")
    : '<div class="empty-state">No matching components found.</div>';
}

function renderSnippets() {
  const groups = ["Buttons", "Effects", "Forms", "Layout"];
  const snippetLibrary = {
    Buttons: [
      { name: "Neon Button", preview: "neon", tags: ["HTML", "CSS", "JS"], views: "1.4k", copies: 452 },
      { name: "Outline Button", preview: "outline", tags: ["HTML", "CSS"], views: "1.5k", copies: 318 },
      { name: "Icon Button", preview: "icon", tags: ["HTML", "CSS", "JS"], views: 982, copies: 276 },
      { name: "Gradient Button", preview: "gradient", tags: ["HTML", "CSS", "JS"], views: 880, copies: 245 }
    ],
    Effects: [
      { name: "Glowing Border", preview: "glow-border", tags: ["HTML", "CSS"], views: "1.5k", copies: 396 },
      { name: "Shimmer Effect", preview: "shimmer", tags: ["HTML", "CSS"], views: "1.2k", copies: 336 },
      { name: "Glass Effect Card", preview: "glass", tags: ["HTML", "CSS"], views: "1.0k", copies: 289 },
      { name: "Hover Lift", preview: "hover-lift", tags: ["HTML", "CSS", "JS"], views: 912, copies: 241 }
    ],
    Forms: [
      { name: "Search Field", preview: "search", tags: ["HTML", "CSS", "JS"], views: 806, copies: 213 },
      { name: "Toggle Switch", preview: "toggle", tags: ["HTML", "CSS", "JS"], views: 744, copies: 188 },
      { name: "Input Focus", preview: "input", tags: ["HTML", "CSS"], views: 690, copies: 172 },
      { name: "Select Menu", preview: "select", tags: ["HTML", "CSS"], views: 588, copies: 140 }
    ],
    Layout: [
      { name: "Card Grid", preview: "grid", tags: ["HTML", "CSS"], views: 930, copies: 254 },
      { name: "Sticky Header", preview: "header", tags: ["HTML", "CSS", "JS"], views: 876, copies: 221 },
      { name: "Split Panel", preview: "split", tags: ["HTML", "CSS"], views: 730, copies: 168 },
      { name: "Sidebar Shell", preview: "sidebar", tags: ["HTML", "CSS", "JS"], views: 664, copies: 151 }
    ]
  };

  selectors.snippetGroups.innerHTML = groups.map(group => {
    return `
      <section class="content-card snippet-section">
        <div class="section-title-row">
          <h2>${group}</h2>
          <button class="link-button" type="button" data-snippet-section="${group}">View all</button>
        </div>
        <div class="snippet-list">
          ${snippetLibrary[group].map(item => `
            <article class="snippet-card">
              <div class="snippet-preview snippet-preview-${item.preview}">
                <span>${item.preview.includes("button") || item.preview === "neon" || item.preview === "outline" || item.preview === "gradient" ? item.name.replace(" Button", "").toUpperCase() : ""}</span>
              </div>
              <div class="snippet-body">
                <h3>${escapeHtml(item.name)}</h3>
                <div class="badge-row">${item.tags.map(type => `<span>${type}</span>`).join("")}</div>
                <button class="snippet-copy" type="button" data-copy-static="${item.name}">
                  <img class="snippet-copy-icon" src="${iconPath}copy-code.svg" alt="" aria-hidden="true">
                  <span>Copy Code</span>
                </button>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function renderAdmin() {
  selectors.adminTable.innerHTML = components.map(component => `
    <tr>
      <td><code class="truncate-id" title="${component.id}">${component.id}</code></td>
      <td>${escapeHtml(component.name)}</td>
      <td>${component.category}</td>
      <td>${component.updated}</td>
      <td>${getCodeTypes(component).join(", ")}</td>
      <td class="table-actions">
        <button class="action-icon action-view" type="button" data-view="${component.id}" aria-label="View component" title="View"></button>
        <button class="action-icon action-edit" type="button" data-edit="${component.id}" aria-label="Edit component" title="Edit"></button>
        <button class="action-icon action-duplicate" type="button" data-duplicate="${component.id}" aria-label="Duplicate component" title="Duplicate"></button>
        <button class="action-icon action-json" type="button" data-json-preview="${component.id}" aria-label="JSON preview" title="JSON Preview"></button>
        <button class="action-icon action-export" type="button" data-export-one="${component.id}" aria-label="Export JSON" title="Export JSON"></button>
        <button class="action-icon action-delete danger-action" type="button" data-delete="${component.id}" aria-label="Delete component" title="Delete"></button>
      </td>
    </tr>
  `).join("");
}

function renderCategories() {
  selectors.categoryDashboard.innerHTML = categories.map(category => {
    const items = components.filter(component => component.category === category);
    return `
      <article class="category-card">
        <span class="category-dot"></span>
        <h3>${category}</h3>
        <p>${items.length} component records</p>
        <button class="text-action" type="button" data-shortcut="${category}">View category</button>
      </article>
    `;
  }).join("");
}

function renderAll() {
  renderDashboard();
  renderComponents();
  renderSnippets();
  renderAdmin();
  renderCategories();
}

function openSection(sectionId) {
  document.querySelectorAll("[data-section]").forEach(section => {
    section.classList.toggle("is-visible", section.dataset.section === sectionId);
  });
  document.querySelectorAll("[data-section-link]").forEach(link => {
    link.classList.toggle("is-active", link.dataset.sectionLink === sectionId);
  });
  window.location.hash = sectionId;
}

function openComponentsWithCriteria(category) {
  selectors.categoryFilter.value = category;
  openSection("components");
  renderComponents();
}

function openComponent(id) {
  const component = components.find(item => item.id === id);
  if (!component) return;
  activeComponent = component;
  activeCodeTab = "html";
  component.views += 1;
  saveComponents();

  document.querySelector("#modalCategory").textContent = component.category;
  document.querySelector("#modalTitle").textContent = component.name;
  document.querySelector("#modalMeta").innerHTML = `
    <span>Difficulty: ${component.difficulty}</span>
    <span>Tags: ${component.tags.join(", ")}</span>
  `;
  document.querySelector("#modalPreview").innerHTML = renderPreview(component);
  selectors.modal.hidden = false;
  document.body.style.overflow = "hidden";
  renderModalCode();
  renderAll();
}

function renderModalCode() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("is-active", tab.dataset.tab === activeCodeTab);
  });
  const key = activeCodeTab === "js" ? "js" : activeCodeTab;
  const value = activeCodeTab === "notes" ? activeComponent.notes : activeComponent[key];
  document.querySelector("#modalCode").textContent = value || "No code required.";
}

function closeModals() {
  selectors.modal.hidden = true;
  selectors.addModal.hidden = true;
  selectors.jsonModal.hidden = true;
  document.body.style.overflow = "";
}

function openJsonPreview(id) {
  const component = components.find(item => item.id === id);
  if (!component) return;
  selectors.jsonModalCode.textContent = JSON.stringify(component, null, 2);
  selectors.jsonModal.hidden = false;
  document.body.style.overflow = "hidden";
}

async function copyText(text, label = "Copied") {
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  showToast(label);
}

function copyComponentCode(type) {
  const parts = {
    html: activeComponent.html,
    css: activeComponent.css,
    js: activeComponent.js,
    all: `<!-- HTML -->\n${activeComponent.html}\n\n/* CSS */\n${activeComponent.css}\n\n// JavaScript\n${activeComponent.js}`
  };
  activeComponent.copyCount += 1;
  saveComponents();
  renderAll();
  copyText(parts[type], "Code copied");
}

function openAddModal(component = null) {
  const form = document.querySelector("#addComponentForm");
  form.reset();
  editingComponentId = component ? component.id : null;
  document.querySelector("#addTitle").textContent = component ? "Edit Component" : "Add Component";
  if (component) {
    form.name.value = component.name;
    form.category.value = component.category;
    form.difficulty.value = component.difficulty;
    form.tags.value = component.tags.join(", ");
    form.description.value = component.description;
    form.html.value = component.html;
    form.css.value = component.css;
    form.js.value = component.js;
    form.notes.value = component.notes;
  }
  document.querySelector("#addPreview").innerHTML = '<div class="mini-tile">Preview appears here</div>';
  selectors.addModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function previewAddComponent() {
  const form = document.querySelector("#addComponentForm");
  const fakeComponent = { category: form.category.value || "Buttons" };
  document.querySelector("#addPreview").innerHTML = form.html.value || renderPreview(fakeComponent);
}

function saveAddComponent(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const existingComponent = editingComponentId
    ? components.find(item => item.id === editingComponentId)
    : null;
  const isEditing = Boolean(existingComponent);
  const name = form.name.value.trim();
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `component-${Date.now()}`;
  const jsCode = form.js.value.trim() || "// No JavaScript required.";
  const component = {
    id: existingComponent?.id || (components.some(item => item.id === id) ? `${id}-${Date.now()}` : id),
    name,
    category: form.category.value,
    difficulty: form.difficulty.value,
    behavior: hasRunnableJavaScript(jsCode) ? "Interactive" : "Static",
    tags: form.tags.value.split(",").map(tag => tag.trim()).filter(Boolean),
    description: form.description.value.trim() || "Reusable component reference.",
    updated: "2026-05-01",
    views: existingComponent?.views || 0,
    copyCount: existingComponent?.copyCount || 0,
    html: form.html.value.trim() || "<!-- Add HTML code -->",
    css: form.css.value.trim() || "/* Add CSS code */",
    js: jsCode,
    notes: form.notes.value.trim() || "Add notes for future usage."
  };
  if (isEditing) {
    components = components.map(item => item.id === component.id ? component : item);
  } else {
    components.unshift(component);
  }
  editingComponentId = null;
  activeComponent = component;
  saveComponents();
  closeModals();
  renderAll();
  openSection("components");
  showToast(isEditing ? "Component updated" : "Saved to JSON-style data");
}

function duplicateComponent(id) {
  const original = components.find(item => item.id === id);
  if (!original) return;
  const clone = {
    ...original,
    id: `${original.id}-copy-${Date.now()}`,
    name: `${original.name} Copy`,
    views: 0,
    copyCount: 0,
    updated: "2026-05-01"
  };
  components.unshift(clone);
  activeComponent = clone;
  saveComponents();
  renderAll();
  showToast("Component duplicated");
}

function deleteComponent(id) {
  const component = components.find(item => item.id === id);
  if (!component) return;
  const confirmed = window.confirm(`Delete "${component.name}" from this local Component Library?`);
  if (!confirmed) return;
  components = components.filter(item => item.id !== id);
  activeComponent = components[0] || null;
  saveComponents();
  renderAll();
  showToast("Component deleted");
}

function bindEvents() {
  document.querySelectorAll("[data-section-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      openSection(link.dataset.sectionLink);
    });
  });

  document.addEventListener("click", event => {
    const target = event.target.closest("button, article, a");
    if (!target) return;

    if (target.dataset.view) openComponent(target.dataset.view);
    if (target.dataset.jump) openSection(target.dataset.jump);
    if (target.dataset.snippetSection) {
      openComponentsWithCriteria(target.dataset.snippetSection);
    }
    if (target.dataset.shortcut || target.dataset.categoryJump) {
      openComponentsWithCriteria(target.dataset.shortcut || target.dataset.categoryJump);
    }
    if (target.dataset.pillCategory) {
      selectors.categoryFilter.value = target.dataset.pillCategory;
      renderComponents();
    }
    if (target.dataset.copy) copyComponentCode(target.dataset.copy);
    if (target.dataset.copySnippet) {
      const component = components.find(item => item.id === target.dataset.copySnippet);
      activeComponent = component;
      copyComponentCode("all");
    }
    if (target.dataset.copyStatic) copyText(`Snippet: ${target.dataset.copyStatic}`, "Snippet copied");
    if (target.dataset.edit) openAddModal(components.find(item => item.id === target.dataset.edit));
    if (target.dataset.duplicate) duplicateComponent(target.dataset.duplicate);
    if (target.dataset.jsonPreview) openJsonPreview(target.dataset.jsonPreview);
    if (target.dataset.delete) deleteComponent(target.dataset.delete);
    if (target.dataset.exportOne) {
      const component = components.find(item => item.id === target.dataset.exportOne);
      copyText(JSON.stringify(component, null, 2), "JSON copied");
    }
    if (target.matches("[data-close-modal], [data-close-add], [data-close-json]")) closeModals();
  });

  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", event => {
      if (event.target === backdrop) closeModals();
    });
  });

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      activeCodeTab = tab.dataset.tab;
      renderModalCode();
    });
  });

  [selectors.globalSearch, selectors.categoryFilter, selectors.codeFilter, selectors.difficultyFilter, selectors.behaviorFilter]
    .forEach(control => control.addEventListener("input", renderComponents));

  document.querySelector("#openAddComponent").addEventListener("click", () => openAddModal());
  document.querySelector("#previewAdd").addEventListener("click", previewAddComponent);
  document.querySelector("#addComponentForm").addEventListener("submit", saveAddComponent);

  document.querySelector("#exportJson").addEventListener("click", () => {
    copyText(JSON.stringify(components, null, 2), "Full JSON copied");
  });

  document.querySelector("#themeToggle").addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    document.querySelector("#themeToggle").setAttribute("aria-pressed", String(isDark));
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModals();
    if (event.key === "Enter" && event.target.classList.contains("component-card")) {
      openComponent(event.target.dataset.componentId);
    }
  });
}

renderBaseNavigation();
renderAll();
bindEvents();

if (window.location.hash) {
  openSection(window.location.hash.replace("#", ""));
}
