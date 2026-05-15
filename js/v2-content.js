// v2 evidence model:
// keep homepage proof anchors tied to auditable links and avoid HTML injection.
(function () {
  const container = document.getElementById("evidence-grid");
  const evidenceMetaEl = document.getElementById("evidence-meta");
  const evidenceSummaryEl = document.getElementById("evidence-summary");

  if (!container) {
    return;
  }

  const loadingEl = container.querySelector(".evidence-loading");
  const safeText = (value) => (value == null ? "" : String(value).trim());

  const makeLink = (url, text) => {
    const link = document.createElement("a");
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
    })
    .catch((error) => {
      failSafe(error);
    });
})();
