<template>
  <main class="rhythm-grove-page">
    <div class="console-content">
      <RouterLink class="back-link" :to="{ name: 'GamePlay' }"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to Game &amp; Play</RouterLink>
      <header class="project-header">
        <div>
          <h1>Rhythm Grove</h1>
          <p class="subtitle">A Tangible Rhythm-Based Game</p>
        </div>
        <div class="project-actions">
          <p class="project-status"><span aria-hidden="true"></span>Work in Progress</p>
          <a class="device-button" :href="repositoryUrl" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github" aria-hidden="true"></i> Code on GitHub <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
        </div>
      </header>

      <div class="page-sections">
        <div class="information-row">
          <section class="console-module overview" aria-labelledby="overview-title">
            <div class="module-label"><h2 id="overview-title">About the Game</h2><i class="fa-solid fa-map" aria-hidden="true"></i></div>
            <h3>Feel the Rhythm.</h3>
            <p>Rhythm Grove is a tangible rhythm-learning game that combines a custom-built electronic drum with an interactive web application. Players engage in rhythm-based challenges through physical drumming while receiving immediate auditory and visual feedback.</p>
            <p>The project explores how tangible interaction and multimodal feedback can support rhythm recognition, timing, and collaborative play.</p>
          </section>

          <section class="console-module interaction" aria-labelledby="interaction-title">
            <div class="module-label"><h2 id="interaction-title">Interaction &amp; Technical Design</h2><i class="fa-solid fa-compass" aria-hidden="true"></i></div>
            <dl class="interaction-concepts">
              <div v-for="concept in interactionConcepts" :key="concept.title"><dt>{{ concept.title }}</dt><dd>{{ concept.description }}</dd></div>
            </dl>
          </section>

          <section class="console-module technology" aria-labelledby="technology-title">
            <div class="module-label"><h2 id="technology-title">Technologies Used</h2><i class="fa-solid fa-anchor" aria-hidden="true"></i></div>
            <ul class="technology-list"><li v-for="technology in technologies" :key="technology.name"><i :class="technology.icon" aria-hidden="true"></i><span>{{ technology.name }}<small>{{ technology.subtitle }}</small></span></li></ul>
          </section>
        </div>

        <section class="console-module showcase gameplay" aria-labelledby="gameplay-title">
          <div class="module-label"><h2 id="gameplay-title">Gameplay Preview</h2><i class="fa-solid fa-drum" aria-hidden="true"></i></div>
          <div class="preview-bezel">
            <div ref="gamePlayer" class="game-player" :aria-busy="previewState === 'loading'">
              <iframe :src="liveUrl" title="Play Rhythm Grove" tabindex="0" allow="serial; fullscreen" allowfullscreen @load="previewLoaded" @error="previewFailed"></iframe>
              <div v-if="previewState === 'loading'" class="preview-loading placeholder" role="status"><i class="fa-solid fa-drum" aria-hidden="true"></i><p>Loading Rhythm Grove...</p></div>
            </div>
          </div>
          <div class="preview-controls">
            <p v-if="previewState === 'slow' || previewState === 'unavailable'" role="status">The embedded game is unavailable or taking longer to load. Open it in a new tab to play.</p>
            <div class="preview-actions"><a class="device-button" :href="liveUrl" target="_blank" rel="noopener noreferrer">Open Game in New Tab <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a><button class="fullscreen-button" type="button" aria-label="Enter gameplay fullscreen" title="Fullscreen" @click="enterFullscreen"><i class="fa-solid fa-expand" aria-hidden="true"></i></button></div>
            <p v-if="fullscreenError" role="status">Fullscreen is unavailable in this browser. Open the game in a new tab instead.</p>
          </div>
        </section>

        <section class="console-module showcase physical-drum" aria-labelledby="drum-title">
          <div class="module-label"><h2 id="drum-title">Physical Drum</h2><i class="fa-solid fa-drum-steelpan" aria-hidden="true"></i></div>
          <div class="drum-photo">
            <img v-if="drumPhoto && !photoFailed" :src="`${base}${drumPhoto}`" alt="The physical drum used to play Rhythm Grove" @error="photoFailed = true" />
            <div v-else class="photo-placeholder placeholder"><i class="fa-regular fa-image" aria-hidden="true"></i><p>Physical Drum &mdash; Photo Coming Soon</p></div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const base = import.meta.env.BASE_URL;
const liveUrl = "https://hochi0427.github.io/rhythm-grove/";
const repositoryUrl = "https://github.com/hochi0427/rhythm-grove";
const gamePlayer = ref(null);
const previewState = ref("loading");
const fullscreenError = ref(false);
let previewTimer;
onMounted(() => {
  if (previewState.value === "loading") previewTimer = window.setTimeout(() => { if (previewState.value === "loading") previewState.value = "slow"; }, 20000);
});
onBeforeUnmount(() => window.clearTimeout(previewTimer));
function previewLoaded() {
  window.clearTimeout(previewTimer);
  // The iframe load event cannot confirm the cross-origin game's readiness.
  previewState.value = "loaded";
}
function previewFailed() {
  window.clearTimeout(previewTimer);
  previewState.value = "unavailable";
}
async function enterFullscreen() {
  fullscreenError.value = false;
  try { await gamePlayer.value.requestFullscreen(); }
  catch { fullscreenError.value = true; }
}
// Set this one public asset path when the actual drum photo is available.
const drumPhoto = "";
const photoFailed = ref(false);
const technologies = [
  { name: "Vue 3", subtitle: "Frontend Development", icon: "fa-brands fa-vuejs" },
  { name: "JavaScript", subtitle: "Programming", icon: "fa-brands fa-js" },
  { name: "Arduino Nano Every", subtitle: "Microcontroller", icon: "fa-solid fa-microchip" },
  { name: "Web Serial API", subtitle: "Hardware\u2013Web Communication", icon: "fa-solid fa-plug" },
  { name: "Soldering", subtitle: "Electronics Assembly", icon: "fa-solid fa-screwdriver-wrench" },
  { name: "3D Printing", subtitle: "Physical Prototyping", icon: "fa-solid fa-cube" },
];
const interactionConcepts = [
  { title: "Custom Hardware Integration", description: "Built a custom electronic drum using a piezoelectric sensor, Arduino Nano Every, and programmable LEDs." },
  { title: "Real-Time Hardware\u2013Web Communication", description: "Connected physical drum inputs to browser-based gameplay using the Web Serial API." },
  { title: "Multimodal Feedback", description: "Combined drum sounds, LED lighting, and synchronized screen effects to provide immediate feedback during gameplay." },
];
</script>

<style scoped>
.rhythm-grove-page { position: fixed; z-index: 5; inset: 0; overflow-y: auto; overflow-x: hidden; background: #deeeed; color: #254c60; font-family: Arial, Helvetica, sans-serif; letter-spacing: 0; }
.rhythm-grove-page *, .rhythm-grove-page *::before, .rhythm-grove-page *::after { box-sizing: border-box; letter-spacing: 0; }
.console-content { --grid-gap: 20px; width: min(1360px, calc(100% - 80px)); margin-inline: auto; padding: 30px 0 64px; }
a { color: inherit; text-decoration: none; }
.back-link { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; transition: opacity 180ms ease; }
.back-link:hover { opacity: .65; }
.project-header { display: flex; align-items: end; justify-content: space-between; gap: 32px; padding: 38px 0 32px; }
h1 { margin: 0; font: 500 58px/1.1 Georgia, 'Times New Roman', serif; }
.subtitle { margin-top: 12px; font-size: 16px; }
.project-status { display: inline-flex; align-items: center; gap: 8px; color: #61756c; font: 12px/1.6 monospace; }
.project-status span { flex: 0 0 7px; width: 7px; height: 7px; border-radius: 50%; background: #83956d; }
.project-actions { display: flex; flex-direction: column; align-items: end; gap: 14px; }
.device-button { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; padding: 12px 18px; border: 1px solid #b9bfaf; border-radius: 6px; background: #f2eedf; box-shadow: inset 0 1px 0 #fff, 0 4px 0 #b8bfae, 0 7px 12px #31545c14; font: 600 13px/1.4 monospace; transition: transform 180ms ease; }
.device-button:hover { transform: translateY(-2px); }
.page-sections { display: grid; gap: 32px; }
.information-row { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1.4fr) minmax(0, 1fr); gap: var(--grid-gap); align-items: stretch; }
.console-module { min-width: 0; padding: 24px; border: 1px solid #d2d0be; border-radius: 8px; background: #eee9d9; box-shadow: inset 1px 1px 0 #fff9, 0 5px 0 #bbc3b4, 0 12px 20px #31545c14; animation: panel-arrive 550ms ease both; }
.module-label { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
.module-label h2 { margin: 0; font: 600 12px/1.4 monospace; text-transform: uppercase; }
.module-label > i { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 20px; width: 20px; height: 20px; font-size: 16px; color: #7c8874; }
h3 { margin: 0 0 12px; font: 600 23px/1.4 monospace; }
p { margin: 0; font-size: 14px; line-height: 1.65; }
.overview { color: #edf1e6; background: #204854; border-color: #173a43; box-shadow: inset 0 1px 0 #ffffff30, 0 5px 0 #173741, 0 12px 20px #31545c20; }
.overview .module-label > i { color: #a9c38f; }
.overview p { color: #d0dfda; }
.overview p + p { margin-top: 14px; }
.interaction { background: #d6dfcd; }
.interaction-concepts { display: grid; gap: 16px; margin: 0; }
.interaction-concepts dt { margin-bottom: 5px; font: 600 13px/1.5 monospace; }
.interaction-concepts dd { margin: 0; font-size: 13px; line-height: 1.6; }
.technology { background: #d9d1bc; }
.technology-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 12px; padding: 0; margin: 0; list-style: none; font: 13px/1.5 monospace; }
.technology-list li { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; min-width: 0; }
.technology-list li > span { min-width: 0; overflow-wrap: anywhere; }
.technology-list i { width: 16px; height: 16px; color: #57674c; font-size: 14px; }
.technology-list small { display: block; margin-top: 5px; color: #61756c; font-size: 11px; }
.showcase { border-width: 2px; box-shadow: inset 2px 2px 0 #fff9, 0 7px 0 #bbc3b4, 0 18px 30px #31545c20; }
.showcase > .module-label h2 { font-size: 24px; text-transform: none; }
.preview-bezel { min-width: 0; padding: 8px; border: 1px solid #aab7a9; border-radius: 6px; background: #b9c5ba; box-shadow: inset 2px 2px 6px #566c6840; }
.placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; padding: 24px; text-align: center; }
.placeholder > i { font-size: 32px; opacity: .55; }
.placeholder p { font: 13px/1.6 monospace; }
.game-player { position: relative; width: 100%; min-width: 0; aspect-ratio: 16 / 10; min-height: 640px; overflow: hidden; border-radius: 4px; background: #204854; }
.game-player iframe { display: block; width: 100%; height: 100%; border: 0; }
.game-player:fullscreen { width: 100%; height: 100%; border-radius: 0; }
.preview-loading { position: absolute; inset: 0; color: #d0dfda; background: #204854; pointer-events: none; }
.preview-controls { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; margin-top: 18px; }
.preview-controls p { color: #61756c; font-size: 12px; }
.preview-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-left: auto; }
.fullscreen-button { display: grid; place-items: center; width: 40px; height: 40px; border: 1px solid #a7b39d; border-radius: 4px; background: #edf0e4; color: #52644e; cursor: pointer; }
.drum-photo { width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border: 1px dashed #aebbaa; border-radius: 6px; background: #e6eadf; }
.drum-photo img { display: block; width: 100%; height: 100%; object-fit: contain; }
.photo-placeholder { width: 100%; height: 100%; color: #61756c; }
a:focus-visible, button:focus-visible, iframe:focus-visible { outline: 3px solid #38859a; outline-offset: 4px; }
@keyframes panel-arrive { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 1100px) { .console-content { width: calc(100% - 48px); } .project-header { align-items: start; flex-direction: column; gap: 18px; } .information-row { grid-template-columns: repeat(2, minmax(0, 1fr)); } .technology { grid-column: 1 / -1; } }
@media (max-width: 680px) { .console-content { --grid-gap: 18px; width: calc(100% - 32px); padding-top: 24px; } .project-header { padding: 32px 0 24px; } h1 { font-size: 40px; } .page-sections { gap: 24px; } .information-row { grid-template-columns: minmax(0, 1fr); } .technology { grid-column: auto; } .console-module { padding: 20px; } .showcase { padding: 14px; } .showcase > .module-label h2 { font-size: 20px; } .placeholder { padding: 18px; gap: 12px; } .placeholder > i { font-size: 24px; } .placeholder p { font-size: 12px; } }
@media (max-width: 380px) { h1 { font-size: 34px; } }
@media (max-width: 1100px) { .project-actions { align-items: start; } }
@media (max-width: 680px) { .game-player { aspect-ratio: 3 / 4; } .preview-actions { margin-left: 0; } }
@media (prefers-reduced-motion: reduce) { .console-module { animation: none; } .back-link, .device-button { transition: none; } .device-button:hover { transform: none; } }
</style>
