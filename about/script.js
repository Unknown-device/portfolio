let mode = false;
let currentHue = Math.floor(Math.random() * 360);
let currentChroma = +(0.08 + Math.random() * 0.12).toFixed(3);
const img = document.getElementById("diagram");

// set diagram based on mode
function updateImage() {
  img.src = mode === true ? "Light.svg" : "Dark.svg";
}

updateImage()
// Get the root element
var r = document.querySelector(':root');

var names = [
  '--bg-dark', '--bg', '--bg-light', '--text', '--text-muted',
  '--highlight', '--border', '--border-muted', '--primary',
  '--secondary', '--danger', '--warning', '--success', '--info',
];

// Toggle only switches mode (same theme)
function toggle() {
  mode = !mode;
  applyTheme();
  updateImage()
}

// Generate NEW theme
function changeTheme() {
  currentHue = Math.floor(Math.random() * 360);
  currentChroma = +(0.08 + Math.random() * 0.12).toFixed(3);
  applyTheme();
}

// Apply current theme
function applyTheme() {
  const theme = generateTheme(currentHue, currentChroma, mode);
  setTheme(theme);
}

// Generate a single theme
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
      `oklch(0.7 ${chromaAlert} 260)`
    ];
  } else {
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
      `oklch(0.5 ${chromaAlert} 260)`
    ];
  }
}

// Apply to CSS
function setTheme(theme) {
  for (let i = 0; i < names.length; i++) {
    r.style.setProperty(names[i], theme[i]);
  }
}

// Initial load
applyTheme();

function startAsciiEffect(el) {
  if (!el) return;

  const original = el.textContent;
  let current = original.split("");

  const noise = "█▓▒░<>/\\[]{}—=+*^?#_";

  function randChar() {
    return noise[Math.floor(Math.random() * noise.length)];
  }

  // init noise (ignore spaces + line breaks)
  for (let i = 0; i < current.length; i++) {
    if (current[i] !== "\n" && current[i] !== " ") {
      current[i] = randChar();
    }
  }

  el.textContent = current.join("");

  // track unresolved
  let unresolved = [];
  for (let i = 0; i < original.length; i++) {
    if (original[i] !== "\n" && original[i] !== " ") {
      unresolved.push(i);
    }
  }

  const length = unresolved.length;

  // adaptive speed (formula)
  const speed = Math.min(150, Math.max(20, 200 - length * 5));

  // initial delay (short text = longer delay)
  let delayFrames = Math.max(0, Math.floor(10 - length));

  const interval = setInterval(() => {

    // delay phase
    if (delayFrames > 0) {
      delayFrames--;
      el.textContent = current.join("");
      return;
    }

    // adaptive noise
    let noiseCount = Math.max(2, Math.floor(length * 0.1));

    for (let i = 0; i < noiseCount; i++) {
      const idx = Math.floor(Math.random() * current.length);
      if (
        original[idx] !== "\n" &&
        original[idx] !== " " &&
        unresolved.includes(idx)
      ) {
        current[idx] = randChar();
      }
    }

    // adaptive resolve (formula)
    let resolveCount = Math.max(
      1,
      Math.floor(unresolved.length * (length < 50 ? 0.02 : 0.05))
    );

    for (let i = 0; i < resolveCount && unresolved.length; i++) {
      const r = Math.floor(Math.random() * unresolved.length);
      const idx = unresolved.splice(r, 1)[0];
      current[idx] = original[idx];
    }

    el.textContent = current.join("");

    // finish cleanly
    if (unresolved.length === 0) {
      el.textContent = original;
      clearInterval(interval);
    }

  }, speed);
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("body *").forEach(el => {
    if (el.children.length === 0 && el.textContent.trim().length > 0) {
      startAsciiEffect(el);
    }
  });
});
setTheme()


