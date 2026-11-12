<template>
  <main class="kingdom-page">
    <div class="console-content">
      <RouterLink class="back-link" :to="{ name: 'GamePlay' }"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to Game &amp; Play</RouterLink>
      <header class="project-header">
        <div>
          <h1>Kingdom Dilemma</h1>
          <p class="category">Narrative Game &middot; Educational Game</p>
        </div>
        <div class="project-links">
          <a class="device-button" :href="repositoryUrl" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github" aria-hidden="true"></i> Code on GitHub <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
        </div>
      </header>

      <div class="page-sections">
        <div class="information-row">
        <section class="console-module overview" aria-labelledby="overview-title">
          <div class="module-label"><h2 id="overview-title">About the Game</h2><i class="fa-solid fa-map" aria-hidden="true"></i></div>
          <h3>A crown under strain.</h3>
          <p>Kingdom Dilemma is a medieval-inspired narrative game where players rule a kingdom through crises such as plague, famine, and war. Each decision affects Food, Army, Trust, and Faith, challenging players to balance competing priorities and survive ten turns.</p>
        </section>
        <section class="console-module learning" aria-labelledby="learning-title">
          <div class="module-label"><h2 id="learning-title">Learning Design</h2><i class="fa-solid fa-anchor" aria-hidden="true"></i></div>
          <h3>Learning Through Decisions</h3>
          <p>Players explore medieval governance through difficult choices, discovering how resource tradeoffs and competing priorities shape historical outcomes.</p>
          <dl class="learning-concepts"><div v-for="concept in learningConcepts" :key="concept.title"><dt>{{ concept.title }}:</dt><dd>{{ concept.description }}</dd></div></dl>
        </section>
        <section class="console-module technology" aria-labelledby="technology-title">
          <div class="module-label"><h2 id="technology-title">Technologies Used</h2><i class="fa-solid fa-compass" aria-hidden="true"></i></div>
          <ul class="technology-list"><li v-for="technology in technologies" :key="technology.name"><i :class="technology.icon" aria-hidden="true"></i><span>{{ technology.name }}<small v-if="technology.note">{{ technology.note }}</small></span></li></ul>
        </section>
        </div>

        <section class="console-module preview" aria-labelledby="preview-title">
          <div class="module-label"><h2 id="preview-title">Prototype Preview</h2><i class="fa-solid fa-crown" aria-hidden="true"></i></div>
          <div class="preview-bezel">
            <div ref="prototypePlayer" class="prototype-player" :aria-busy="previewState === 'loading'">
              <iframe :src="liveUrl" title="Play Kingdom Dilemma prototype" tabindex="0" allow="fullscreen" allowfullscreen @load="previewLoaded" @error="previewFailed"></iframe>
              <div v-if="previewState === 'loading'" class="preview-loading" role="status"><img :src="`${base}projects/kingdom-dilemma-preview.png`" alt="Kingdom Dilemma gameplay: kingdom resources, a medieval dilemma, and three choices" /><span>Loading prototype...</span></div>
            </div>
          </div>
          <div class="preview-controls">
            <p v-if="previewState === 'slow' || previewState === 'unavailable'" role="status">The embedded prototype is unavailable or taking longer to load. Open it in a new tab to play.</p>
            <p v-else>The current prototype: balance kingdom resources through difficult narrative choices.</p>
            <div class="preview-actions"><a class="device-button" :href="liveUrl" target="_blank" rel="noopener noreferrer">Open in New Tab <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a><button class="fullscreen-button" type="button" aria-label="Enter prototype fullscreen" title="Fullscreen" @click="enterFullscreen"><i class="fa-solid fa-expand" aria-hidden="true"></i></button></div>
            <p v-if="fullscreenError" role="status">Fullscreen is unavailable in this browser. Open the prototype in a new tab instead.</p>
          </div>
        </section>

        <div class="reference-section">
          <details class="references">
            <summary>References <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></summary>
            <ul>
              <li>Abbott, H. P. (2008). Defining narrative. In <em>The Cambridge introduction to narrative</em> (2nd ed., pp. 13&ndash;27). Cambridge University Press.</li>
              <li>Adams, D. M., Mayer, R. E., MacNamara, A., Koenig, A., &amp; Wainess, R. (2012). Narrative games for learning: Testing the discovery and narrative hypotheses. <em>Journal of Educational Psychology, 104</em>(1), 235&ndash;249. <a href="https://doi.org/10.1037/a0025595" target="_blank" rel="noopener noreferrer">https://doi.org/10.1037/a0025595</a></li>
              <li>Breien, F., &amp; Wasson, B. (2022). eLuna: A co-design framework for narrative digital game-based learning that support STEAM. <em>Frontiers in Education, 6</em>, Article 775746. <a href="https://doi.org/10.3389/feduc.2021.775746" target="_blank" rel="noopener noreferrer">https://doi.org/10.3389/feduc.2021.775746</a></li>
              <li>Glaser, M., Garsoffky, B., &amp; Schwan, S. (2009). Narrative-based learning: Possible benefits and problems. <em>Communications, 34</em>(4), 429&ndash;447. <a href="https://doi.org/10.1515/COMM.2009.026" target="_blank" rel="noopener noreferrer">https://doi.org/10.1515/COMM.2009.026</a></li>
              <li>Short, E. (2019, November 29). Storylets: You want them. <em>Emily Short's Interactive Storytelling</em>. <a href="https://emshort.blog/2019/11/29/storylets-you-want-them/" target="_blank" rel="noopener noreferrer">https://emshort.blog/2019/11/29/storylets-you-want-them/</a></li>
            </ul>
          </details>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const base = import.meta.env.BASE_URL;
const repositoryUrl = "https://github.com/hochi0427/kingdom-dilemma";
const liveUrl = "https://hochi0427.github.io/kingdom-dilemma/";
const prototypePlayer = ref(null);
const previewState = ref("loading");
const fullscreenError = ref(false);
let previewTimer;
const learningConcepts = [
  { title: "Narrative Agency", description: "Player decisions influence the story." },
  { title: "Integrated Learning", description: "Historical knowledge is embedded in gameplay." },
  { title: "Branching Storylets", description: "Resource states influence which events unfold." },
];
onMounted(() => {
  if (previewState.value === "loading") previewTimer = window.setTimeout(() => { if (previewState.value === "loading") previewState.value = "slow"; }, 20000);
});
onBeforeUnmount(() => window.clearTimeout(previewTimer));
function previewLoaded() {
  window.clearTimeout(previewTimer);
  // Cross-origin load events cannot confirm whether the game itself initialized.
  previewState.value = "loaded";
}
function previewFailed() {
  window.clearTimeout(previewTimer);
  previewState.value = "unavailable";
}
async function enterFullscreen() {
  fullscreenError.value = false;
  try { await prototypePlayer.value.requestFullscreen(); }
  catch { fullscreenError.value = true; }
}
const technologies = [
  { name: "Vue 3", icon: "fa-brands fa-vuejs" },
  { name: "Vite", icon: "fa-solid fa-bolt" },
  { name: "JavaScript", icon: "fa-brands fa-js" },
  { name: "GitHub Pages", icon: "fa-brands fa-github", note: "Deployment" },
];
</script>

<style scoped>
.kingdom-page { position: fixed; z-index: 5; inset: 0; overflow-y: auto; overflow-x: hidden; background: #deeeed; color: #254c60; font-family: Arial, Helvetica, sans-serif; letter-spacing: 0; }
.kingdom-page *, .kingdom-page *::before, .kingdom-page *::after { box-sizing: border-box; letter-spacing: 0; }
.console-content { --grid-gap: 20px; width: min(1360px, calc(100% - 80px)); margin-inline: auto; padding: 30px 0 64px; }
a { color: inherit; text-decoration: none; }
.back-link { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; transition: opacity 180ms ease; }
.back-link:hover { opacity: .65; }
.project-header { display: flex; align-items: end; justify-content: space-between; gap: 32px; padding: 38px 0 32px; }
h1 { margin: 0; font: 500 58px/1.1 Georgia, 'Times New Roman', serif; }
.category { margin-top: 8px; color: #61756c; font: 12px/1.6 monospace; }
.project-links { display: flex; flex-wrap: wrap; gap: 12px; }
.device-button { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; padding: 12px 18px; border: 1px solid #b9bfaf; border-radius: 6px; background: #f2eedf; box-shadow: inset 0 1px 0 #fff, 0 4px 0 #b8bfae, 0 7px 12px #31545c14; font: 600 13px/1.4 monospace; transition: transform 180ms ease; }
.device-button:hover { transform: translateY(-2px); }
.page-sections { display: grid; gap: 32px; }
.information-row { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1.4fr) minmax(0, 1fr); gap: var(--grid-gap); align-items: stretch; }
.console-module { min-width: 0; padding: 24px; border: 1px solid #d2d0be; border-radius: 8px; background: #eee9d9; box-shadow: inset 1px 1px 0 #fff9, 0 5px 0 #bbc3b4, 0 12px 20px #31545c14; transition: transform 200ms ease; animation: panel-arrive 550ms ease both; }
.console-module:hover { transform: translateY(-3px); }
.module-label { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
.module-label h2 { margin: 0; font: 600 12px/1.4 monospace; text-transform: uppercase; }
.module-label > i { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 20px; width: 20px; height: 20px; font-size: 16px; color: #7c8874; }
h3 { margin: 0 0 10px; font: 600 17px/1.4 monospace; }
p { margin: 0; font-size: 14px; line-height: 1.65; }
.learning { background: #d6dfcd; }
.preview { border-width: 2px; box-shadow: inset 2px 2px 0 #fff9, 0 7px 0 #bbc3b4, 0 18px 30px #31545c20; }
.preview > .module-label h2 { font-size: 24px; text-transform: none; }
.preview:hover { transform: none; }
.overview { color: #edf1e6; background: #204854; border-color: #173a43; box-shadow: inset 0 1px 0 #ffffff30, 0 5px 0 #173741, 0 12px 20px #31545c20; }
.overview h3 { font-size: 23px; }
.overview .module-label > i { color: #d8c38e; }
.overview p { color: #d0dfda; }
.learning-concepts { display: grid; gap: 10px; margin: 18px 0 0; font-size: 12px; line-height: 1.6; }
.learning-concepts dt { display: inline; font-weight: 600; }
.learning-concepts dd { display: inline; margin: 0 0 0 4px; }
.preview-bezel { padding: 8px; border: 1px solid #aab7a9; border-radius: 6px; background: #b9c5ba; box-shadow: inset 2px 2px 6px #566c6840; }
.prototype-player { position: relative; width: 100%; min-width: 0; aspect-ratio: 16 / 10; min-height: 640px; overflow: hidden; border-radius: 3px; background: #204854; }
.prototype-player iframe { display: block; width: 100%; height: 100%; border: 0; }
.prototype-player:fullscreen { width: 100%; height: 100%; border-radius: 0; }
.preview-loading { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 16px; background: #204854; color: #edf1e6; font: 12px/1.5 monospace; pointer-events: none; }
.preview-loading img { width: 100%; max-height: 75%; object-fit: contain; }
.preview-controls { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; margin-top: 18px; }
.preview-controls p { color: #61756c; font-size: 12px; }
.preview-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.fullscreen-button { display: grid; place-items: center; width: 40px; height: 40px; border: 1px solid #a7b39d; border-radius: 4px; background: #edf0e4; color: #52644e; cursor: pointer; }
.learning h3 { font-size: 15px; }
.learning p { font-size: 13px; }
.reference-section { min-width: 0; }
.references a { text-decoration: underline; text-underline-offset: 3px; }
.references { border-top: 1px solid #b2c4be; border-bottom: 1px solid #b2c4be; color: #526c70; }
.references summary { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 0; cursor: pointer; list-style: none; font: 600 12px/1.5 monospace; }
.references summary::-webkit-details-marker { display: none; }
.references[open] summary i { transform: rotate(180deg); }
.references ul { margin: 0; padding: 0 0 18px 20px; font-size: 12px; line-height: 1.7; overflow-wrap: anywhere; }
.references li + li { margin-top: 12px; }
.technology { background: #d9d1bc; }
.technology-list { display: grid; gap: 16px; list-style: none; padding: 0; margin: 0; font: 14px/1.5 monospace; }
.technology-list li { display: flex; align-items: baseline; gap: 10px; }
.technology-list i { flex: 0 0 20px; color: #57674c; }
.technology-list small { display: block; margin-top: 3px; color: #61756c; font-size: 11px; }
a:focus-visible, button:focus-visible, summary:focus-visible, iframe:focus-visible { outline: 3px solid #38859a; outline-offset: 4px; }
@keyframes panel-arrive { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 1100px) { .console-content { width: calc(100% - 48px); } .project-header { flex-direction: column; align-items: start; gap: 24px; } }
@media (min-width: 681px) and (max-width: 1100px) { .information-row { grid-template-columns: repeat(2, minmax(0, 1fr)); } .technology { grid-column: 1 / -1; } .technology-list { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
@media (max-width: 680px) { .console-content { --grid-gap: 18px; width: calc(100% - 32px); padding-top: 24px; } .page-sections { gap: 24px; } .project-header { padding: 32px 0 24px; } h1 { font-size: 40px; } .project-links { width: 100%; } .device-button { flex: 1 1 180px; } .information-row { grid-template-columns: minmax(0, 1fr); } .console-module { padding: 20px; } .preview { padding: 14px; } .preview > .module-label h2 { font-size: 20px; } .prototype-player { aspect-ratio: 3 / 4; } }
@media (max-width: 380px) { h1 { font-size: 34px; } }
@media (prefers-reduced-motion: reduce) { .console-module { animation: none; } .console-module, .device-button, .back-link { transition: none; } .console-module:hover, .device-button:hover { transform: none; } }
</style>
