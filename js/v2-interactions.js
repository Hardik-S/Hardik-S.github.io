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
