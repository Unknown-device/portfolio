let mode = true
let currentTheme = 4
function toggle() {
  mode = !mode;
  setTheme()
}
// Get the root element
var r = document.querySelector(':root');
var names = [
  '--bg-dark', '--bg', '--bg-light', '--text', '--text-muted', '--highlight', '--border', '--border-muted', '--primary', '--secondary', '--danger', '--warning', '--success', '--info',
]

var themesDark = [
  [
    "oklch(0.1 0.1 185)", "oklch(0.15 0.1 185)", "oklch(0.2 0.1 185)",
    "oklch(0.96 0.1 185)", "oklch(0.76 0.1 185)", "oklch(0.5 0.2 185)",
    "oklch(0.4 0.2 185)", "oklch(0.3 0.2 185)", "oklch(0.76 0.2 185)",
    "oklch(0.76 0.2 5)", "oklch(0.7 0.2 30)", "oklch(0.7 0.2 100)",
    "oklch(0.7 0.2 160)", "oklch(0.7 0.2 260)"
  ],
  [
    "oklch(0.1 0.1 20)", "oklch(0.15 0.1 20)", "oklch(0.2 0.1 20)",
    "oklch(0.96 0.1 20)", "oklch(0.76 0.1 20)", "oklch(0.5 0.2 20)",
    "oklch(0.4 0.2 20)", "oklch(0.3 0.2 20)", "oklch(0.76 0.2 20)",
    "oklch(0.76 0.2 200)", "oklch(0.7 0.2 30)", "oklch(0.7 0.2 100)",
    "oklch(0.7 0.2 160)", "oklch(0.7 0.2 260)"
  ],
  [
    "oklch(0.1 0.1 135)", "oklch(0.15 0.1 135)", "oklch(0.2 0.1 135)",
    "oklch(0.96 0.1 135)", "oklch(0.76 0.1 135)", "oklch(0.5 0.2 135)",
    "oklch(0.4 0.2 135)", "oklch(0.3 0.2 135)", "oklch(0.76 0.2 135)",
    "oklch(0.76 0.2 315)", "oklch(0.7 0.2 30)", "oklch(0.7 0.2 100)",
    "oklch(0.7 0.2 160)", "oklch(0.7 0.2 260)"
  ],
  [
    "oklch(0.1 0.075 264)", "oklch(0.15 0.075 264)", "oklch(0.2 0.075 264)",
    "oklch(0.96 0.1 264)", "oklch(0.76 0.1 264)", "oklch(0.5 0.15 264)",
    "oklch(0.4 0.15 264)", "oklch(0.3 0.15 264)", "oklch(0.76 0.15 264)",
    "oklch(0.76 0.15 84)", "oklch(0.7 0.15 30)", "oklch(0.7 0.15 100)",
    "oklch(0.7 0.15 160)", "oklch(0.7 0.15 260)"
  ],
  [
    "oklch(0.1 0.1 220)", "oklch(0.15 0.1 220)", "oklch(0.2 0.1 220)",
    "oklch(0.96 0.1 220)", "oklch(0.76 0.1 220)", "oklch(0.5 0.2 220)",
    "oklch(0.4 0.2 220)", "oklch(0.3 0.2 220)", "oklch(0.76 0.2 220)",
    "oklch(0.76 0.2 40)", "oklch(0.7 0.2 30)", "oklch(0.7 0.2 100)",
    "oklch(0.7 0.2 160)", "oklch(0.7 0.2 260)"
  ]
];

var themesLight = [
  [
    "oklch(0.92 0.1 185)", "oklch(0.96 0.1 185)", "oklch(1 0.1 185)",
    "oklch(0.15 0.1 185)", "oklch(0.4 0.1 185)", "oklch(1 0.2 185)",
    "oklch(0.6 0.2 185)", "oklch(0.7 0.2 185)", "oklch(0.4 0.2 185)",
    "oklch(0.4 0.2 5)", "oklch(0.5 0.2 30)", "oklch(0.5 0.2 100)",
    "oklch(0.5 0.2 160)", "oklch(0.5 0.2 260)"
  ],
  [
    "oklch(0.92 0.1 20)", "oklch(0.96 0.1 20)", "oklch(1 0.1 20)",
    "oklch(0.15 0.1 20)", "oklch(0.4 0.1 20)", "oklch(1 0.2 20)",
    "oklch(0.6 0.2 20)", "oklch(0.7 0.2 20)", "oklch(0.4 0.2 20)",
    "oklch(0.4 0.2 200)", "oklch(0.5 0.2 30)", "oklch(0.5 0.2 100)",
    "oklch(0.5 0.2 160)", "oklch(0.5 0.2 260)"
  ],
  [
    "oklch(0.92 0.1 135)", "oklch(0.96 0.1 135)", "oklch(1 0.1 135)",
    "oklch(0.15 0.1 135)", "oklch(0.4 0.1 135)", "oklch(1 0.2 135)",
    "oklch(0.6 0.2 135)", "oklch(0.7 0.2 135)", "oklch(0.4 0.2 135)",
    "oklch(0.4 0.2 315)", "oklch(0.5 0.2 30)", "oklch(0.5 0.2 100)",
    "oklch(0.5 0.2 160)", "oklch(0.5 0.2 260)"
  ],
  [
    "oklch(0.92 0.075 264)", "oklch(0.96 0.075 264)", "oklch(1 0.075 264)",
    "oklch(0.15 0.1 264)", "oklch(0.4 0.1 264)", "oklch(1 0.15 264)",
    "oklch(0.6 0.15 264)", "oklch(0.7 0.15 264)", "oklch(0.4 0.15 264)",
    "oklch(0.4 0.15 84)", "oklch(0.5 0.15 30)", "oklch(0.5 0.15 100)",
    "oklch(0.5 0.15 160)", "oklch(0.5 0.15 260)"
  ],
  [
    "oklch(0.92 0.1 220)", "oklch(0.96 0.1 220)", "oklch(1 0.1 220)",
    "oklch(0.15 0.1 220)", "oklch(0.4 0.1 220)", "oklch(1 0.2 220)",
    "oklch(0.6 0.2 220)", "oklch(0.7 0.2 220)", "oklch(0.4 0.2 220)",
    "oklch(0.4 0.2 40)", "oklch(0.5 0.2 30)", "oklch(0.5 0.2 100)",
    "oklch(0.5 0.2 160)", "oklch(0.5 0.2 260)"
  ]
];
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


