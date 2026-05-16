// v2 interaction layer:
// keep motion optional and native so the static site stays fast and readable.
(function () {
  const focusText = document.getElementById("hero-focus-text");
  const cycleButton = document.querySelector(".focus-cycle-button");
  const journeyButton = document.querySelector(".proof-journey-button");
  const focusChips = Array.from(document.querySelectorAll(".hero-proof-strip button[data-focus-index]"));

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
    if (journeyButton) {
      journeyButton.setAttribute(
        "aria-label",
        `Trace this proof focus through the flagship work section. Current focus: ${proofFocuses[currentIndex]}`
      );
    }
    focusChips.forEach((chip) => {
      const chipIndex = Number(chip.dataset.focusIndex);
      const isActive = chipIndex === currentIndex;
      chip.classList.toggle("is-active", isActive);
      chip.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  const cycleFocus = () => {
    updateFocus(currentIndex + 1);
  };

  const startProofJourney = () => {
    const selectedWork = document.getElementById("selected-work");
    const scrollBehavior = reduceMotionQuery.matches ? "auto" : "smooth";

    document.dispatchEvent(new CustomEvent("v2:proof-journey-requested", {
      detail: {
        index: currentIndex,
        focus: proofFocuses[currentIndex]
      }
    }));
    selectedWork?.scrollIntoView({ behavior: scrollBehavior, block: "start" });
  };

  cycleButton.addEventListener("click", cycleFocus);
  journeyButton?.addEventListener("click", startProofJourney);
  focusChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const chipIndex = Number(chip.dataset.focusIndex);
      if (Number.isInteger(chipIndex)) {
        updateFocus(chipIndex);
      }
    });
  });
  updateFocus(currentIndex);

  // Auto-rotation is disabled for reduced-motion users; the button remains available.
  if (!reduceMotionQuery.matches) {
    window.setInterval(cycleFocus, 5200);
  }
})();

(function () {
  const hero = document.querySelector(".hero-editorial");
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!hero || reduceMotionQuery.matches || !("PointerEvent" in window)) {
    return;
  }

  const resetTilt = () => {
    hero.style.setProperty("--hero-tilt-x", "0deg");
    hero.style.setProperty("--hero-tilt-y", "0deg");
    hero.style.setProperty("--hero-shift-x", "0px");
    hero.style.setProperty("--hero-shift-y", "0px");
    hero.classList.remove("is-hero-reactive");
  };

  const updateTilt = (event) => {
    const bounds = hero.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0) {
      return;
    }

    const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
    const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;
    hero.style.setProperty("--hero-tilt-x", `${(xRatio * 4).toFixed(2)}deg`);
    hero.style.setProperty("--hero-tilt-y", `${(yRatio * -3).toFixed(2)}deg`);
    hero.style.setProperty("--hero-shift-x", `${(xRatio * -6).toFixed(1)}px`);
    hero.style.setProperty("--hero-shift-y", `${(yRatio * 4).toFixed(1)}px`);
    hero.classList.add("is-hero-reactive");
  };

  // Legacy used visible hero motion; v2 keeps that energy as a small progressive enhancement.
  hero.addEventListener("pointermove", updateTilt);
  hero.addEventListener("pointerleave", resetTilt);
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
  let journeyResetTimer;

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

  const setJourneyMode = (nextIndex) => {
    updateSpotlight(nextIndex, { focusCard: true });
    section.classList.add("is-proof-journey");
    window.clearTimeout(journeyResetTimer);
    journeyResetTimer = window.setTimeout(() => {
      section.classList.remove("is-proof-journey");
    }, 4200);
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
  document.addEventListener("v2:proof-journey-requested", (event) => {
    initializeWhenReady();
    if (cards.length === 0) {
      return;
    }
    setJourneyMode(event.detail?.index || 0);
  });
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
