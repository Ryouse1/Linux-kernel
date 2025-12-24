let fps = 0, frames = 0, last = performance.now();

function fpsLoop(now) {
  frames++;
  if (now - last >= 1000) {
    fps = frames;
    frames = 0;
    last = now;
  }
  requestAnimationFrame(fpsLoop);
}
requestAnimationFrame(fpsLoop);

function getRAM() {
  if (performance.memory) {
    return {
      used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
      total: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024),
      real: true
    };
  }
  return {
    used: Math.floor(300 + Math.random() * 300),
    total: 2048,
    real: false
  };
}
