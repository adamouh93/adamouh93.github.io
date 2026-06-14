/* ============================================================
   Portfolio Adam Ouhadj — interactions
   ============================================================ */

// --- Année dans le footer ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- Splash : effet de frappe puis disparition ---
(function () {
  const splash = document.getElementById("splash");
  const target = document.getElementById("typed-cmd");
  const text = " ./portfolio --user adam";
  let i = 0;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    target.textContent = text;
    setTimeout(() => splash.classList.add("hide"), 600);
    return;
  }

  function type() {
    if (i <= text.length) {
      target.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 55);
    } else {
      setTimeout(() => splash.classList.add("hide"), 500);
    }
  }
  setTimeout(type, 300);
})();

// --- Menu mobile ---
(function () {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.classList.toggle("open");
  });

  // referme le menu au clic sur un lien
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
    });
  });
})();

// --- Barres de compétences : remplissage au scroll ---
(function () {
  const bars = document.querySelectorAll(".lvl");
  if (!("IntersectionObserver" in window)) {
    bars.forEach((b) => {
      b.style.setProperty("--w", b.dataset.lvl + "%");
      b.classList.add("fill");
    });
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.setProperty("--w", bar.dataset.lvl + "%");
          bar.classList.add("fill");
          obs.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 },
  );
  bars.forEach((b) => obs.observe(b));
})();
