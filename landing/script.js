// ================= THEME SYSTEM =================

let mode = false;
let currentHue = Math.floor(Math.random() * 360);
let currentChroma = +(0.08 + Math.random() * 0.12).toFixed(3);

const root = document.documentElement;

const names = [
  '--bg-dark', '--bg', '--bg-light', '--text', '--text-muted',
  '--highlight', '--border', '--border-muted', '--primary',
  '--secondary', '--danger', '--warning', '--success', '--info',
];

let themeCache = {};

function toggle() {
  mode = !mode;
  applyTheme();
}

function changeTheme() {
  currentHue = Math.floor(Math.random() * 360);
  currentChroma = +(0.08 + Math.random() * 0.12).toFixed(3);
  applyTheme();
}

function applyTheme() {
  const theme = generateTheme(currentHue, currentChroma, mode);
  setTheme(theme);
  readTheme();
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

function setTheme(theme) {
  for (let i = 0; i < names.length; i++) {
    root.style.setProperty(names[i], theme[i]);
  }
}

function readTheme() {
  const s = getComputedStyle(document.documentElement);
  themeCache = {
    line: s.getPropertyValue('--text-muted').trim(),
    shadow: s.getPropertyValue('--border').trim(),
    accent: s.getPropertyValue('--primary').trim()
  };
}

// init
applyTheme();

// ================= ASCII EFFECT =================

function startAsciiEffect(el) {
  if (!el) return;

  const original = el.textContent;
  let current = original.split("");

  const noise = "█▓▒░<>/\\[]{}—=+*^?#_";

  const randChar = () => noise[Math.floor(Math.random() * noise.length)];

  for (let i = 0; i < current.length; i++) {
    if (current[i] !== "\n" && current[i] !== " ") {
      current[i] = randChar();
    }
  }

  el.textContent = current.join("");

  let unresolved = new Set();
  for (let i = 0; i < original.length; i++) {
    if (original[i] !== "\n" && original[i] !== " ") {
      unresolved.add(i);
    }
  }

  const length = unresolved.size;
  const speed = Math.min(150, Math.max(20, 200 - length * 5));
  let delayFrames = Math.max(0, Math.floor(10 - length));

  const interval = setInterval(() => {

    if (delayFrames > 0) {
      delayFrames--;
      el.textContent = current.join("");
      return;
    }

    let noiseCount = Math.max(2, Math.floor(length * 0.1));

    for (let i = 0; i < noiseCount; i++) {
      const idx = Math.floor(Math.random() * current.length);
      if (unresolved.has(idx)) {
        current[idx] = randChar();
      }
    }

    let resolveCount = Math.max(
      1,
      Math.floor(unresolved.size * (length < 50 ? 0.02 : 0.05))
    );

    for (let i = 0; i < resolveCount && unresolved.size; i++) {
      const arr = Array.from(unresolved);
      const idx = arr[Math.floor(Math.random() * arr.length)];
      unresolved.delete(idx);
      current[idx] = original[idx];
    }

    el.textContent = current.join("");

    if (unresolved.size === 0) {
      el.textContent = original;
      clearInterval(interval);
    }

  }, speed);
}

// ================= CANVAS =================

const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Cube {
  constructor(size, zOffset) {
    const s = size / 2;

    this.points = [
      [-s, -s, -s], [ s, -s, -s],
      [ s,  s, -s], [-s,  s, -s],
      [-s, -s,  s], [ s, -s,  s],
      [ s,  s,  s], [-s,  s,  s]
    ];

    this.edges = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7]
    ];

    this.zOffset = zOffset;
  }

  rotate(ax, ay, az) {
    const sinX = Math.sin(ax), cosX = Math.cos(ax);
    const sinY = Math.sin(ay), cosY = Math.cos(ay);
    const sinZ = Math.sin(az), cosZ = Math.cos(az);

    this.points = this.points.map(([x, y, z]) => {
      let y1 = y * cosX - z * sinX;
      let z1 = y * sinX + z * cosX;

      let x2 = x * cosY - z1 * sinY;
      let z2 = x * sinY + z1 * cosY;

      let x3 = x2 * cosZ - y1 * sinZ;
      let y3 = x2 * sinZ + y1 * cosZ;

      return [x3, y3, z2];
    });
  }

  project(pov, scale) {
    return this.points.map(([x, y, z]) => {
      z += this.zOffset;
      const f = pov / z * scale;
      return [
        W / 2 + x * f,
        H / 2 + y * f
      ];
    });
  }

  draw(pov, scale) {
    const pts = this.project(pov, scale);
    const { line, shadow, accent } = themeCache;

    this.edges.forEach(([a, b], i) => {
      const p1 = pts[a];
      const p2 = pts[b];
      const color = (i % 4 === 0) ? accent : line;

      // shadow
      ctx.beginPath();
      ctx.strokeStyle = shadow;
      ctx.lineWidth = 8;
      ctx.moveTo(p1[0] + 1, p1[1] + 1);
      ctx.lineTo(p2[0] + 1, p2[1] + 1);
      ctx.stroke();

      // line
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.stroke();
    });
  }
}

// setup
const cubes = [
  new Cube(60, 200),
  new Cube(30, 200),
  new Cube(10, 200)
];

const pov = 1 / Math.tan(60 * 0.5 * Math.PI / 180);

function loop() {
  requestAnimationFrame(loop);

  const scale = Math.max(W, H) * 0.5;
  ctx.clearRect(0, 0, W, H);

  cubes.forEach((cube, i) => {
    cube.rotate(
      0.005 * (i + 1),
      0.01 * (i + 1),
      0.015 * (i + 1)
    );
    cube.draw(pov, scale);
  });
}

loop();

// ================= INIT ASCII =================

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("body *").forEach(el => {
    if (el.children.length === 0 && el.textContent.trim().length > 0) {
      startAsciiEffect(el);
    }
  });
});
