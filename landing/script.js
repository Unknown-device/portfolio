let time;
let vs = `

void main() {
  vec3 pt = p.xyz;

  pt.xz *= rot(t*.1);
  pt.yz *= rot(t*.07);

  vec3 pt2 = pt*0.5;
  // pt2.xy*=rot(1.);
  //pt2.xz*=rot(2.);

  float tt = sin(t+noise(t*0.91+p.xyz)*2.+p.w*0.1);
  tt = ss(-.4,.4, tt );
  pt = mix(pt, pt2, tt);

  pt.xy *= 1.+pt.z*0.3;
  gl_Position = vec4(pt, 1.);
  gl_PointSize =  pt.z*1.+ noise(p.xyz*2.+t)*2.;
  
  color.r = 1.-float(gl_VertexID % 2);
  color.g = 1.-float((gl_VertexID+1) %2);
  color.b = 1.;

}
`;

let fs = `
#define x in
out vec4 o;
x vec3 color;
void main(){
 o = vec4(color,1);
}
`;

createCanvasWebgl(1, 1)
appendCanvas();

const canvas = document.querySelector("canvas");
const cube = document.querySelector("#cube");

cube.appendChild(canvas);

let gl = state.gl;

function resizeCubeGl() {
  const wCss = cube.clientWidth;
  const hCss = cube.clientHeight;
  if (wCss < 1 || hCss < 1) return;
  // Match justlib fitSize(ratio=1): square drawing buffer so clip-space matches the original look.
  const side = Math.min(Math.floor(wCss), Math.floor(hCss));
  canvas.style.margin = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  canvas.style.verticalAlign = "top";
  canvas.style.objectFit = "contain";
  if (canvas.width !== side || canvas.height !== side) {
    canvas.width = side;
    canvas.height = side;
    gl.viewport(0, 0, side, side);
  }
}

resizeCubeGl();
requestAnimationFrame(() => resizeCubeGl());
new ResizeObserver(resizeCubeGl).observe(cube);

gl.enable(gl.BLEND);
gl.blendFunc(gl.ONE, gl.ONE);
function grid(n, f) {
  return many(n, i => many(n, j => {
    let pt = f(i / (n - 1) - .5, j / (n - 1) - .5)
    return [
      ...pt, rnds(),
      ...pt, rnds(),
    ]
  })).flat()
}

let n = 38
let dots = [
  ...grid(n, (i, j) => [i, j, -.5]),
  ...grid(n, (i, j) => [i, j, .5]),
  ...grid(n, (i, j) => [i, -.5, j]),
  ...grid(n, (i, j) => [i, .5, j]),
  ...grid(n, (i, j) => [-.5, i, j]),
  ...grid(n, (i, j) => [.5, i, j]),
].flat();
dots = new Float32Array(dots);

//console.log(dots)
const drawDots = webglProgram(fs, lib + vs);

requestAnimationFrame(function f(t) {
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  time = t / 1000;
  drawDots(dots.length / 4, true)
  requestAnimationFrame(f)
})

// ================= ASCII EFFECT =================

function startAsciiEffect(el) {
  if (!el) return;

  const original = el.textContent;
  const buf = original.split("");
  const noise = "█▓▒░+*?";

  const pending = [];
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] === "\n" || buf[i] === " ") continue;
    pending.push(i);
    buf[i] = noise[(Math.random() * noise.length) | 0];
  }

  el.textContent = buf.join("");

  const tickMs = 45;
  const id = setInterval(() => {
    if (!pending.length) {
      clearInterval(id);
      el.textContent = original;
      return;
    }

    const batch = Math.max(1, Math.ceil(pending.length / 22));
    for (let k = 0; k < batch; k++) {
      const slot = (Math.random() * pending.length) | 0;
      const i = pending.splice(slot, 1)[0];
      buf[i] = original[i];
    }

    el.textContent = buf.join("");
  }, tickMs);
}

// ================= INIT ASCII =================

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("body *").forEach(el => {
    if (el.children.length === 0 && el.textContent.trim().length > 0) {
      startAsciiEffect(el);
    }
  });
});
