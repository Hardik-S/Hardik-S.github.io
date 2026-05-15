// v2 evidence model:
// keep homepage proof anchors tied to auditable links and avoid HTML injection.
(function () {
  const container = document.getElementById("evidence-grid");
  const evidenceMetaEl = document.getElementById("evidence-meta");
  const evidenceSummaryEl = document.getElementById("evidence-summary");
  const selectedWorkContainer = document.getElementById("selected-work-grid");
  const selectedWorkMetaEl = document.getElementById("selected-work-meta");

  if (!container) {
    return;
  }

  const loadingEl = container.querySelector(".evidence-loading");
  const selectedWorkLoadingEl = selectedWorkContainer?.querySelector(".evidence-loading");
  const safeText = (value) => (value == null ? "" : String(value).trim());

  const makeLink = (url, text) => {
    const link = document.createElement("a");
    if (!url || typeof url !== "string") {
      link.textContent = text;
      link.className = "sr-only";
      return link;
    }

    link.href = url;
    link.textContent = text;

    // Keep absolute URLs in a new tab; keep relative links in-page for safety.
    if (url.startsWith("/")) {
      link.setAttribute("aria-label", text);
      return link;
    }

    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${text} (opens in new tab)`);
    return link;
  };

  const renderSourceMeta = (source, target) => {
    if (!source || typeof source !== "object") {
      return;
    }

    // Render evidence provenance as a compact visual cue, then attach verified details.
    const sourceType = safeText(source.type);
    const sourceUrl = safeText(source.url);
    const verifiedAt = safeText(source.verifiedAt);
    const notes = safeText(source.notes);

    const compactParts = [];
    if (verifiedAt) {
      compactParts.push(`verified ${verifiedAt}`);
    }
    if (!sourceType && compactParts.length === 0 && !sourceUrl && !notes) {
      return;
    }

    const metaLine = document.createElement("p");
    metaLine.className = "section-note source-meta";

    const sourceTypeBadge = document.createElement("span");
    sourceTypeBadge.className = "source-meta-badge";
    sourceTypeBadge.textContent = `source: ${sourceType || "recorded"}`;
    metaLine.append(sourceTypeBadge);

    if (compactParts.length > 0) {
      const compactText = document.createElement("span");
      compactText.className = "source-meta-text";
      compactText.textContent = compactParts.join(" | ");
      metaLine.append(document.createTextNode(" "));
      metaLine.append(compactText);
    }

    if (sourceUrl) {
      const linkText = sourceType ? `${sourceType} source` : "source record";
      const sourceLink = makeLink(sourceUrl, linkText);
      sourceLink.className = "source-meta-link";
      metaLine.append(document.createTextNode(" "));
      metaLine.append(sourceLink);
    }

    if (notes) {
      metaLine.title = notes;
      const screenReaderNote = document.createElement("span");
      screenReaderNote.className = "sr-only";
      screenReaderNote.textContent = ` ${notes}`;
      metaLine.append(screenReaderNote);
    }

    target.appendChild(metaLine);
  };

  const renderMeta = (meta) => {
    if (!evidenceMetaEl) {
      return;
    }

    const verifiedOn = safeText(meta?.verifiedOn);
    const source = safeText(meta?.source);
    const verifiedBy = safeText(meta?.verifiedBy);
    // Keep selected-work and evidence headers aligned to one reusable verification policy payload.
    const verifiedScope = safeText(meta?.verifiedScope);

    const pieces = [];
    if (verifiedOn) {
      pieces.push(`Evidence verified: ${verifiedOn}`);
    }
    if (verifiedBy) {
      pieces.push(`Owner: ${verifiedBy}`);
    }
    if (source) {
      pieces.push(`Source: ${source}`);
      if (verifiedScope) {
        pieces.push(`Scope: ${verifiedScope}`);
      }
    }

    evidenceMetaEl.textContent = pieces.length > 0
      ? pieces.join(" | ")
      : "Evidence metadata missing from content payload.";
  };

  const isPublicReady = (item) => item?.publicReady === true;

  // Render selected-work as a narrative layer grouped by focus area to preserve readability
  // when multiple evidence-ready cards compete for attention in one row.
  const focusOrder = [
    "Decision model",
    "Product workflow",
    "Decision support",
    "Operational reliability",
    "Governance tooling",
    "Support productivity"
  ];

  const focusPriority = focusOrder.reduce((acc, label, index) => {
    acc[label.toLowerCase()] = index;
    return acc;
  }, {});

  const normalizeFocus = (value) => safeText(value).toLowerCase();

  const createSelectedWorkCard = (item) => {
    const title = safeText(item?.title);
    const url = safeText(item?.url);
    const summary = safeText(item?.summary);

    if (!title || !url || !summary) {
      return null;
    }

    const article = document.createElement("article");
    article.className = "card";

    const heading = document.createElement("h3");
    heading.appendChild(makeLink(url, title));

    const paragraph = document.createElement("p");
    paragraph.textContent = summary;

    article.appendChild(heading);
    article.appendChild(paragraph);
    renderSourceMeta(item.source, article);
    return article;
  };

  const orderGroups = (lhs, rhs) => {
    const lhsPriority = focusPriority[lhs] ?? Number.MAX_SAFE_INTEGER;
    const rhsPriority = focusPriority[rhs] ?? Number.MAX_SAFE_INTEGER;
    if (lhsPriority !== rhsPriority) {
      return lhsPriority - rhsPriority;
    }
    return lhs.localeCompare(rhs, "en", { sensitivity: "base" });
  };

  const renderSelectedWork = (items, meta) => {
    if (!selectedWorkContainer) {
      return;
    }

    const selectedItems = Array.isArray(items) ? items.filter((item) => isPublicReady(item)) : [];
    const groupedItems = {};

    if (selectedWorkLoadingEl) {
      selectedWorkLoadingEl.remove();
    }
    selectedWorkContainer.innerHTML = "";

    if (selectedItems.length === 0) {
      const fallback = document.createElement("p");
      fallback.className = "section-note";
      fallback.textContent = "No selected-work entries available yet. Evidence payload may be sparse.";
      selectedWorkContainer.innerHTML = "";
      selectedWorkContainer.append(fallback);
      selectedWorkContainer.closest("section")?.setAttribute("data-empty-work", "true");
      if (selectedWorkMetaEl) {
        selectedWorkMetaEl.textContent = "Selected-work cards: 0";
      }
      return;
    }

    selectedItems.forEach((item) => {
      const focus = safeText(item?.focus) || "Core evidence";
      if (!groupedItems[focus]) {
        groupedItems[focus] = [];
      }
      groupedItems[focus].push(item);
    });

    Object.entries(groupedItems).forEach(([focus, works]) => {
      works.sort((a, b) => safeText(a?.title).localeCompare(safeText(b?.title), "en", { sensitivity: "base" }));
    });

    const orderedFocuses = Object.keys(groupedItems).sort(orderGroups);

    orderedFocuses.forEach((focus) => {
      const group = document.createElement("section");
      group.className = "work-group";
      group.setAttribute("aria-label", `${focus} selected-work`);

      const groupHeading = document.createElement("h3");
      groupHeading.className = "work-group-title";
      groupHeading.textContent = focus;

      const groupMeta = document.createElement("p");
      groupMeta.className = "work-group-meta";
      groupMeta.textContent = `${groupedItems[focus].length} selected-work item${groupedItems[focus].length === 1 ? "" : "s"}`;

      const workGrid = document.createElement("div");
      workGrid.className = "cards work-group-list";

      groupedItems[focus].forEach((item) => {
        const card = createSelectedWorkCard(item);
        if (card) {
          workGrid.append(card);
        }
      });

      group.append(groupHeading, groupMeta, workGrid);
      selectedWorkContainer.append(group);
    });

    if (selectedWorkMetaEl) {
      const selectedShown = selectedItems.length;
      const selectedSkipped = Math.max(0, Array.isArray(items) ? items.length - selectedShown : 0);
      const selectedSummary = [`Selected-work cards: ${selectedShown}`, `Focus tracks: ${orderedFocuses.length}`];
      if (selectedSkipped > 0) {
        selectedSummary.push(`${selectedSkipped} not public-ready`);
      }
      if (safeText(meta?.verifiedOn)) {
        selectedSummary.push(`Verified: ${safeText(meta.verifiedOn)}`);
      }
      if (safeText(meta?.verifiedScope)) {
        selectedSummary.push(`Scope: ${safeText(meta.verifiedScope)}`);
      }
      selectedWorkMetaEl.textContent = selectedSummary.join(" | ");
    }

    // Preserve a single narrative section even if this data shape is missing.
    if (!meta || !Array.isArray(items) || items.length === 0) {
      selectedWorkContainer.closest("section")?.setAttribute("data-empty-work", "true");
    } else {
      selectedWorkContainer.closest("section")?.removeAttribute("data-empty-work");
    }
  };

  const render = (items, meta) => {
    const publicReadyItems = items.filter((item) => isPublicReady(item));
    const hiddenItems = items.filter((item) => !isPublicReady(item));

    publicReadyItems.forEach((item) => {
      const title = safeText(item?.title);
      const url = safeText(item?.url);
      const description = safeText(item?.description);

      if (!title || !url || !description) {
        return;
      }

      const article = document.createElement("article");
      article.className = "card";

      const heading = document.createElement("h3");
      heading.appendChild(makeLink(url, title));

      const paragraph = document.createElement("p");
      paragraph.textContent = description;

      article.appendChild(heading);
      article.appendChild(paragraph);
      renderSourceMeta(item.source, article);
      container.appendChild(article);
    });

    if (container.children.length === 0) {
      failSafe("No valid evidence items");
      return;
    }

    if (evidenceSummaryEl) {
      const shown = publicReadyItems.length;
      const hidden = hiddenItems.length;
      const summaryParts = [`Evidence anchors: ${shown}`];
      if (hidden > 0) {
        summaryParts.push(`${hidden} not public-ready`);
      }
      evidenceSummaryEl.textContent = summaryParts.join(" | ");
    }

    renderMeta(meta || {});
  };

  // Fallback so the page remains usable even if JSON delivery fails.
  const failSafe = (message) => {
    const fallback =
      '<p class="section-note">Could not load evidence anchors. Static links are not rendered.</p>';

    container.innerHTML = fallback;
    if (selectedWorkContainer) {
      selectedWorkContainer.innerHTML = '<p class="section-note">Could not load selected-work cards. Static cards are not rendered.</p>';
    }
    console.error("Evidence inventory load failed", message);
  };

  fetch("content/site-content.json", { cache: "no-store" })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("HTTP " + resp.status);
      }
      return resp.json();
    })
    .then((data) => {
      if (!data || !Array.isArray(data.proofPoints) || data.proofPoints.length === 0) {
        throw new Error("No proof points configured");
      }
      if (loadingEl) {
        loadingEl.remove();
      }
      render(data.proofPoints, data.meta || {});
      renderSelectedWork(data.selectedWork, data.meta || {});
    })
    .catch((error) => {
      failSafe(error);
    });
})();
