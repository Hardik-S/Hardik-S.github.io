// v2 evidence model:
// keep homepage proof anchors tied to auditable links and avoid HTML injection.
(function () {
  const container = document.getElementById("evidence-grid");
  const evidenceMetaEl = document.getElementById("evidence-meta");
  const researchNeedsEl = document.getElementById("research-needs-list");

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
      ? pieces.join(" · ")
      : "Evidence metadata missing from content payload.";
  };

  const render = (items, meta) => {
    items.forEach((item) => {
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
    }

    renderMeta(meta || {});
  };

  const renderResearchNeeds = (items) => {
    if (!researchNeedsEl) {
      return;
    }

    if (!Array.isArray(items) || items.length === 0) {
      researchNeedsEl.innerHTML = "<li class=\"section-note\">No open research needs are currently tracked.</li>";
      return;
    }

    researchNeedsEl.innerHTML = "";

    items.forEach((item) => {
      const li = document.createElement("li");
      const title = safeText(item?.title);
      const status = safeText(item?.status);
      const reason = safeText(item?.reason);
      const nextAction = safeText(item?.nextAction);

      if (!title) {
        return;
      }

      const heading = document.createElement("strong");
      heading.textContent = `${title}${status ? ` (${status})` : ""}`;

      const reasonP = document.createElement("p");
      reasonP.className = "section-note";
      reasonP.textContent = reason || "No reason provided.";

      li.appendChild(heading);
      if (nextAction) {
        const action = document.createElement("p");
        action.className = "section-note";
        action.textContent = nextAction;
        li.appendChild(action);
      } else if (reason) {
        li.appendChild(reasonP);
      } else {
        li.appendChild(reasonP);
      }

      if (reason && nextAction) {
        li.appendChild(reasonP);
      }

      researchNeedsEl.appendChild(li);
    });
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
      render(data.proofPoints, data.meta || {});
      renderResearchNeeds(data.researchNeeds);
    })
    .catch((error) => {
      failSafe(error);
    });
})();
