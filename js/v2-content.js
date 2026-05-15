(function () {
  const container = document.getElementById("evidence-grid");
  if (!container) {
    return;
  }

  const loadingEl = container.querySelector(".evidence-loading");
  const render = (items) => {
    const nodes = items
      .map((item) => {
        return `
          <article class="card">
            <h3><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a></h3>
            <p>${item.description}</p>
          </article>`;
      })
      .join("");
    container.innerHTML = nodes;
  };

  const failSafe = (message) => {
    const fallback =
      '  <p class="section-note">Could not load evidence anchors. ' +
      'The static links below remain valid if JavaScript is unavailable.</p>';

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
      render(data.proofPoints);
    })
    .catch((error) => {
      failSafe(error);
    });
})();
