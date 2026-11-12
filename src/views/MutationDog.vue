<template>
  <main class="mutation-dog-page">
    <div class="console-content">
      <RouterLink class="back-link" :to="{ name: 'GamePlay' }"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to Game &amp; Play</RouterLink>
      <header class="project-header">
        <div><h1>Mutation Dog</h1><p class="subtitle">Keep your dog normal. Or at least, try.</p></div>
        <a class="device-button" href="https://github.com/hochi0427/Mutation_Dog" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github" aria-hidden="true"></i> Code on GitHub <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
      </header>

      <div class="console-grid">
        <div class="information-column">
          <section class="console-module overview" aria-labelledby="overview-title">
            <div class="module-label"><h2 id="overview-title">About the Game</h2><i class="fa-solid fa-map section-icon" aria-hidden="true"></i></div>
            <p>Mutation Dog is a 3D first-person survival game where players take on the role of a dog owner trying to manage an unpredictable, constantly mutating pet.</p>
            <p>As the dog wanders around the park and eats mysterious food, unexpected mutations begin to appear. Players must react quickly, use the right tools, and keep the suspicion meter under control.</p>
            <p>The goal is simple: keep your dog from getting caught and survive until the antidote appears in the central pond to win the game.</p>
            <ul class="project-tags" aria-label="Project categories"><li>3D Game</li><li>First-Person</li><li>Stealth-Survival</li></ul>
          </section>

          <section class="contributions" aria-labelledby="contributions-title">
            <div class="module-label"><h2 id="contributions-title">My Contributions</h2><i class="fa-solid fa-compass section-icon" aria-hidden="true"></i></div>
            <p class="team-label">Team Project &middot; My Contributions: Gameplay Programming &amp; Audio</p>
            <div class="contribution-grid">
              <article v-for="contribution in contributions" :key="contribution.title" class="contribution-card">
                <i :class="contribution.icon" class="contribution-icon" aria-hidden="true"></i>
                <h3>{{ contribution.title }}</h3><p>{{ contribution.description }}</p>
              </article>
            </div>
          </section>

          <section class="console-module technology" aria-labelledby="technology-title">
            <div class="module-label"><h2 id="technology-title">Technologies Used</h2><i class="fa-solid fa-anchor section-icon" aria-hidden="true"></i></div>
            <ul class="technology-list"><li><i class="fa-brands fa-unity" aria-hidden="true"></i>Unity</li><li><span class="code-symbol" aria-hidden="true">C#</span>C#</li><li><i class="fa-solid fa-route" aria-hidden="true"></i>Unity NavMesh</li><li><i class="fa-solid fa-crosshairs" aria-hidden="true"></i><span>Raycasting <small class="team-badge" title="Implemented by other team members">Team</small></span></li><li><i class="fa-solid fa-cube" aria-hidden="true"></i><span>Blender <small class="team-badge" title="Implemented by other team members">Team</small></span></li></ul>
            <div class="vent" aria-hidden="true"></div>
          </section>
        </div>

        <section class="preview-console" aria-labelledby="preview-title">
          <div class="module-label"><h2 id="preview-title">Game Preview</h2><i class="fa-solid fa-sailboat section-icon" aria-hidden="true"></i></div>
          <div class="preview-bezel">
            <div ref="gamePlayer" class="game-player">
              <div ref="gameViewport" class="game-viewport" :aria-busy="gameRequested && loadState === 'loading'">
                <template v-if="!gameRequested">
                  <img class="game-cover" :src="`${base}images/DogMutation.png`" alt="Mutation Dog illustrated cover showing a dog with unexpected mutations in a park" />
                  <div class="load-action"><button type="button" class="device-button load-button" @click="loadGame"><i class="fa-solid fa-play" aria-hidden="true"></i> Play Game</button></div>
                </template>
                <iframe v-if="gameRequested && gameScale > 0" :key="frameVersion" class="game-frame" :style="{ transform: `scale(${gameScale}) translate(-1px, -1px)` }" width="1002" :height="gameFrameHeight" src="https://itch.io/embed-upload/17366932?color=204854" title="Play Mutation Dog Unity WebGL game" tabindex="0" allow="fullscreen; autoplay; gamepad; pointer-lock" allowfullscreen @load="frameLoaded" @error="frameFailed"></iframe>
                <div v-if="gameRequested && loadState === 'loading'" class="loading-state" role="status"><span class="loading-light" aria-hidden="true"></span>Loading Unity game...</div>
              </div>
            </div>
          </div>
          <div class="preview-controls">
            <p v-if="gameRequested && loadState === 'loaded'" class="mouse-controls" role="status">Click inside the game to enable mouse controls. Press Esc to release the cursor.</p>
            <p v-if="loadState === 'unavailable'" role="status">The embedded game couldn't load. You can play on itch.io instead.</p>
            <p v-else-if="gameRequested && loadState === 'slow'" role="status">The game is taking longer to load. You can retry or play on itch.io.</p>
            <p v-else>If the embedded game is unavailable, open it on itch.io.</p>
            <div class="player-actions"><a class="device-button" :href="itchUrl" target="_blank" rel="noopener noreferrer">Play on itch.io <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a><button v-if="gameRequested" type="button" class="icon-button" aria-label="Reload game preview" title="Reload game preview" :disabled="loadState === 'loading'" @click="reloadGame"><i class="fa-solid fa-rotate-right" aria-hidden="true"></i></button><button type="button" class="icon-button" aria-label="Enter game fullscreen" title="Fullscreen" @click="enterFullscreen"><i class="fa-solid fa-expand" aria-hidden="true"></i></button></div>
            <p v-if="fullscreenError" class="fullscreen-error" role="status">Fullscreen is unavailable in this browser.</p>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const base = import.meta.env.BASE_URL;
// Verified canonical project URL from itch.io's upload metadata.
const itchUrl = "https://hochi0427.itch.io/dog-mutation";
const gamePlayer = ref(null);
const gameViewport = ref(null);
const gameRequested = ref(false);
const gameScale = ref(0);
const gameFrameHeight = ref(1063);
const frameVersion = ref(0);
const loadState = ref("idle");
const fullscreenError = ref(false);
let playerObserver;
let loadingTimer;
const contributions = [
  { title: "Autonomous Dog AI", icon: "fa-solid fa-route", description: "Developed autonomous dog behavior using Unity NavMesh, enabling wandering, food detection, and navigation." },
  { title: "Mutation & Food System", icon: "fa-solid fa-dna", description: "Implemented randomized food spawning and probability-based mutations triggered by special food." },
  { title: "Suspicion Meter", icon: "fa-solid fa-gauge-high", description: "Developed a suspicion system that tracks mutations and determines when the game ends." },
  { title: "Game Audio", icon: "fa-solid fa-volume-high", description: "Designed and implemented game audio to enhance gameplay feedback and atmosphere." },
];

onMounted(() => {
  // Preserve the complete square canvas, excluding only Unity and itch.io footer chrome.
  gameFrameHeight.value = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 1021 : 1063;
  playerObserver = new ResizeObserver(() => { gameScale.value = gameViewport.value.clientWidth / 1000; });
  playerObserver.observe(gameViewport.value);
});
onBeforeUnmount(() => {
  playerObserver?.disconnect();
  window.clearTimeout(loadingTimer);
});
function loadGame() {
  window.clearTimeout(loadingTimer);
  loadState.value = "loading";
  gameRequested.value = true;
  loadingTimer = window.setTimeout(() => { if (loadState.value === "loading") loadState.value = "slow"; }, 30000);
}
function reloadGame() {
  frameVersion.value++;
  loadGame();
}
function frameLoaded() {
  window.clearTimeout(loadingTimer);
  // The cross-origin load event is not proof that Unity has finished initializing.
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
  } catch {
    fullscreenError.value = true;
  }
}
</script>

<style scoped>
.mutation-dog-page { position: fixed; z-index: 5; inset: 0; overflow-y: auto; overflow-x: hidden; background: #deeeed; color: #254c60; font-family: Arial, Helvetica, sans-serif; letter-spacing: 0; }
.mutation-dog-page *, .mutation-dog-page *::before, .mutation-dog-page *::after { box-sizing: border-box; letter-spacing: 0; }
.console-content { width: min(1520px, calc(100% - 80px)); margin-inline: auto; padding: 30px 0 64px; }
a { color: inherit; text-decoration: none; }
.back-link { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; color: #31565d; transition: opacity 180ms ease; }
.back-link:hover { opacity: .65; }
.project-header { display: flex; align-items: end; justify-content: space-between; gap: 32px; padding: 42px 0 32px; }
h1 { margin: 0; font: 500 58px/1.1 Georgia, 'Times New Roman', serif; }
.subtitle { margin: 12px 0 0; font-size: 16px; line-height: 1.5; }
.device-button { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; padding: 12px 18px; border: 1px solid #b9bfaf; border-radius: 6px; background: #f2eedf; box-shadow: inset 0 1px 0 #fff, 0 4px 0 #b8bfae, 0 7px 12px #31545c14; font: 600 13px/1.4 monospace; transition: transform 180ms ease; }
.device-button:hover { transform: translateY(-2px); }
.console-grid { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); gap: 20px; align-items: start; }
.information-column { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
.console-module { min-width: 0; padding: 20px; border: 1px solid #d2d0be; border-radius: 8px; background: #eee9d9; box-shadow: inset 1px 1px 0 #fff9, 0 5px 0 #bbc3b4, 0 12px 20px #31545c14; }
.module-label { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 14px; }
.module-label h2 { margin: 0; font: 600 12px/1.4 monospace; text-transform: uppercase; }
.section-icon { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 20px; width: 20px; height: 20px; color: #7c8874; font-size: 16px; }
p { margin: 0; font-size: 14px; line-height: 1.6; }
.overview { background: #204854; border-color: #173a43; color: #d0dfda; box-shadow: inset 0 1px 0 #ffffff30, 0 5px 0 #173741, 0 12px 20px #31545c20; }
.overview h2 { color: #edf1e6; }
.overview .section-icon { color: #a9c38f; }
.overview p + p { margin-top: 12px; }
.project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin: 18px 0 0; padding: 0; list-style: none; }
.project-tags li { padding: 4px 7px; border: 1px solid #86a7a366; border-radius: 3px; color: #e3eee3; background: #d3e4ce0d; font: 11px/1.4 monospace; }
.contributions { min-width: 0; padding-top: 4px; }
.team-label { margin-bottom: 14px; color: #61756c; font: 11px/1.6 monospace; }
.contribution-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.contribution-card { padding: 16px; border: 1px solid #bac8b2; border-radius: 6px; background: #dce4d2; box-shadow: inset 0 1px 0 #fff8, 0 3px 0 #b4c1aa, 0 7px 12px #31545c12; transition: transform 180ms ease; }
.contribution-card:hover { transform: translateY(-2px); }
.contribution-icon { display: block; color: #6b7d5d; font-size: 16px; margin-bottom: 10px; }
.contribution-card h3 { margin: 0 0 7px; font: 600 14px/1.4 monospace; }
.contribution-card p { font-size: 13px; line-height: 1.5; }
.technology { background: #d9d1bc; }
.technology-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 16px; padding: 0; margin: 0 0 20px; list-style: none; font: 14px/1.4 monospace; }
.technology-list li { display: flex; align-items: baseline; gap: 8px; }
.technology-list li > span { min-width: 0; }
.team-badge { display: inline-block; padding: 1px 4px; border: 1px solid #b1beac; border-radius: 3px; background: #dce4d2; color: #53654e; font: 500 9px/1.3 monospace; vertical-align: middle; white-space: nowrap; }
.technology-list i, .code-symbol { flex: 0 0 20px; width: 20px; color: #57674c; }
.code-symbol { font-size: 12px; font-weight: 600; }
.vent { width: 100%; height: 16px; border-radius: 3px; opacity: .5; background: repeating-linear-gradient(90deg, #9b9f8b 0 3px, transparent 3px 9px); }
.preview-console { display: flex; flex-direction: column; align-self: stretch; min-width: 0; padding: 24px; border: 2px solid #d2d0be; border-radius: 8px; background: #eee9d9; box-shadow: inset 2px 2px 0 #fff9, 0 7px 0 #bbc3b4, 0 18px 30px #31545c20; }
.preview-console > .module-label { margin-bottom: 20px; }
.preview-bezel { display: grid; place-items: center; flex: 1; padding: 10px; min-height: 0; border: 1px solid #aab7a9; border-radius: 8px; background: #b9c5ba; box-shadow: inset 2px 2px 6px #566c6840; }
.game-player { width: 100%; overflow: hidden; border-radius: 4px; background: #204854; }
.game-viewport { position: relative; width: 100%; aspect-ratio: 1; overflow: hidden; }
.game-cover { display: block; width: 100%; height: 100%; object-fit: contain; }
.load-action { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 12px; }
.load-button { background: #f2eedf; color: #254c60; box-shadow: inset 0 1px 0 #fff, 0 4px 0 #b8bfae, 0 8px 16px #17374166; cursor: pointer; }
.game-frame { position: absolute; top: 0; left: 0; display: block; width: 1002px; max-width: none; border: 0; transform-origin: top left; background: #204854; }
.game-player:fullscreen { display: grid; place-items: center; width: 100%; height: 100%; border-radius: 0; background: #102d35; }
.game-player:fullscreen .game-viewport { width: min(100vw, 100dvh); }
.loading-state { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 12px; padding: 20px; color: #d0dfda; background: #204854; font: 14px/1.5 monospace; pointer-events: none; }
.loading-light { flex: 0 0 8px; width: 8px; height: 8px; border-radius: 50%; background: #a9c38f; animation: loading-pulse 1000ms ease-in-out infinite alternate; }
.preview-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; margin-top: 18px; }
.preview-controls p { color: #61756c; font-size: 12px; }
.mouse-controls { flex-basis: 100%; }
.player-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-left: auto; }
.icon-button { display: grid; place-items: center; width: 40px; height: 40px; padding: 0; border: 1px solid #a7b39d; border-radius: 4px; background: #edf0e4; color: #52644e; cursor: pointer; }
.icon-button:disabled { cursor: wait; opacity: .5; }
.fullscreen-error { flex-basis: 100%; }
a:focus-visible, button:focus-visible, iframe:focus-visible { outline: 3px solid #38859a; outline-offset: 4px; }
@keyframes loading-pulse { to { opacity: .35; } }
@media (max-width: 1100px) { .console-content { width: calc(100% - 48px); } .project-header { flex-direction: column; align-items: start; gap: 24px; } .console-grid { grid-template-columns: minmax(0, 1fr); } .preview-console { align-self: start; } }
@media (max-width: 680px) { .console-content { width: calc(100% - 32px); padding-top: 24px; } .project-header { padding: 32px 0 24px; } h1 { font-size: 40px; } .subtitle { font-size: 15px; } .project-header > .device-button { width: 100%; } .information-column { gap: 18px; } .console-module { padding: 20px; } .contribution-card { padding: 14px; } .preview-console { padding: 14px; } .preview-bezel { padding: 5px; } .player-actions { margin-left: 0; width: 100%; } }
@media (max-width: 380px) { h1 { font-size: 36px; } .contribution-grid { grid-template-columns: minmax(0, 1fr); } .technology-list { gap: 12px; font-size: 13px; } }
@media (prefers-reduced-motion: reduce) { .device-button, .back-link, .contribution-card { transition: none; } .loading-light { animation: none; } .device-button:hover, .contribution-card:hover { transform: none; } }
</style>
