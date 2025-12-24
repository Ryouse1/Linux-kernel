function saveState() {
  localStorage.setItem("webLinux", JSON.stringify({ fs, cwd, bootCount }));
}

function loadState() {
  const s = localStorage.getItem("webLinux");
  if (!s) return;
  const d = JSON.parse(s);
  fs = d.fs || fs;
  cwd = d.cwd || "/";
  bootCount = d.bootCount || 0;
}
