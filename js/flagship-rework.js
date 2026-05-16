// Root rework interaction layer:
// native typed identity, cursor-reactive node canvas, active nav, and static POST form state.
(function () {
  const role = document.getElementById("typed-role");
  if (!role) {
    return;
  }

  const phrases = (role.dataset.roles || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (phrases.length < 2 || reduceMotion.matches) {
    role.textContent = phrases[0] || role.textContent;
    return;
  }

  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let deleting = false;
  let timer = null;

  const render = () => {
    role.textContent = phrases[phraseIndex].slice(0, charIndex);
  };

  const schedule = (delay) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(tick, delay);
  };

  const tick = () => {
    if (document.hidden) {
      schedule(700);
      return;
    }

    const phrase = phrases[phraseIndex];
    if (!deleting) {
      charIndex = Math.min(phrase.length, charIndex + 1);
      render();
      if (charIndex === phrase.length) {
        deleting = true;
        schedule(1500);
      } else {
        schedule(42);
      }
      return;
    }

    charIndex = Math.max(0, charIndex - 1);
    render();
    if (charIndex === 0) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      deleting = false;
      schedule(220);
    } else {
      schedule(22);
    }
  };

  schedule(1100);
})();

(function () {
  const canvas = document.getElementById("node-network");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!canvas || reduceMotion.matches) {
    return;
  }

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) {
    return;
  }

  const pointer = {
    x: window.innerWidth * 0.52,
    y: window.innerHeight * 0.36,
    active: false
  };
  let width = 0;
  let height = 0;
  let dpr = 1;
  let nodes = [];
  let frame = 0;

  const palette = [
    [117, 221, 255],
    [240, 189, 114],
    [157, 220, 141],
    [241, 157, 168],
    [179, 156, 255]
  ];

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targetCount = Math.max(54, Math.min(118, Math.floor((width * height) / 13500)));
    nodes = Array.from({ length: targetCount }, (_, index) => {
      const color = palette[index % palette.length];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: 1.1 + Math.random() * 1.9,
        color
      };
    });
  };

  const movePointer = (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  };

  const leavePointer = () => {
    pointer.active = false;
  };

  const draw = () => {
    frame = window.requestAnimationFrame(draw);
    ctx.clearRect(0, 0, width, height);

    for (const node of nodes) {
      const dx = pointer.x - node.x;
      const dy = pointer.y - node.y;
      const dist = Math.hypot(dx, dy) || 1;
      const pullRadius = pointer.active ? 260 : 110;

      if (dist < pullRadius) {
        const force = (pullRadius - dist) / pullRadius;
        node.vx += (dx / dist) * force * 0.018;
        node.vy += (dy / dist) * force * 0.018;
      }

      node.x += node.vx;
      node.y += node.vy;
      node.vx *= 0.985;
      node.vy *= 0.985;

      if (node.x < -20) node.x = width + 20;
      if (node.x > width + 20) node.x = -20;
      if (node.y < -20) node.y = height + 20;
      if (node.y > height + 20) node.y = -20;
    }

    for (let i = 0; i < nodes.length; i += 1) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j += 1) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 128) {
          continue;
        }

        const pointerBoost = Math.max(0, 1 - Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) / 330);
        const alpha = (1 - dist / 128) * (0.08 + pointerBoost * 0.24);
        ctx.strokeStyle = `rgba(${a.color[0]}, ${a.color[1]}, ${a.color[2]}, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    for (const node of nodes) {
      const nearPointer = Math.max(0, 1 - Math.hypot(node.x - pointer.x, node.y - pointer.y) / 260);
      ctx.fillStyle = `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, ${(0.36 + nearPointer * 0.5).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r + nearPointer * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  resize();
  draw();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", movePointer, { passive: true });
  window.addEventListener("pointerleave", leavePointer);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.cancelAnimationFrame(frame);
      return;
    }
    draw();
  });
})();

(function () {
  const links = Array.from(document.querySelectorAll(".main-nav a[href^='#']"));
  const sections = links
    .map((link) => {
      const target = document.querySelector(link.getAttribute("href"));
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if (sections.length === 0 || !("IntersectionObserver" in window)) {
    return;
  }

  const activate = (activeTarget) => {
    sections.forEach(({ link, target }) => {
      const active = target === activeTarget;
      link.classList.toggle("is-current", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const match = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (match) {
        activate(match.target);
      }
    },
    { rootMargin: "-24% 0px -58% 0px", threshold: [0.12, 0.32, 0.55] }
  );

  sections.forEach(({ target }) => observer.observe(target));
})();

(function () {
  const form = document.querySelector("[data-contact-form]");
  const status = form?.querySelector("[data-form-status]");
  const frame = form?.querySelector("iframe");

  if (!form || !status || !frame) {
    return;
  }

  let hasSubmitted = false;

  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      return;
    }

    const submitter = form.querySelector("button[type='submit']");
    hasSubmitted = true;
    status.classList.remove("is-error");
    status.textContent = "Sending...";
    if (submitter) {
      submitter.disabled = true;
    }
  });

  frame.addEventListener("load", () => {
    if (!hasSubmitted) {
      return;
    }

    const submitter = form.querySelector("button[type='submit']");
    status.classList.remove("is-error");
    status.textContent = "Message sent.";
    form.reset();
    hasSubmitted = false;
    if (submitter) {
      submitter.disabled = false;
    }
  });
})();
