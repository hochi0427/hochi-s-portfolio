<template>
  <main class="vignette-page">
    <div class="console-content">
      <RouterLink class="back-link" :to="{ name: 'GamePlay' }"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to Game &amp; Play</RouterLink>
      <header class="project-header">
        <div><h1>Deadline Simulator</h1><p class="subtitle">A vignette-based typing game</p></div>
        <div class="project-links">
          <a class="device-button" href="https://github.com/hochi0427/deadline-vignette" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github" aria-hidden="true"></i> Code on GitHub <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
        </div>
      </header>

      <div class="console-grid">
        <div class="information-column">
        <section class="console-module overview" aria-labelledby="overview-title">
          <div class="module-label"><h2 id="overview-title">About the Game</h2><i class="fa-solid fa-map section-icon" aria-hidden="true"></i></div>
          <p>Deadline Simulator is a browser-based typing game that recreates the experience of rushing to finish work late at night. Through time pressure, mental fatigue, and sensory distractions, the game explores how interactive mechanics and feedback can communicate stress and gradually affect concentration.</p>
        </section>
        <section class="console-module features" aria-labelledby="features-title">
          <div class="module-label"><h2 id="features-title">Core Features</h2><i class="fa-solid fa-binoculars section-icon" aria-hidden="true"></i></div>
          <ul class="feature-list">
            <li><h3>Time-Pressure Typing</h3><p>Complete typing challenges under increasing pressure.</p></li>
            <li><h3>Bonus Sentence Mechanic</h3><p>Adds an additional layer to the typing experience.</p></li>
            <li><h3>Escalating Sensory Feedback</h3><p>Visual and interactive feedback reflects growing stress and fatigue.</p></li>
            <li>
              <h3 class="feature-title">Vignette-Based Experience <span ref="tooltipRoot" class="feature-info" @mouseenter="tooltipHovered = true; tooltipDismissed = false" @mouseleave="tooltipHovered = false"><button type="button" class="info-button" aria-label="What is a vignette?" :aria-describedby="tooltipVisible ? 'vignette-tooltip' : undefined" @click="toggleTooltip" @focus="tooltipFocused = true; tooltipDismissed = false" @blur="tooltipFocused = false; tooltipPinned = false" @keydown.esc.stop="tooltipPinned = false; tooltipDismissed = true"><i class="fa-solid fa-circle-info" aria-hidden="true"></i></button><span v-if="tooltipVisible" id="vignette-tooltip" class="feature-tooltip" role="tooltip">What is a vignette? A short scene or experience that captures a specific moment, mood, or feeling rather than telling a complete story.</span></span></h3>
              <p>Captures a brief moment of working late at night, emphasizing urgency and mental exhaustion rather than a complete storyline.</p>
            </li>
          </ul>
        </section>
        <section class="console-module technology" aria-labelledby="technology-title">
          <div class="module-label"><h2 id="technology-title">Technology</h2><i class="fa-solid fa-anchor section-icon" aria-hidden="true"></i></div>
          <ul class="technology-list"><li><i class="fa-brands fa-vuejs" aria-hidden="true"></i> Vue 3</li><li><i class="fa-solid fa-gamepad" aria-hidden="true"></i> Phaser</li><li><i class="fa-brands fa-js" aria-hidden="true"></i> JavaScript</li><li><i class="fa-solid fa-bolt" aria-hidden="true"></i> Vite</li></ul>
        </section>
        </div>
      <section class="preview-console" aria-labelledby="preview-title">
        <div class="module-label"><h2 id="preview-title">Game Preview</h2><i class="fa-solid fa-sailboat section-icon" aria-hidden="true"></i></div>
        <div class="preview-bezel">
          <div ref="gamePlayer" class="game-player" :aria-busy="loadState === 'loading'">
            <iframe v-if="frameMounted" ref="gameFrame" :src="gameUrl" width="1280" height="720" :style="{ transform: `translate(-50%, -50%) scale(${gameScale})` }" title="Play Deadline Simulator typing game" tabindex="0" allow="fullscreen; autoplay" allowfullscreen @load="frameLoaded" @error="frameFailed"></iframe>
            <div v-if="loadState === 'loading'" class="loading-state" role="status"><span class="loading-light" aria-hidden="true"></span> Loading game...</div>
          </div>
        </div>
        <div class="preview-controls">
          <p v-if="loadState === 'slow'" role="status">The game is taking longer to load. You can open it in a new tab.</p>
          <p v-else-if="loadState === 'unavailable'" role="status">The embedded game is unavailable. Open it in a new tab instead.</p>
          <p v-else>If the game doesn't appear, open it in a new tab.</p>
          <div class="player-actions"><a class="device-button" :href="gameUrl" target="_blank" rel="noopener noreferrer">Open Game in New Tab <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a><button type="button" class="fullscreen-button" aria-label="Reload game preview" title="Reload game preview" :disabled="loadState === 'loading'" @click="reloadPreview"><i class="fa-solid fa-rotate-right" aria-hidden="true"></i></button><button type="button" class="fullscreen-button" aria-label="Enter game fullscreen" title="Fullscreen" @click="enterFullscreen"><i class="fa-solid fa-expand" aria-hidden="true"></i></button></div>
          <p v-if="fullscreenError" class="fullscreen-error" role="status">Fullscreen is unavailable in this browser.</p>
        </div>
      </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";

const gameUrl = "https://hochi0427.github.io/deadline-vignette/";
const gamePlayer = ref(null);
const gameFrame = ref(null);
const frameMounted = ref(false);
const gameScale = ref(1);
const loadState = ref("loading");
const fullscreenError = ref(false);
const tooltipRoot = ref(null);
const tooltipHovered = ref(false);
const tooltipFocused = ref(false);
const tooltipPinned = ref(false);
const tooltipDismissed = ref(false);
const tooltipVisible = computed(() => !tooltipDismissed.value && (tooltipHovered.value || tooltipFocused.value || tooltipPinned.value));
let loadingTimer;
let playerObserver;
let mountFrameId = null;
let disposed = false;

onMounted(() => {
  document.addEventListener("pointerdown", dismissOutsideTooltip);
  playerObserver = new ResizeObserver(() => {
    const { width, height } = gamePlayer.value.getBoundingClientRect();
    if (!width || !height) return;
    gameScale.value = Math.min(width / 1280, height / 720);
    if (!frameMounted.value) mountPreview();
  });
  playerObserver.observe(gamePlayer.value);
});
onBeforeUnmount(() => {
  disposed = true;
  playerObserver?.disconnect();
  if (mountFrameId !== null) window.cancelAnimationFrame(mountFrameId);
  window.clearTimeout(loadingTimer);
  document.removeEventListener("pointerdown", dismissOutsideTooltip);
});

function mountPreview() {
  if (disposed || mountFrameId !== null) return;
  // Boot Phaser only after the preview has layout; its native viewport never resizes.
  mountFrameId = window.requestAnimationFrame(() => {
    mountFrameId = null;
    if (disposed) return;
    frameMounted.value = true;
    window.clearTimeout(loadingTimer);
    loadingTimer = window.setTimeout(() => {
      if (loadState.value === "loading") loadState.value = "slow";
    }, 15000);
  });
}
async function reloadPreview() {
  window.clearTimeout(loadingTimer);
  loadState.value = "loading";
  frameMounted.value = false;
  await nextTick();
  mountPreview();
}

function toggleTooltip() {
  tooltipPinned.value = !tooltipPinned.value;
  tooltipDismissed.value = !tooltipPinned.value;
}
function dismissOutsideTooltip(event) {
  if (!tooltipRoot.value?.contains(event.target)) {
    tooltipPinned.value = false;
    tooltipDismissed.value = true;
  }
}

function frameLoaded() {
  window.clearTimeout(loadingTimer);
  // A cross-origin load event cannot prove the game initialized; keep the fallback link visible.
  loadState.value = "loaded";
}
function frameFailed() {
  window.clearTimeout(loadingTimer);
  loadState.value = "unavailable";
}
async function enterFullscreen() {
  fullscreenError.value = false;
  try {
    await gamePlayer.value.requestFullscreen();
    gameFrame.value?.focus();
  } catch {
    fullscreenError.value = true;
  }
}
</script>

<style scoped>
.vignette-page { position: fixed; z-index: 5; inset: 0; overflow-y: auto; overflow-x: hidden; background: #deeeed; color: #254c60; font-family: Arial, Helvetica, sans-serif; letter-spacing: 0; }
.vignette-page *, .vignette-page *::before, .vignette-page *::after { box-sizing: border-box; letter-spacing: 0; }
.console-content { width: min(1520px, calc(100% - 80px)); margin-inline: auto; padding: 30px 0 64px; }
a { color: inherit; text-decoration: none; }
.back-link { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; color: #31565d; transition: opacity 180ms ease; }
.back-link:hover { opacity: .65; }
.project-header { display: flex; align-items: end; justify-content: space-between; gap: 32px; padding: 42px 0 32px; }
h1 { margin: 0; font: 500 58px/1.1 Georgia, 'Times New Roman', serif; }
.subtitle { margin: 12px 0 0; font-size: 16px; line-height: 1.5; }
.project-links { display: flex; flex-wrap: wrap; gap: 12px; }
.device-button { display: inline-flex; justify-content: center; align-items: center; gap: 10px; min-height: 48px; padding: 12px 18px; border: 1px solid #b9bfaf; border-radius: 6px; background: #f2eedf; box-shadow: inset 0 1px 0 #fff, 0 4px 0 #b8bfae, 0 7px 12px #31545c14; font: 600 13px/1.4 monospace; transition: transform 180ms ease; }
.device-button:hover { transform: translateY(-2px); }
.console-grid { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); align-items: start; gap: 20px; }
.information-column { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.information-column .console-module { padding: 20px; }
.information-column .module-label { margin-bottom: 14px; }
.console-module { min-width: 0; padding: 24px; border: 1px solid #d2d0be; border-radius: 8px; background: #eee9d9; box-shadow: inset 1px 1px 0 #fff9, 0 5px 0 #bbc3b4, 0 12px 20px #31545c14; transition: transform 200ms ease; animation: panel-arrive 550ms ease both; }
.console-module:hover { transform: translateY(-3px); }
.module-label { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 22px; }
.module-label h2 { margin: 0; font: 600 12px/1.4 monospace; text-transform: uppercase; }
.section-icon { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 20px; width: 20px; height: 20px; color: #7c8874; font-size: 16px; }
p { margin: 0; font-size: 14px; line-height: 1.65; }
.overview { background: #204854; border-color: #173a43; color: #d0dfda; box-shadow: inset 0 1px 0 #ffffff30, 0 5px 0 #173741, 0 12px 20px #31545c20; }
.overview h2 { color: #edf1e6; }
.overview .section-icon { color: #a9c38f; }
.features { background: #d6dfcd; }
.feature-list { display: grid; gap: 12px; padding: 0; margin: 0; list-style: none; font-size: 14px; line-height: 1.5; }
.feature-list li { position: relative; padding-left: 14px; border-left: 2px solid #98a98d; }
.feature-list h3 { margin: 0 0 4px; font-size: 14px; line-height: 1.5; }
.feature-list p { font-size: 13px; line-height: 1.5; }
.feature-title { display: flex; align-items: center; flex-wrap: wrap; gap: 4px 6px; }
.feature-info { display: inline-flex; }
.info-button { display: grid; place-items: center; flex: 0 0 24px; width: 24px; height: 24px; padding: 0; border: 0; background: transparent; color: #52694d; font-size: 14px; cursor: pointer; }
.feature-tooltip { position: absolute; z-index: 10; left: 0; bottom: calc(100% + 8px); width: min(280px, 100%); padding: 12px 14px; border: 1px solid #6f9290; border-radius: 6px; background: #204854; color: #edf1e6; box-shadow: 0 6px 16px #17374130; font: 400 12px/1.6 Arial, Helvetica, sans-serif; }
.technology { padding: 20px; background: #d9d1bc; }
.technology-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 16px; margin: 0; padding: 0; list-style: none; font: 15px/1.4 monospace; }
.technology-list li { display: flex; align-items: baseline; gap: 10px; }
.technology-list i { flex: 0 0 22px; width: 22px; color: #57674c; }
.preview-console { min-width: 0; padding: 24px; border: 2px solid #d2d0be; border-radius: 8px; background: #eee9d9; box-shadow: inset 2px 2px 0 #fff9, 0 7px 0 #bbc3b4, 0 18px 30px #31545c20; }
.preview-bezel { padding: 10px; border: 1px solid #aab7a9; border-radius: 8px; background: #b9c5ba; box-shadow: inset 2px 2px 6px #566c6840; }
.game-player { position: relative; width: 100%; aspect-ratio: 1280 / 720; overflow: hidden; border-radius: 4px; background: #111; }
.game-player iframe { position: absolute; top: 50%; left: 50%; display: block; width: 1280px; height: 720px; max-width: none; border: 0; background: #111; transform-origin: center; }
.game-player:fullscreen { width: 100%; height: 100%; border-radius: 0; }
.loading-state { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 12px; padding: 20px; color: #d0dfda; background: #204854; font: 14px/1.5 monospace; pointer-events: none; }
.loading-light { flex: 0 0 8px; width: 8px; height: 8px; border-radius: 50%; background: #a9c38f; animation: loading-pulse 1000ms ease-in-out infinite alternate; }
.preview-controls { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 14px; margin-top: 18px; }
.preview-controls p { color: #61756c; font-size: 12px; }
.player-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.fullscreen-button { display: grid; place-items: center; width: 40px; height: 40px; padding: 0; border: 1px solid #a7b39d; border-radius: 4px; background: #edf0e4; color: #52644e; cursor: pointer; }
.fullscreen-button:disabled { cursor: wait; opacity: .5; }
.fullscreen-error { flex-basis: 100%; }
a:focus-visible, button:focus-visible, iframe:focus-visible { outline: 3px solid #38859a; outline-offset: 4px; }
@keyframes panel-arrive { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes loading-pulse { to { opacity: .35; } }
@media (max-width: 1100px) { .console-content { width: calc(100% - 48px); } .project-header { flex-direction: column; align-items: start; gap: 24px; } }
@media (max-width: 1100px) { .console-grid { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 680px) { .console-content { width: calc(100% - 32px); padding-top: 24px; } .project-header { padding: 32px 0 24px; } h1 { font-size: 40px; } .subtitle { font-size: 15px; } .project-links { width: 100%; } .device-button { flex: 1 1 180px; } .console-grid { gap: 18px; } .console-module { padding: 20px; } .preview-console { padding: 14px; } .preview-bezel { padding: 5px; } .player-actions { width: 100%; } }
@media (prefers-reduced-motion: reduce) { .console-module, .loading-light { animation: none; } .console-module, .device-button, .back-link { transition: none; } .console-module:hover, .device-button:hover { transform: none; } }
</style>
