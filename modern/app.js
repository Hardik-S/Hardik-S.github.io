const experienceEntries = [
  {
    role: "Corporate Climate Adaptability Researcher",
    organization: "UN Global Compact Network Canada",
    dates: "Sep 2024 - Present",
    notes: [
      "Conducted literature and sentiment analyses of corporate climate adaptation policy responses",
      "Translated public responses into case-study-ready insights for sustainability stakeholders",
    ],
  },
  {
    role: "Finance Analyst Intern, LCL Marketing",
    organization: "Loblaws",
    dates: "May 2024 - Aug 2024",
    notes: [
      "Led backlog prioritization for finance automation initiatives",
      "Supported a team that won LoblawTank with a food-waste-focused solution",
    ],
  },
  {
    role: "Quality Assurance Intern, AI Platform",
    organization: "Kinaxis",
    dates: "Sep 2022 - Aug 2023",
    notes: [
      "Partnered on AI product quality and launch-readiness workflows",
      "Worked with cross-functional teams to refine model-driven workflow quality",
    ],
  },
  {
    role: "Software Engineer Co-op, IAM Team",
    organization: "PointClickCare",
    dates: "May 2022 - Aug 2022",
    notes: [
      "Built IAM workflows across Java, React, and Vue on Azure infrastructure",
      "Implemented bulk identity migration that increased scale for mass onboarding",
    ],
  },
  {
    role: "Robotic Process Automation Intern",
    organization: "P3 Adaptive",
    dates: "Jun 2021 - Oct 2021",
    notes: [
      "Created automation for Eventbrite and SharePoint operations",
      "Optimized post-training workload by 90% through process redesign",
    ],
  },
];

const skillGroups = [
  {
    title: "Programming",
    value: ["Python", "Java", "SQL", "JavaScript", "Cypress", "JUnit", "Mockito", "Maven"],
  },
  {
    title: "Cloud and DevOps",
    value: ["Azure", "AWS EC2", "Google Cloud", "Docker", "Kubernetes", "Datadog", "Prometheus"],
  },
  {
    title: "Frontend",
    value: ["React", "Vue", "GraphQL", "HTML", "CSS", "Bootstrap"],
  },
  {
    title: "Tools and Methods",
    value: ["Git", "Power BI", "OAuth2", "Jira", "Postman", "Kafka"],
  },
  {
    title: "Research",
    value: ["Literature Review", "Academic Writing", "Data Analysis", "Stakeholder Engagement"],
  },
];

const projectCards = [
  {
    title: "Duck, Duck, Mallard!",
    description:
      "Computer vision model to classify duck images with high-accuracy transfer learning and practical test coverage.",
    tags: ["education", "product", "machine-learning"],
    link: "https://github.com/Hardik-S/DuckDuckGo",
  },
  {
    title: "Picture This!",
    description:
      "Storytelling card game for children with investor and manufacturing support for distribution planning.",
    tags: ["education", "product", "leadership"],
    link: "https://github.com/Hardik-S/picturethisv2",
  },
  {
    title: "London Chess Club",
    description:
      "Led platform product iteration with AWS and Angular features aligned to usage growth and retention outcomes.",
    tags: ["product", "web", "community"],
    link: "https://www.google.com/search?q=London+Chess+Club",
  },
];

const sustainabilityEntries = [
  "Ivey HBAA - Director of Sustainability: driving meal plan, waste, and energy reduction initiatives.",
  "Ivey Degrowth Club - President: leading student dialogue on sustainable economics and climate justice.",
  "LoblawTank winner: presenting food-waste tooling to corporate sustainability leadership.",
];

const contactCopyTargets = [
  { id: "copyEmail", value: "hshrestha.hba2026@ivey.ca", label: "Email copied." },
  { id: "copyPhone", value: "+12896544428", label: "Phone copied." },
];

const STORAGE_KEYS = {
  preferences: "legacy-hs-modern-preferences-v1",
  snapshot: "legacy-hs-modern-snapshot-v1",
};

const state = {
  projectFilter: "all",
  projectQuery: "",
  skillQuery: "",
  isLightMode: false,
  visibleProjects: projectCards.length,
};

function safeText(value) {
  return String(value)
    .replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;",
    }[char]));
}

function formatList(items) {
  return items
    .map((entry) => `<li>${safeText(entry)}</li>`)
    .join("");
}

function readPreferences() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.preferences);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

  return {
    projectFilter: typeof parsed.projectFilter === "string" ? parsed.projectFilter : state.projectFilter,
    projectQuery: typeof parsed.projectQuery === "string" ? parsed.projectQuery : "",
    skillQuery: typeof parsed.skillQuery === "string" ? parsed.skillQuery : "",
    isLightMode: parsed.isLightMode === true,
  };
  } catch (error) {
    return null;
  }
}

function persistPreferences() {
  try {
    const payload = {
      projectFilter: state.projectFilter,
      projectQuery: state.projectQuery,
      skillQuery: state.skillQuery,
      isLightMode: state.isLightMode,
      capturedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(payload));
  } catch (error) {
    // LocalStorage is intentionally optional for static hosting compatibility.
  }
}

function applyTheme(lightMode) {
  const variables = lightMode
    ? {
        "--bg": "#f6f8ff",
        "--surface": "#eef1ff",
        "--surface-2": "#dde4ff",
        "--text": "#0f1831",
        "--muted": "#324065",
        "--line": "#b0bddf",
      }
    : {
        "--bg": "#070a14",
        "--surface": "#10182b",
        "--surface-2": "#162041",
        "--text": "#eff2ff",
        "--muted": "#9aa4c7",
        "--line": "#2b3459",
      };

  Object.entries(variables).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

function getVisibleProjects() {
  const query = state.projectQuery.toLowerCase().trim();
  return projectCards.filter((project) => {
    const matchesCategory =
      state.projectFilter === "all" || project.tags.includes(state.projectFilter);
    const searchMatch =
      query === "" ||
      `${project.title} ${project.description} ${project.tags.join(" ")}`.toLowerCase().includes(query);
    return matchesCategory && searchMatch;
  });
}

function hydrateSnapshotText(projects) {
  const output = document.getElementById("snapshotOutput");
  if (!output) {
    return;
  }

  const snapshot = {
    generatedAt: new Date().toISOString(),
    selectedTheme: state.isLightMode ? "light" : "dark",
    filters: {
      projectFilter: state.projectFilter,
      projectQuery: state.projectQuery,
      skillFilter: state.skillQuery,
    },
    counters: {
      totalProjects: projectCards.length,
      visibleProjects: projects.length,
      totalExperience: experienceEntries.length,
      totalSkills: skillGroups.reduce((acc, group) => acc + group.value.length, 0),
    },
  };

  output.textContent = JSON.stringify(snapshot, null, 2);
}

function hydrateHero() {
  const heroStats = document.getElementById("hero-stats");
  const totalProjects = projectCards.length;
  const totalExperience = experienceEntries.length;
  const totalSkills = skillGroups.reduce((acc, group) => acc + group.value.length, 0);
  heroStats.innerHTML = `
    <article class="hero-stat">
      <h3>${totalProjects}</h3>
      <p>Portfolio projects captured</p>
    </article>
    <article class="hero-stat">
      <h3>${totalExperience}</h3>
      <p>Professional roles</p>
    </article>
    <article class="hero-stat">
      <h3>${totalSkills}</h3>
      <p>Listed technical + leadership skills</p>
    </article>`;
}

function hydrateExperience() {
  const container = document.getElementById("experience-list");
  container.innerHTML = experienceEntries
    .map(
      (entry) => `
      <article class="timeline-entry">
        <h3>${safeText(entry.role)}</h3>
        <p><strong>${safeText(entry.organization)}</strong> · <time>${safeText(entry.dates)}</time></p>
        <ul>${formatList(entry.notes)}</ul>
      </article>
    `,
    )
    .join("");
}

function hydrateSkills() {
  const list = document.getElementById("skillList");
  const groupedText = skillGroups.flatMap((group) =>
    group.value.map((name) => `${group.title}: ${name}`),
  );
  list.innerHTML = groupedText.map((item) => `<li class="skill-item">${safeText(item)}</li>`).join("");
}

function renderProjects() {
  const selectedTags = getVisibleProjects();
  state.visibleProjects = selectedTags.length;

  const grid = document.getElementById("projectGrid");
  const empty = document.getElementById("projectEmpty");
  if (selectedTags.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  grid.innerHTML = selectedTags
    .map(
      (project) => `
      <article class="project-card">
        <h3>${safeText(project.title)}</h3>
        <p>${safeText(project.description)}</p>
        <p class="tags">${project.tags.map((tag) => `<span class="tag">${safeText(tag)}</span>`).join("")}</p>
        <a href="${safeText(project.link)}" target="_blank" rel="noreferrer">Open project link</a>
      </article>
    `,
    )
    .join("");

  hydrateSnapshotText(selectedTags);
}

function hydrateProjectFilters() {
  const segmentRoot = document.getElementById("projectFilter");
  const buttons = segmentRoot.querySelectorAll("[data-filter]");
  buttons.forEach((button) => {
    const isSelected = button.dataset.filter === state.projectFilter;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((it) => {
        it.classList.remove("is-active");
        it.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");
      state.projectFilter = button.dataset.filter;
      renderProjects();
      persistPreferences();
    });
  });
  const projectQuery = document.getElementById("projectQuery");
  if (state.projectQuery) {
    projectQuery.value = state.projectQuery;
  }

  projectQuery.addEventListener("input", (event) => {
    state.projectQuery = event.target.value;
    persistPreferences();
    renderProjects();
  });
}

function hydrateSustainability() {
  const list = document.getElementById("sustainabilityList");
  list.innerHTML = sustainabilityEntries.map((entry) => `<li>${safeText(entry)}</li>`).join("");
}

function hydrateSkillFilter() {
  const skillFilter = document.getElementById("skillFilter");
  const clearSkillFilter = document.getElementById("clearSkillFilter");
  const items = Array.from(document.querySelectorAll(".skill-item"));
  clearSkillFilter.addEventListener("click", () => {
    skillFilter.value = "";
    state.skillQuery = "";
    persistPreferences();
    filterSkills("");
  });
  if (state.skillQuery) {
    skillFilter.value = state.skillQuery;
  }

  skillFilter.addEventListener("input", (event) => {
    state.skillQuery = event.target.value;
    filterSkills(event.target.value);
    persistPreferences();
  });
  filterSkills("");

  function filterSkills(value) {
    const normalized = (value || "").toLowerCase().trim();
    items.forEach((item) => {
      item.hidden = normalized && !item.textContent.toLowerCase().includes(normalized);
    });
  }
}

function hydrateContactCopy() {
  const status = document.getElementById("copyStatus");
  contactCopyTargets.forEach((target) => {
    const button = document.getElementById(target.id);
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(target.value);
        status.textContent = target.label;
      } catch (error) {
        status.textContent = `Unable to copy ${target.id}. Please copy manually.`;
      }
    });
  });
}

function hydrateThemeToggle() {
  const button = document.getElementById("themeButton");
  state.isLightMode = Boolean(state.isLightMode);
  applyTheme(state.isLightMode);
  button.textContent = state.isLightMode ? "Dark mode" : "Light mode";
  button.setAttribute("aria-pressed", state.isLightMode ? "true" : "false");

  button.addEventListener("click", () => {
    state.isLightMode = !state.isLightMode;
    applyTheme(state.isLightMode);
    button.textContent = state.isLightMode ? "Dark mode" : "Light mode";
    button.setAttribute("aria-pressed", state.isLightMode ? "true" : "false");
    persistPreferences();
    renderSnapshotButtonState();
  });
}

function renderSnapshotButtonState() {
  const status = document.getElementById("snapshotStatus");
  if (!status) {
    return;
  }

  try {
    const prefs = window.localStorage.getItem(STORAGE_KEYS.preferences);
    status.textContent = prefs
      ? "Preferences loaded from localStorage. Use snapshot actions to save and share context."
      : "";
  } catch (error) {
    status.textContent = "";
  }
}

function hydrateSnapshot() {
  const copyButton = document.getElementById("copySnapshot");
  const saveButton = document.getElementById("saveSnapshot");
  const clearButton = document.getElementById("clearSnapshot");
  const status = document.getElementById("snapshotStatus");
  const snapshotData = () => {
    const visibleProjects = getVisibleProjects();
    state.visibleProjects = visibleProjects.length;
    return {
      generatedAt: new Date().toISOString(),
      selectedTheme: state.isLightMode ? "light" : "dark",
      filters: {
        projectFilter: state.projectFilter,
        projectQuery: state.projectQuery,
        skillFilter: state.skillQuery,
      },
      counters: {
        totalProjects: projectCards.length,
        visibleProjects: visibleProjects.length,
        totalExperience: experienceEntries.length,
        totalSkills: skillGroups.reduce((acc, group) => acc + group.value.length, 0),
      },
    };
  };

  const renderSnapshotOutput = () => {
    hydrateSnapshotText(getVisibleProjects());
  };

  const writeStatus = (message) => {
    if (status) {
      status.textContent = message;
    }
  };

  renderSnapshotOutput();

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(snapshotData(), null, 2));
      writeStatus("Snapshot copied to clipboard.");
    } catch (error) {
      writeStatus("Clipboard blocked. Use save/load or manual select/copy from JSON block.");
    }
  });

  saveButton.addEventListener("click", () => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.snapshot, JSON.stringify(snapshotData(), null, 2));
      writeStatus("Snapshot saved locally.");
    } catch (error) {
      writeStatus("Local snapshot storage unavailable in this browser context.");
    }
  });

  clearButton.addEventListener("click", () => {
    try {
      window.localStorage.removeItem(STORAGE_KEYS.snapshot);
      writeStatus("Local snapshot cleared.");
    } catch (error) {
      writeStatus("Unable to clear local snapshot.");
    }
  });
}

function hydrateStoredPreferences() {
  const saved = readPreferences();
  if (!saved) {
    return;
  }

  const allowedFilters = ["all", "education", "product", "sustainability"];
  if (allowedFilters.includes(saved.projectFilter)) {
    state.projectFilter = saved.projectFilter;
  }
  state.projectQuery = saved.projectQuery || "";
  state.skillQuery = saved.skillQuery || "";
  state.isLightMode = saved.isLightMode === true;
}

function init() {
  hydrateStoredPreferences();
  hydrateHero();
  hydrateExperience();
  hydrateSkills();
  hydrateProjectFilters();
  hydrateSustainability();
  hydrateSkillFilter();
  hydrateContactCopy();
  hydrateThemeToggle();
  hydrateSnapshot();
  renderProjects();
  persistPreferences();
  renderSnapshotButtonState();
}

init();
