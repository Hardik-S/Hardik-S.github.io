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

    const sourceType = safeText(source.type);
    const sourceUrl = safeText(source.url);
    const verifiedAt = safeText(source.verifiedAt);
    const notes = safeText(source.notes);

    const compactParts = [];
    if (sourceType) {
      compactParts.push(`source: ${sourceType}`);
    }
    if (verifiedAt) {
      compactParts.push(`verified ${verifiedAt}`);
    }
    if (compactParts.length === 0 && !sourceUrl && !notes) {
      return;
    }

    const metaLine = document.createElement("p");
    metaLine.className = "section-note source-meta";
    if (compactParts.length > 0) {
      metaLine.textContent = compactParts.join(" \u00b7 ");
    } else {
      metaLine.textContent = "Source: recorded";
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

    const pieces = [];
    if (verifiedOn) {
      pieces.push(`Evidence verified: ${verifiedOn}`);
    }
    if (verifiedBy) {
      pieces.push(`Owner: ${verifiedBy}`);
    }
    if (source) {
      pieces.push(`Source: ${source}`);
    }

    evidenceMetaEl.textContent = pieces.length > 0
      ? pieces.join(" | ")
      : "Evidence metadata missing from content payload.";
  };

  const isPublicReady = (item) => item?.publicReady === true;

  const renderSelectedWork = (items, meta) => {
    if (!selectedWorkContainer) {
      return;
    }

    const selectedItems = Array.isArray(items) ? items.filter((item) => isPublicReady(item)) : [];

    if (selectedWorkLoadingEl) {
      selectedWorkLoadingEl.remove();
    }

    if (selectedItems.length === 0) {
      const fallback = document.createElement("p");
      fallback.className = "section-note";
      fallback.textContent = "No selected-work entries available yet. Evidence payload may be sparse.";
      selectedWorkContainer.innerHTML = "";
      selectedWorkContainer.append(fallback);
    }

    selectedItems.forEach((item) => {
      const title = safeText(item?.title);
      const url = safeText(item?.url);
      const summary = safeText(item?.summary);
      const focus = safeText(item?.focus);

      if (!title || !url || !summary || !focus) {
        return;
      }

      const article = document.createElement("article");
      article.className = "card";

      const label = document.createElement("p");
      label.className = "selected-work-label";
      label.textContent = focus;

      const heading = document.createElement("h3");
      heading.appendChild(makeLink(url, title));

      const paragraph = document.createElement("p");
      paragraph.textContent = summary;

      article.appendChild(label);
      article.appendChild(heading);
      article.appendChild(paragraph);
      renderSourceMeta(item.source, article);
      selectedWorkContainer.append(article);
    });

    if (selectedWorkMetaEl) {
      const selectedShown = selectedItems.length;
      const selectedSkipped = Math.max(0, Array.isArray(items) ? items.length - selectedShown : 0);
      const selectedSummary = [`Selected work cards: ${selectedShown}`];
      if (selectedSkipped > 0) {
        selectedSummary.push(`${selectedSkipped} not public-ready`);
      }
      if (safeText(meta?.verifiedOn)) {
        selectedSummary.push(`Verified: ${meta.verifiedOn}`);
      }
      selectedWorkMetaEl.textContent = selectedSummary.join(" · ");
    }

    // Preserve a single narrative section even if this data shape is missing.
    if (!meta || !Array.isArray(items) || items.length === 0) {
      selectedWorkContainer.closest("section")?.setAttribute("data-empty-work", "true");
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
      evidenceSummaryEl.textContent = summaryParts.join(" · ");
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
      if (!Array.isArray(data.proofPoints) || data.proofPoints.length === 0) {
        throw new Error("No proof points configured");
      }
      render(data.proofPoints, data.meta || {});
      renderSelectedWork(data.selectedWork, data.meta || {});
    })
    .catch((error) => {
      failSafe(error);
    });
})();
