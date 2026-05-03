(function () {
  function storageGet(key) {
    try {
      var v = localStorage.getItem(key);
      if (v != null && v !== "") return v;
    } catch (e) {}
    try {
      v = sessionStorage.getItem(key);
      if (v != null && v !== "") return v;
    } catch (e2) {}
    return null;
  }

  function applyVars(vars) {
    var el = document.documentElement;
    for (var k in vars) {
      if (Object.prototype.hasOwnProperty.call(vars, k)) {
        el.style.setProperty(k, vars[k]);
      }
    }
  }

  try {
    var raw = storageGet("portfolio-theme");
    if (!raw) return;
    var o = JSON.parse(raw);
    if (o && o.vars && typeof o.vars === "object") applyVars(o.vars);
  } catch (e) {}
})();
