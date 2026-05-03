(function () {
  const STORAGE_KEY = "portfolio-theme";

  let mode = false;
  let currentHue = Math.floor(Math.random() * 360);
  let currentChroma = +(0.08 + Math.random() * 0.12).toFixed(3);

  const root = document.documentElement;
  const names = [
    "--bg-dark",
    "--bg",
    "--bg-light",
    "--text",
    "--text-muted",
    "--highlight",
    "--border",
    "--border-muted",
    "--primary",
    "--secondary",
    "--danger",
    "--warning",
    "--success",
    "--info",
  ];

  function storageGet(key) {
    try {
      const v = localStorage.getItem(key);
      if (v != null && v !== "") return v;
    } catch (_) {}
    try {
      const v = sessionStorage.getItem(key);
      if (v != null && v !== "") return v;
    } catch (_) {}
    return null;
  }

  function storageSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (_) {}
    try {
      sessionStorage.setItem(key, value);
    } catch (_) {}
  }

  function loadThemeFromStorage() {
    try {
      const raw = storageGet(STORAGE_KEY);
      if (!raw) return;
      const o = JSON.parse(raw);
      if (!o || typeof o !== "object") return;
      const hue = Number(o.hue);
      const chroma = Number(o.chroma);
      if (!Number.isFinite(hue) || !Number.isFinite(chroma)) return;
      mode = o.mode === true || o.mode === "true" || o.mode === 1;
      currentHue = ((Math.round(hue) % 360) + 360) % 360;
      currentChroma = Math.min(0.37, Math.max(0.02, chroma));
    } catch (_) {}
  }

  function varsFromTheme(theme) {
    const vars = {};
    names.forEach((n, i) => {
      vars[n] = theme[i];
    });
    return vars;
  }

  function persist(theme) {
    storageSet(
      STORAGE_KEY,
      JSON.stringify({
        mode,
        hue: currentHue,
        chroma: currentChroma,
        vars: varsFromTheme(theme),
      })
    );
    try {
      localStorage.removeItem("portfolio-theme-vars");
      sessionStorage.removeItem("portfolio-theme-vars");
    } catch (_) {}
  }

  function syncDarkToggleCheckbox() {
    const el = document.getElementById("dark-toggle");
    if (el) el.checked = !mode;
  }

  function generateTheme(hue, chroma, isLight) {
    const hueSecondary = (hue + 180) % 360;
    const chromaBg = +(chroma * 0.5).toFixed(3);
    const chromaText = +Math.min(chroma, 0.1).toFixed(3);
    const chromaAction = +Math.max(chroma, 0.1).toFixed(3);
    const chromaAlert = +Math.max(chroma, 0.05).toFixed(3);

    if (!isLight) {
      return [
        `oklch(0.1 ${chromaBg} ${hue})`,
        `oklch(0.15 ${chromaBg} ${hue})`,
        `oklch(0.2 ${chromaBg} ${hue})`,
        `oklch(0.96 ${chromaText} ${hue})`,
        `oklch(0.76 ${chromaText} ${hue})`,
        `oklch(0.5 ${chroma} ${hue})`,
        `oklch(0.4 ${chroma} ${hue})`,
        `oklch(0.3 ${chroma} ${hue})`,
        `oklch(0.76 ${chromaAction} ${hue})`,
        `oklch(0.76 ${chromaAction} ${hueSecondary})`,
        `oklch(0.7 ${chromaAlert} 30)`,
        `oklch(0.7 ${chromaAlert} 100)`,
        `oklch(0.7 ${chromaAlert} 160)`,
        `oklch(0.7 ${chromaAlert} 260)`,
      ];
    }
    return [
      `oklch(0.92 ${chromaBg} ${hue})`,
      `oklch(0.96 ${chromaBg} ${hue})`,
      `oklch(1 ${chromaBg} ${hue})`,
      `oklch(0.15 ${chromaText} ${hue})`,
      `oklch(0.4 ${chromaText} ${hue})`,
      `oklch(1 ${chroma} ${hue})`,
      `oklch(0.6 ${chroma} ${hue})`,
      `oklch(0.7 ${chroma} ${hue})`,
      `oklch(0.4 ${chromaAction} ${hue})`,
      `oklch(0.4 ${chromaAction} ${hueSecondary})`,
      `oklch(0.5 ${chromaAlert} 30)`,
      `oklch(0.5 ${chromaAlert} 100)`,
      `oklch(0.5 ${chromaAlert} 160)`,
      `oklch(0.5 ${chromaAlert} 260)`,
    ];
  }

  function setTheme(theme) {
    for (let i = 0; i < names.length; i++) {
      root.style.setProperty(names[i], theme[i]);
    }
  }

  function applyTheme() {
    const theme = generateTheme(currentHue, currentChroma, mode);
    setTheme(theme);
    persist(theme);
    syncDarkToggleCheckbox();
    window.portfolioIsLightMode = mode;
    document.dispatchEvent(
      new CustomEvent("portfolio-theme-applied", {
        detail: { lightMode: mode },
      })
    );
  }

  function toggle() {
    mode = !mode;
    applyTheme();
  }

  function changeTheme() {
    currentHue = Math.floor(Math.random() * 360);
    currentChroma = +(0.08 + Math.random() * 0.12).toFixed(3);
    applyTheme();
  }

  loadThemeFromStorage();

  window.toggle = toggle;
  window.changeTheme = changeTheme;
  window.applyPortfolioTheme = applyTheme;

  function init() {
    applyTheme();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
