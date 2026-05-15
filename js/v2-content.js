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

  const createStructuredVisual = ({ label, cue, source, index }) => {
    const visual = document.createElement("div");
    visual.className = "work-visual structured-work-visual";
    visual.setAttribute("aria-hidden", "true");
    visual.dataset.visualTone = String((index % 4) + 1);

    const visualMark = document.createElement("span");
    visualMark.className = "work-visual-mark";
    visualMark.textContent = label;

    const sourceType = safeText(source?.type) || "proof";
    const visualMeta = document.createElement("span");
    visualMeta.className = "work-visual-meta";
    visualMeta.textContent = sourceType;

    const visualCueEl = document.createElement("span");
    visualCueEl.className = "work-visual-cue";
    visualCueEl.textContent = cue;

    const flow = document.createElement("div");
    flow.className = "work-visual-flow";
    cue
      .split(/\s*->\s*/)
      .map((step) => safeText(step))
      .filter(Boolean)
      .slice(0, 4)
      .forEach((step, stepIndex) => {
        const node = document.createElement("span");
        node.className = "work-visual-node";
        node.dataset.step = String(stepIndex + 1);
        node.textContent = step;
        flow.append(node);
      });

    // This is intentionally generated from verified JSON cues, not a screenshot.
    visual.append(visualMark, visualMeta, visualCueEl, flow);
    return visual;
  };

  const createMediaVisual = (media) => {
    const src = safeText(media?.src);
    const alt = safeText(media?.alt);
    const caption = safeText(media?.caption);

    if (!src || !alt) {
      return null;
    }

    const figure = document.createElement("figure");
    figure.className = "work-visual work-media-visual";

    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    image.loading = "lazy";
    image.decoding = "async";
    if (media.width) {
      image.width = media.width;
    }
    if (media.height) {
      image.height = media.height;
    }

    if (caption) {
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = caption;
      figure.append(image, figcaption);
    } else {
      figure.append(image);
    }

    return figure;
  };

  // Keep selected-work as a tight flagship layer; broader proof remains below.
  const createSelectedWorkCard = (item, index) => {
    const title = safeText(item?.title);
    const url = safeText(item?.url);
    const summary = safeText(item?.summary);
    const focus = safeText(item?.focus);
    const problem = safeText(item?.problem);
    const contribution = safeText(item?.contribution);
    const whyItMatters = safeText(item?.whyItMatters);
    const caseStudy = item?.caseStudy && typeof item.caseStudy === "object" ? item.caseStudy : {};
    const visualLabel = safeText(item?.visual?.label) || focus || "Proof";
    const visualCue = safeText(item?.visual?.cue) || "Problem -> build -> proof";
    const media = item?.media && item.media.type === "screenshot" ? item.media : null;

    if (!title || !url || !summary) {
      return null;
    }

    const article = document.createElement("article");
    article.className = "card flagship-card";
    article.classList.add(index === 0 ? "flagship-card-featured" : "flagship-card-supporting");
    article.tabIndex = 0;
    article.dataset.workTitle = title;
    article.dataset.workFocus = focus || "Flagship proof";
    article.dataset.workSummary = summary;

    const visual = createMediaVisual(media) || createStructuredVisual({
      label: visualLabel,
      cue: visualCue,
      source: item.source,
      index
    });

    const rankLabel = document.createElement("p");
    rankLabel.className = "selected-work-rank";
    rankLabel.textContent = index === 0 ? "Lead proof" : `Supporting proof ${index}`;

    const focusLabel = document.createElement("p");
    focusLabel.className = "selected-work-label";
    focusLabel.textContent = focus || "Flagship proof";

    const heading = document.createElement("h3");
    heading.appendChild(makeLink(url, title));

    const paragraph = document.createElement("p");
    paragraph.textContent = summary;

    const reviewLink = makeLink(url, "Review public artifact");
    reviewLink.className = "work-review-link";

    article.append(visual, rankLabel, focusLabel, heading, paragraph);

    const details = [
      ["Problem", problem],
      ["Built", contribution],
      ["Why it matters", whyItMatters]
    ].filter(([, value]) => value);

    if (details.length > 0) {
      const detailList = document.createElement("dl");
      detailList.className = "work-details";
      details.forEach(([label, value]) => {
        const term = document.createElement("dt");
        term.textContent = label;
        const description = document.createElement("dd");
        description.textContent = value;
        detailList.append(term, description);
      });
      article.append(detailList);
    }

    const caseDetails = [
      ["Role", caseStudy.role],
      ["Artifact", caseStudy.artifactType],
      ["Proof", caseStudy.proof],
      ["Review", caseStudy.reviewFor]
    ].map(([label, value]) => [label, safeText(value)]).filter(([, value]) => value);

    if (caseDetails.length > 0) {
      const proofChips = document.createElement("div");
      proofChips.className = "work-proof-chips";
      caseDetails
        .filter(([label]) => ["Role", "Artifact", "Proof"].includes(label))
        .forEach(([label, value]) => {
          const chip = document.createElement("span");
          chip.textContent = `${label}: ${value}`;
          proofChips.append(chip);
        });
      article.append(proofChips);

      const caseList = document.createElement("dl");
      caseList.className = "case-study-details";
      caseDetails.forEach(([label, value]) => {
        const term = document.createElement("dt");
        term.textContent = label;
        const description = document.createElement("dd");
        description.textContent = value;
        caseList.append(term, description);
      });
      article.append(caseList);
    }

    article.append(reviewLink);
    renderSourceMeta(item.source, article);
    return article;
  };

  const renderSelectedWork = (items, meta) => {
    if (!selectedWorkContainer) {
      return;
    }

    const selectedItems = Array.isArray(items) ? items.filter((item) => isPublicReady(item)) : [];

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
        selectedWorkMetaEl.textContent = "Flagship proofs: 0";
      }
      return;
    }

    selectedItems.forEach((item, index) => {
      const card = createSelectedWorkCard(item, index);
      if (card) {
        selectedWorkContainer.append(card);
      }
    });

    if (selectedWorkMetaEl) {
      const selectedShown = selectedItems.length;
      const selectedSkipped = Math.max(0, Array.isArray(items) ? items.length - selectedShown : 0);
      const selectedSummary = [`Flagship proofs: ${selectedShown}`];
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

    document.dispatchEvent(new CustomEvent("v2:selected-work-rendered", {
      detail: {
        count: selectedItems.length
      }
    }));
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
