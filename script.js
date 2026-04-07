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

function changeTheme() {
  currentTheme = Math.floor(Math.random() * 5);;
  setTheme()
}

function setTheme() {
  // Set the theme
  for (let i = 0; i != 14; i++) {
    if (mode == true)
      r.style.setProperty(names[i], themesDark[currentTheme][i]);
    else
      r.style.setProperty(names[i], themesLight[currentTheme][i]);
  }
}

function startAsciiEffect() {
  const el = document.querySelector(".ascii");

  const original = el.textContent;
  let current = original.split("");

  const noise = "█▓▒░<>/\\[]{}—=+*^?#_";

  function randChar() {
    return noise[Math.floor(Math.random() * noise.length)];
  }

  // init noise
  for (let i = 0; i < current.length; i++) {
    if (current[i] !== "\n" && current[i] !== " ") {
      current[i] = randChar();
    }
  }

  el.textContent = current.join("");

  let unresolved = [];
  for (let i = 0; i < original.length; i++) {
    if (original[i] !== "\n" && original[i] !== " ") {
      unresolved.push(i);
    }
  }

  const interval = setInterval(() => {

    // adaptive noise
    let noiseCount = unresolved.length > 200 ? 40 : 10;
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

    // adaptive resolve (slows near end)
    let resolveCount = Math.max(1, Math.floor(unresolved.length * 0.05));

    for (let i = 0; i < resolveCount && unresolved.length; i++) {
      const r = Math.floor(Math.random() * unresolved.length);
      const idx = unresolved.splice(r, 1)[0];
      current[idx] = original[idx];
    }

    el.textContent = current.join("");

    if (unresolved.length === 0) {
      el.textContent = original;
      clearInterval(interval);
    }

  }, 20);
}
document.addEventListener("DOMContentLoaded", () => {
  startAsciiEffect();
});

setTheme()


