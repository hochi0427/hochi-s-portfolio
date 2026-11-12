<template>
  <main class="pattern-cube-page">
    <div class="console-content">
      <RouterLink class="back-link" :to="{ name: 'GamePlay' }"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to Game &amp; Play</RouterLink>
      <header class="project-header">
        <div><h1>Pattern Cube Game</h1><p class="subtitle">Think. Turn. Build.</p></div>
        <div class="project-links">
          <a class="device-button play-button" :href="liveUrl" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-cubes" aria-hidden="true"></i> Live Website <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
          <a class="device-button" href="https://github.com/hochi0427/pattern-cube-generator" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github" aria-hidden="true"></i> Code on GitHub <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
        </div>
      </header>

      <div class="console-grid">
        <section class="console-module overview" aria-labelledby="overview-title">
          <div class="module-label"><h2 id="overview-title">About the Game</h2><i class="fa-solid fa-map section-icon" aria-hidden="true"></i></div>
          <div class="overview-content">
            <img class="project-logo" :src="`${base}images/PatternCubeLogo.png`" alt="Pattern Cube Game logo" />
            <div><h3>Spatial thinking, made tangible.</h3><p>Pattern Cube Game is a hands-on spatial reasoning activity designed for children aged 5–8. It combines physical patterned cubes with a web-based pattern generator to help children explore shapes, positions, and spatial relationships.</p><p>Players rotate and arrange physical cubes to match the patterns displayed on the website. The generator supports different difficulty levels using 3, 6, or 9 cubes, encouraging children to observe, experiment, and develop spatial reasoning skills through play.</p></div>
          </div>
        </section>

        <section class="console-module learning" aria-labelledby="learning-title">
          <div class="module-label"><h2 id="learning-title">Learning Goals</h2><i class="fa-solid fa-anchor section-icon" aria-hidden="true"></i></div>
          <dl class="learning-list"><div><dt>Spatial reasoning</dt><dd>Connect two-dimensional views with a three-dimensional arrangement.</dd></div><div><dt>Shape recognition</dt><dd>Observe and compare shapes on the cube faces.</dd></div><div><dt>Mental rotation</dt><dd>Consider how a cube's appearance changes when it turns.</dd></div><div><dt>Pattern recognition</dt><dd>Identify and recreate the relationships between patterned faces.</dd></div></dl>
        </section>

        <section class="console-module physical" aria-labelledby="physical-title">
          <div class="module-label"><h2 id="physical-title">Physical Manipulative</h2><i class="fa-solid fa-compass section-icon" aria-hidden="true"></i></div>
          <figure><img class="cube-image" :src="`${base}images/Cube.png`" alt="Physical black-and-white pattern cubes with geometric face designs" /><figcaption>Turn, test, and rearrange the physical Pattern Cubes to reconstruct the generated spatial challenge.</figcaption></figure>
        </section>

        <div class="supporting-column">
        <section class="console-module modes" aria-labelledby="modes-title">
          <div class="module-label"><h2 id="modes-title">Game Modes</h2><i class="fa-solid fa-binoculars section-icon" aria-hidden="true"></i></div>
          <p class="mode-intro">Three ways to use the generated patterns with physical cubes.</p>
          <div class="mode-list"><div v-for="mode in modes" :key="mode.title" class="mode"><i :class="mode.icon" aria-hidden="true"></i><div><h3>{{ mode.title }}</h3><p>{{ mode.description }}</p></div></div></div>
        </section>

        <section class="console-module technology" aria-labelledby="technology-title">
          <div class="module-label"><h2 id="technology-title">Technology</h2><i class="fa-solid fa-sailboat section-icon" aria-hidden="true"></i></div>
          <ul class="technology-list"><li v-for="technology in technologies" :key="technology.name"><i :class="technology.icon" aria-hidden="true"></i>{{ technology.name }}</li></ul>
          <div class="vent" aria-hidden="true"></div>
        </section>
        </div>
      </div>

      <section class="generator-console" aria-labelledby="generator-title">
        <div class="module-label"><h2 id="generator-title">Interactive Pattern Generator</h2><i class="fa-solid fa-compass section-icon" aria-hidden="true"></i></div>
        <div class="preview-bezel">
          <div ref="generatorPlayer" class="generator-player" :aria-busy="loadState === 'loading'">
            <iframe ref="generatorFrame" :src="liveUrl" title="Interactive Pattern Cube Generator" tabindex="0" allow="fullscreen" allowfullscreen @load="frameLoaded" @error="frameFailed"></iframe>
            <div v-if="loadState === 'loading'" class="loading-state" role="status">Loading pattern generator...</div>
          </div>
        </div>
        <div class="generator-controls"><p v-if="loadState === 'slow' || loadState === 'unavailable'" role="status">The embedded generator is unavailable or taking longer to load. You can open it in a new tab.</p><p v-else>Open the generator in a separate window to use it alongside your physical cubes.</p><div class="player-actions"><a class="device-button" :href="liveUrl" target="_blank" rel="noopener noreferrer">Open Generator in New Tab <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a><button type="button" class="fullscreen-button" aria-label="Enter generator fullscreen" title="Fullscreen" @click="enterFullscreen"><i class="fa-solid fa-expand" aria-hidden="true"></i></button></div><p v-if="fullscreenError" role="status">Fullscreen is unavailable in this browser.</p></div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const base = import.meta.env.BASE_URL;
const liveUrl = "https://hochi0427.github.io/pattern-cube-generator/";
const generatorPlayer = ref(null);
const generatorFrame = ref(null);
const loadState = ref("loading");
const fullscreenError = ref(false);
let loadingTimer;
const modes = [
  { title: "Speed", icon: "fa-solid fa-stopwatch", description: "Observe the pattern and recreate it as quickly as possible." },
  { title: "Random", icon: "fa-solid fa-shuffle", description: "Work with unexpected cube patterns and adapt your solution." },
  { title: "Memory", icon: "fa-solid fa-brain", description: "Observe the pattern, hide it, and reconstruct it from memory." },
];
const technologies = [
  { name: "Vue 3", icon: "fa-brands fa-vuejs" },
  { name: "Vite", icon: "fa-solid fa-bolt" },
  { name: "JavaScript", icon: "fa-brands fa-js" },
  { name: "HTML / CSS", icon: "fa-solid fa-code" },
  { name: "SVG assets", icon: "fa-solid fa-vector-square" },
  { name: "GitHub Pages", icon: "fa-brands fa-github" },
];

onMounted(() => {
  if (loadState.value === "loading") loadingTimer = window.setTimeout(() => { if (loadState.value === "loading") loadState.value = "slow"; }, 15000);
});
onBeforeUnmount(() => window.clearTimeout(loadingTimer));
function frameLoaded() {
  window.clearTimeout(loadingTimer);
  loadState.value = "loaded";
}
function frameFailed() {
  window.clearTimeout(loadingTimer);
  loadState.value = "unavailable";
}
async function enterFullscreen() {
  fullscreenError.value = false;
  try {
    await generatorPlayer.value.requestFullscreen();
    generatorFrame.value.focus();
  } catch {
    fullscreenError.value = true;
  }
}
</script>

<style scoped>
.pattern-cube-page { position: fixed; z-index: 5; inset: 0; overflow-y: auto; overflow-x: hidden; background: #deeeed; color: #254c60; font-family: Arial, Helvetica, sans-serif; letter-spacing: 0; }
.pattern-cube-page *, .pattern-cube-page *::before, .pattern-cube-page *::after { box-sizing: border-box; letter-spacing: 0; }
.console-content { width: min(1520px, calc(100% - 80px)); margin-inline: auto; padding: 30px 0 64px; }
a { color: inherit; text-decoration: none; }
.back-link { display: inline-flex; align-items: center; gap: 10px; color: #31565d; font-size: 12px; transition: opacity 180ms ease; }
.back-link:hover { opacity: .65; }
.project-header { display: flex; align-items: end; justify-content: space-between; gap: 32px; padding: 42px 0 32px; }
h1 { margin: 0; font: 500 58px/1.1 Georgia, 'Times New Roman', serif; }
.subtitle { margin: 12px 0 0; font-size: 16px; line-height: 1.5; }
.project-links { display: flex; flex-wrap: wrap; gap: 12px; }
.device-button { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; padding: 12px 18px; border: 1px solid #b9bfaf; border-radius: 6px; background: #f2eedf; box-shadow: inset 0 1px 0 #fff, 0 4px 0 #b8bfae, 0 7px 12px #31545c14; font: 600 13px/1.4 monospace; transition: transform 180ms ease; }
.device-button:hover { transform: translateY(-2px); }
.play-button { color: #fffdf3; background: #65715a; border-color: #53634d; box-shadow: inset 0 1px 0 #ffffff30, 0 4px 0 #46553e, 0 7px 12px #31545c14; }
.console-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 20px; align-items: start; }
.console-module { min-width: 0; padding: 24px; border: 1px solid #d2d0be; border-radius: 8px; background: #eee9d9; box-shadow: inset 1px 1px 0 #fff9, 0 5px 0 #bbc3b4, 0 12px 20px #31545c14; transition: transform 200ms ease; animation: panel-arrive 550ms ease both; }
.console-module:hover { transform: translateY(-3px); }
.module-label { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 22px; }
.module-label h2 { margin: 0; font: 600 12px/1.4 monospace; text-transform: uppercase; }
.section-icon { display: inline-flex; justify-content: center; align-items: center; flex: 0 0 20px; width: 20px; height: 20px; color: #7c8874; font-size: 16px; }
h3 { margin: 0 0 12px; font: 600 23px/1.25 monospace; }
p { margin: 0; font-size: 14px; line-height: 1.65; }
.overview { grid-column: span 7; align-self: stretch; color: #edf1e6; background: #204854; border-color: #173a43; box-shadow: inset 0 1px 0 #ffffff30, 0 5px 0 #173741, 0 12px 20px #31545c20; }
.overview .section-icon { color: #a9c38f; }
.overview-content { display: grid; grid-template-columns: 140px minmax(0, 1fr); gap: 24px; align-items: start; }
.project-logo { display: block; width: 140px; height: 140px; object-fit: contain; }
.overview p { color: #d0dfda; }
.overview-content p + p { margin-top: 14px; }
.learning { grid-column: span 5; align-self: stretch; background: #d6dfcd; }
.learning-list { display: grid; gap: 16px; margin: 0; }
.learning-list dt { margin-bottom: 4px; font-size: 14px; font-weight: 600; }
.learning-list dd { margin: 0; font-size: 13px; line-height: 1.6; }
.physical { grid-column: span 5; align-self: stretch; }
figure { margin: 0; }
.cube-image { display: block; width: 100%; height: 260px; object-fit: contain; }
figcaption { margin-top: 16px; color: #61756c; font-size: 13px; line-height: 1.6; }
.supporting-column { grid-column: span 7; align-self: stretch; display: flex; flex-direction: column; gap: 20px; min-width: 0; }
.supporting-column .console-module { padding: 20px; }
.supporting-column .module-label { margin-bottom: 14px; }
.modes { background: #e3e7da; }
.mode-intro { margin-bottom: 12px; color: #61756c; font-size: 13px; }
.mode-list { display: grid; gap: 12px; }
.mode { display: grid; grid-template-columns: 24px minmax(0, 1fr); gap: 14px; }
.mode > div { display: grid; grid-template-columns: 74px minmax(0, 1fr); gap: 12px; align-items: baseline; }
.mode > i { color: #947b56; padding-top: 3px; }
.mode h3 { font-size: 16px; margin: 0; }
.mode p { font-size: 13px; }
.technology { display: flex; flex-direction: column; flex: 1; background: #d9d1bc; }
.technology-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px 24px; padding: 0; margin: 0 0 18px; list-style: none; font: 15px/1.4 monospace; }
.technology-list li { display: flex; align-items: baseline; gap: 10px; }
.technology-list i { flex: 0 0 22px; width: 22px; color: #57674c; }
.vent { flex: 0 0 16px; width: 100%; height: 16px; margin-top: auto; border-radius: 3px; opacity: .5; background: repeating-linear-gradient(90deg, #9b9f8b 0 3px, transparent 3px 9px); }
.generator-console { margin-top: 32px; padding: 24px; border: 2px solid #d2d0be; border-radius: 8px; background: #eee9d9; box-shadow: inset 2px 2px 0 #fff9, 0 7px 0 #bbc3b4, 0 18px 30px #31545c20; }
.preview-bezel { padding: 10px; border: 1px solid #aab7a9; border-radius: 8px; background: #b9c5ba; box-shadow: inset 2px 2px 6px #566c6840; }
.generator-player { position: relative; height: 740px; overflow: hidden; border-radius: 4px; background: #204854; }
.generator-player iframe { display: block; width: 100%; height: 100%; border: 0; background: #fff; }
.generator-player:fullscreen { width: 100%; height: 100%; border-radius: 0; }
.loading-state { position: absolute; inset: 0; display: grid; place-items: center; padding: 20px; background: #204854; color: #d0dfda; font: 14px/1.5 monospace; pointer-events: none; }
.generator-controls { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; margin-top: 18px; }
.generator-controls p { color: #61756c; font-size: 12px; }
.player-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.fullscreen-button { display: grid; place-items: center; width: 40px; height: 40px; padding: 0; border: 1px solid #a7b39d; border-radius: 4px; background: #edf0e4; color: #52644e; cursor: pointer; }
a:focus-visible, button:focus-visible, iframe:focus-visible { outline: 3px solid #38859a; outline-offset: 4px; }
@keyframes panel-arrive { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 1100px) { .console-content { width: calc(100% - 48px); } .project-header { flex-direction: column; align-items: start; gap: 24px; } .overview, .learning, .physical, .supporting-column { grid-column: span 6; } .overview-content { grid-template-columns: minmax(0, 1fr); } .technology-list { grid-template-columns: repeat(2, minmax(0, 1fr)); } .mode > div { grid-template-columns: minmax(0, 1fr); gap: 4px; } }
@media (max-width: 680px) { .console-content { width: calc(100% - 32px); padding-top: 24px; } .project-header { padding: 32px 0 24px; } h1 { font-size: 40px; } .subtitle { font-size: 15px; } .project-links { width: 100%; } .device-button { flex: 1 1 180px; } .console-grid { grid-template-columns: minmax(0, 1fr); gap: 18px; } .console-module, .supporting-column { grid-column: 1; } .console-module { padding: 20px; } .supporting-column { gap: 18px; } .technology-list { gap: 14px; font-size: 14px; } .technology-list li { gap: 6px; } .generator-console { padding: 14px; margin-top: 24px; } .preview-bezel { padding: 5px; } .generator-player { height: 680px; } .player-actions { width: 100%; } }
@media (max-width: 380px) { h1 { font-size: 36px; } .technology-list { grid-template-columns: minmax(0, 1fr); } }
@media (prefers-reduced-motion: reduce) { .console-module { animation: none; } .console-module, .device-button, .back-link { transition: none; } .console-module:hover, .device-button:hover { transform: none; } }
</style>
