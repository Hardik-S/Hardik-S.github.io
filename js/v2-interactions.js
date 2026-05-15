// v2 interaction layer:
// keep motion optional and native so the static site stays fast and readable.
(function () {
  const focusText = document.getElementById("hero-focus-text");
  const cycleButton = document.querySelector(".focus-cycle-button");

  if (!focusText || !cycleButton) {
    return;
  }

  const proofFocuses = [
    "Decision models that keep assumptions and tradeoffs visible.",
    "Workflow tools that turn messy follow-up into reviewable action.",
    "Governance surfaces that make permission and approval paths explicit.",
    "Public proof links that let reviewers verify source, route, and context."
  ];

  let currentIndex = Math.max(0, proofFocuses.indexOf(focusText.textContent.trim()));
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const updateFocus = (nextIndex) => {
    currentIndex = nextIndex % proofFocuses.length;
    focusText.textContent = proofFocuses[currentIndex];
    cycleButton.setAttribute(
      "aria-label",
      `Show next proof focus. Current focus: ${proofFocuses[currentIndex]}`
    );
  };

  const cycleFocus = () => {
    updateFocus(currentIndex + 1);
  };

  cycleButton.addEventListener("click", cycleFocus);
  updateFocus(currentIndex);

  // Auto-rotation is disabled for reduced-motion users; the button remains available.
  if (!reduceMotionQuery.matches) {
    window.setInterval(cycleFocus, 5200);
  }
})();

(function () {
  const section = document.getElementById("selected-work");
  const grid = document.getElementById("selected-work-grid");

  if (!section || !grid) {
    return;
  }

  let cards = [];
  let currentIndex = 0;
  let spotlightText;
  let positionText;
  let previousButton;
  let nextButton;
  let initialized = false;

  const clampIndex = (index) => {
    if (cards.length === 0) {
      return 0;
    }
    return (index + cards.length) % cards.length;
  };

  const getCardLabel = (card) => {
    const focus = card.dataset.workFocus || "Flagship proof";
    const title = card.dataset.workTitle || "Selected work";
    const summary = card.dataset.workSummary || "Review this public proof item.";
    return `${focus}: ${title}. ${summary}`;
  };

  const updateSpotlight = (nextIndex, options = {}) => {
    if (cards.length === 0 || !spotlightText || !positionText) {
      return;
    }

    currentIndex = clampIndex(nextIndex);
    cards.forEach((card, index) => {
      const isActive = index === currentIndex;
      card.classList.toggle("is-spotlighted", isActive);
      card.setAttribute("aria-current", isActive ? "true" : "false");
    });

    spotlightText.textContent = getCardLabel(cards[currentIndex]);
    positionText.textContent = `${currentIndex + 1} of ${cards.length}`;

    if (options.focusCard) {
      cards[currentIndex].focus({ preventScroll: true });
    }
  };

  const createControl = () => {
    const existingControl = section.querySelector(".work-spotlight");
    if (existingControl) {
      existingControl.remove();
    }

    const control = document.createElement("div");
    control.className = "work-spotlight";
    control.setAttribute("aria-label", "Project spotlight controller");

    const label = document.createElement("p");
    label.className = "eyebrow";
    label.textContent = "Project spotlight";

    spotlightText = document.createElement("p");
    spotlightText.className = "work-spotlight-text";
    spotlightText.id = "project-spotlight-text";
    spotlightText.setAttribute("aria-live", "polite");

    const actions = document.createElement("div");
    actions.className = "work-spotlight-actions";

    previousButton = document.createElement("button");
    previousButton.type = "button";
    previousButton.textContent = "Previous";
    previousButton.setAttribute("aria-controls", "selected-work-grid");

    positionText = document.createElement("span");
    positionText.className = "work-spotlight-position";
    positionText.setAttribute("aria-hidden", "true");

    nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.textContent = "Next";
    nextButton.setAttribute("aria-controls", "selected-work-grid");

    actions.append(previousButton, positionText, nextButton);
    control.append(label, spotlightText, actions);
    grid.before(control);

    previousButton.addEventListener("click", () => updateSpotlight(currentIndex - 1, { focusCard: true }));
    nextButton.addEventListener("click", () => updateSpotlight(currentIndex + 1, { focusCard: true }));
  };

  const wireCards = () => {
    cards = Array.from(grid.querySelectorAll(".flagship-card"));
    if (cards.length === 0) {
      return;
    }

    createControl();

    cards.forEach((card, index) => {
      card.setAttribute("aria-describedby", "project-spotlight-text");
      card.addEventListener("focus", () => updateSpotlight(index));
      card.addEventListener("click", () => updateSpotlight(index));
      card.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          updateSpotlight(index + 1, { focusCard: true });
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          updateSpotlight(index - 1, { focusCard: true });
        }
      });
    });

    initialized = true;
    updateSpotlight(0);
  };

  const initializeWhenReady = () => {
    if (initialized) {
      return;
    }
    wireCards();
  };

  document.addEventListener("v2:selected-work-rendered", initializeWhenReady, { once: true });
  initializeWhenReady();
})();

(function () {
  const railLinks = Array.from(document.querySelectorAll(".section-rail a[href^='#']"));
  const sections = railLinks
    .map((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (sections.length === 0) {
    return;
  }

  const setActiveLink = (activeLink) => {
    sections.forEach(({ link }) => {
      const isActive = link === activeLink;
      link.classList.toggle("is-current", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const setActiveFromHash = () => {
    const hashMatch = sections.find(({ link }) => link.getAttribute("href") === window.location.hash);
    setActiveLink(hashMatch ? hashMatch.link : sections[0].link);
  };

  railLinks.forEach((link) => {
    link.addEventListener("click", () => setActiveLink(link));
  });

  if (!("IntersectionObserver" in window)) {
    setActiveFromHash();
    window.addEventListener("hashchange", setActiveFromHash);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) {
        return;
      }

      const match = sections.find(({ section }) => section === visibleEntry.target);
      if (match) {
        setActiveLink(match.link);
      }
    },
    {
      rootMargin: "-24% 0px -58% 0px",
      threshold: [0.12, 0.28, 0.48]
    }
  );

  sections.forEach(({ section }) => observer.observe(section));
  setActiveFromHash();
})();
