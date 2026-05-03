const img = document.getElementById("diagram");

function getStoredMode() {
  const raw = localStorage.getItem("portfolio-theme"); // use correct key
  if (!raw) return null;

  try {
    return JSON.parse(raw).mode;
  } catch {
    return null;
  }
}

function updateImage(ev) {
  if (!img) return;

  let light;

  // ✅ use event value if available (instant update)
  if (ev?.detail?.mode !== undefined) {
    light = ev.detail.mode === true;
  } else {
    // fallback to storage (on page load)
    const mode = getStoredMode();
    light = mode === true;
  }

  img.src = light ? "Light.svg" : "Dark.svg";
}

// initial load
updateImage();

// live updates (no reload needed)
document.addEventListener("portfolio-theme-applied", updateImage);