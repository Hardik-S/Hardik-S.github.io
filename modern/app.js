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

const state = {
  projectFilter: "all",
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
  const query = (document.getElementById("projectQuery").value || "").trim().toLowerCase();
  const selectedTags = projectCards.filter((project) => {
    const matchesCategory = state.projectFilter === "all" || project.tags.includes(state.projectFilter);
    const searchMatch =
      query === "" ||
      `${project.title} ${project.description} ${project.tags.join(" ")}`.toLowerCase().includes(query);
    return matchesCategory && searchMatch;
  });

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
}

function hydrateProjectFilters() {
  const segmentRoot = document.getElementById("projectFilter");
  const buttons = segmentRoot.querySelectorAll("[data-filter]");
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
    });
  });
  document.getElementById("projectQuery").addEventListener("input", () => renderProjects());
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
    filterSkills("");
  });
  skillFilter.addEventListener("input", (event) => {
    filterSkills(event.target.value);
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
  let lightMode = false;
  button.addEventListener("click", () => {
    lightMode = !lightMode;
    if (lightMode) {
      document.documentElement.style.setProperty("--bg", "#f6f8ff");
      document.documentElement.style.setProperty("--surface", "#eef1ff");
      document.documentElement.style.setProperty("--surface-2", "#dde4ff");
      document.documentElement.style.setProperty("--text", "#0f1831");
      document.documentElement.style.setProperty("--muted", "#324065");
      document.documentElement.style.setProperty("--line", "#b0bddf");
      button.textContent = "Dark mode";
      button.setAttribute("aria-pressed", "true");
    } else {
      document.documentElement.style.setProperty("--bg", "#070a14");
      document.documentElement.style.setProperty("--surface", "#10182b");
      document.documentElement.style.setProperty("--surface-2", "#162041");
      document.documentElement.style.setProperty("--text", "#eff2ff");
      document.documentElement.style.setProperty("--muted", "#9aa4c7");
      document.documentElement.style.setProperty("--line", "#2b3459");
      button.textContent = "Light mode";
      button.setAttribute("aria-pressed", "false");
    }
  });
}

function init() {
  hydrateHero();
  hydrateExperience();
  hydrateSkills();
  hydrateProjectFilters();
  hydrateSustainability();
  hydrateSkillFilter();
  hydrateContactCopy();
  hydrateThemeToggle();
  renderProjects();
}

init();
